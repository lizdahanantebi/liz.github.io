define(['pipAPI', './qstiat_custom.js'], function(APIConstructor, stiatExtension){
    
    var API = new APIConstructor();
    
    // מעבר בין שני חלקי ה-SC-IAT (חיובי/שלילי).
    // חשוב: לא סומכים רק על שעון/onTaskEnd — גם מונים טעינות של ה-wrapper
    // (כשקוואלטריקס טוען את אותו סקריפט בשתי שאלות רצופות).
    var PART_DONE_KEY = 'superstitions_first_done';
    var RUN_KEY = 'superstitions_run_count';
    var LOAD_TS_KEY = 'superstitions_last_load_ts';

    var firstDone = sessionStorage.getItem(PART_DONE_KEY) === 'true';
    var runs = parseInt(sessionStorage.getItem(RUN_KEY) || '0', 10);
    var now = Date.now();
    var lastLoad = parseInt(sessionStorage.getItem(LOAD_TS_KEY) || '0', 10);
    // הגנה מפני double-init מהיר של אותו עמוד
    var isReplayOfSameLoad = lastLoad && (now - lastLoad) < 1500;

    var testType;
    if (firstDone || (runs >= 1 && !isReplayOfSameLoad)) {
        testType = 'second';
    } else {
        testType = 'first';
    }

    if (!isReplayOfSameLoad) {
        sessionStorage.setItem(RUN_KEY, String(runs + 1));
        sessionStorage.setItem(LOAD_TS_KEY, String(now));
    }

    console.log('🎯 Starting combined wrapper with testType:', testType, {
        firstDone: firstDone,
        runs: runs,
        isReplayOfSameLoad: isReplayOfSameLoad
    });
    
    // בדיקה/יצירה של סדר המבחנים
    var testOrder = sessionStorage.getItem('superstitions_test_order');
    if (!testOrder) {
        var firstTest = Math.random() < 0.5 ? 'positive' : 'negative';
        var secondTest = firstTest === 'positive' ? 'negative' : 'positive';
        testOrder = JSON.stringify({
            first: firstTest,
            second: secondTest
        });
        sessionStorage.setItem('superstitions_test_order', testOrder);
        console.log('🎲 New randomization created:', testOrder);
    }
    
    var orderObj = JSON.parse(testOrder);
    console.log('📋 Current order:', orderObj);
    
    var actualTest;
    if (testType === 'first') {
        actualTest = orderObj.first;
    } else if (testType === 'second') {
        actualTest = orderObj.second;
    } else {
        actualTest = Math.random() < 0.5 ? 'positive' : 'negative';
    }
    
    console.log('✨ Running test:', actualTest, 'for position:', testType);
    
    function markPartTransition() {
        if (testType === 'first') {
            sessionStorage.setItem(PART_DONE_KEY, 'true');
            console.log('✅ First SC-IAT part marked done; next load will run second part');
        } else {
            sessionStorage.removeItem(PART_DONE_KEY);
            sessionStorage.removeItem(RUN_KEY);
            sessionStorage.removeItem(LOAD_TS_KEY);
            sessionStorage.removeItem('superstitions_test_order');
            sessionStorage.removeItem('lastTestTime');
            console.log('✅ Second SC-IAT part finished; session order cleared');
        }
    }

    // לא מוחקים את minnoJS — זה שבר את onEnd/logger וגרם למעבר לא לרוץ.
    // עוטפים את onEnd כדי לסמן סיום גם אם onTaskEnd ב-qstiat_custom לא זמין (גרסה ישנה ב-cache).
    if (typeof window.minnoJS !== 'undefined') {
        var prevOnEnd = window.minnoJS.onEnd;
        window.minnoJS.onEnd = function() {
            try { markPartTransition(); } catch (e) { console.error('markPartTransition failed', e); }
            if (typeof prevOnEnd === 'function') {
                try { prevOnEnd.apply(this, arguments); } catch (e2) { console.error('prevOnEnd failed', e2); }
            }
        };
    }
    
    // הגדרת קונפיגורציה לפי סוג המבחן
    var config;
    
    if (actualTest === 'positive') {
        console.log('🌟 Configuring POSITIVE superstitions test');
        config = {
            category : {
                name : 'Positive Superstitions',
                title : {
                    media : {word : 'Superstitions'},
                    css : {color:'#0066cc','font-size':'2em'},
                    height : 7
                },
                media : [
                    {image : 'P_shootingstar.png'},
                    {image : 'P_penny.png'},
                    {image : 'P_crossedfingers.png'},
                    {image : 'P_clover.png'},
                    {image : 'P_clothes.png'}
                ],
                css : {color:'#0066cc','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid #0066cc'}
            },
            attribute1 : {
                name : 'Bad',
                title : {
                    media : {word : 'Bad'},
                    css : {color:'#31b404','font-size':'2em'},
                    height : 7
                },
                media : [
                    {image: 'N_scull.png'},
                    {image: 'N_brokenheart.png'},
                    {image: 'N_unlike.png'},
                    {image: 'N_sad.png'},
                    {image: 'N_fire.png'}
                ],
                css : {color:'#31b404','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid #31b404'}
            },
            attribute2 : {
                name : 'Good',
                title : {
                    media : {word : 'Good'},
                    css : {color:'#31b404','font-size':'2em'},
                    height : 7
                },
                media : [
                    {image: 'P_gift.png'},
                    {image: 'P_heart.png'},
                    {image: 'P_like.png'},
                    {image: 'P_smile.png'},
                    {image: 'P_sun.png'}
                ],
                css : {color:'#31b404','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid #31b404'}
            },
            base_url : {
                image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
            }
        };
    } else {
        console.log('🌑 Configuring NEGATIVE superstitions test');
        config = {
            category : { 
                name : 'Negative Superstitions',
                title : {
                    media : {word : 'Superstitions'},
                    css : {color:'#0066cc','font-size':'2em'},
                    height : 7
                }, 
                media : [
                    {image : 'N_blackcat.png'}, 
                    {image : 'N_brokenmirror.png'}, 
                    {image : 'N_ladder.png'}, 
                    {image : 'N_friday.png'},
                    {image : 'N_knockonwood.png'}
                ], 
                css : {color:'#0066cc','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid #0066cc'}
            },
            attribute1 : {
                name : 'Bad',
                title : {
                    media : {word : 'Bad'},
                    css : {color:'#31b404','font-size':'2em'},
                    height : 7
                }, 
                media : [
                    {image: 'N_scull.png'},
                    {image: 'N_brokenheart.png'},
                    {image: 'N_unlike.png'},
                    {image: 'N_sad.png'},
                    {image: 'N_fire.png'}
                ], 
                css : {color:'#31b404','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid #31b404'}
            },
            attribute2 : {
                name : 'Good',
                title : {
                    media : {word : 'Good'},
                    css : {color:'#31b404','font-size':'2em'},
                    height : 7
                }, 
                media : [
                    {image: 'P_gift.png'},
                    {image: 'P_heart.png'},
                    {image: 'P_like.png'},
                    {image: 'P_smile.png'},
                    {image: 'P_sun.png'}
                ], 
                css : {color:'#31b404','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid #31b404'}
            },
            base_url : {
                image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
            }
        };
    }

    // גיבוי: גם דרך hook פנימי של qstiat_custom (כשהגרסה המעודכנת נטענת)
    config.onTaskEnd = markPartTransition;
    
    return stiatExtension(config);
});
