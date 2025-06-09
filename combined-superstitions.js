define(['pipAPI', 'https://lizdahanantebi.github.io/liz.github.io/qstiat_custom.js?v=' + new Date().getTime()], function(APIConstructor, stiatExtension){
    
    var API = new APIConstructor();
    
    // זיהוי איזה מבחן זה לפי זמן ו-sessionStorage
    var testType;
    var lastTestTime = sessionStorage.getItem('lastTestTime');
    var currentTime = new Date().getTime();
    
    if (!lastTestTime) {
        // זה המבחן הראשון
        testType = 'first';
        sessionStorage.setItem('lastTestTime', currentTime);
        console.log('🎯 This is the FIRST test (no previous test found)');
    } else {
        var timeDiff = currentTime - parseInt(lastTestTime);
        if (timeDiff < 30000) { // 30 שניות
            // זה כנראה refresh של אותו מבחן
            testType = 'first';
            console.log('🔄 This seems like a refresh of the first test (time diff: ' + timeDiff + 'ms)');
        } else {
            // זה המבחן השני
            testType = 'second';
            console.log('🎯 This is the SECOND test (time diff: ' + timeDiff + 'ms)');
        }
    }
    
    console.log('🎯 Starting combined wrapper with testType:', testType);
    console.log('🔍 Debugging - orderObj:', orderObj);
    console.log('🔍 Debugging - actualTest will be:', testType === 'first' ? orderObj.first : orderObj.second);
    
    // בדיקה/יצירה של סדר המבחנים
    var testOrder = sessionStorage.getItem('superstitions_test_order');
    if (!testOrder) {
        // רנדומיזציה חדשה - איזה מבחן יהיה ראשון
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
    
    // קביעה איזה מבחן להריץ
    var actualTest;
    if (testType === 'first') {
        actualTest = orderObj.first;
    } else if (testType === 'second') {
        actualTest = orderObj.second;
    } else {
        // אם לא נתן פרמטר, נריץ רנדומלי
        actualTest = Math.random() < 0.5 ? 'positive' : 'negative';
    }
    
    console.log('✨ Running test:', actualTest, 'for position:', testType);
    
    // ניקוי מלא של המערכת לפני הפעלת המבחן
    console.log('🧹 Cleaning up previous test data...');
    if (typeof window.minnoJS !== 'undefined') {
        delete window.minnoJS;
    }
    if (typeof window.piGlobal !== 'undefined') {
        delete window.piGlobal;
    }
    // ניקוי כל המודולים של RequireJS
    if (typeof requirejs !== 'undefined' && requirejs.s && requirejs.s.contexts) {
        Object.keys(requirejs.s.contexts).forEach(function(key) {
            if (key !== '_') {
                delete requirejs.s.contexts[key];
            }
        });
    }
    
    // הגדרת קונפיגורציה לפי סוג המבחן
    var config;
    
    if (actualTest === 'positive') {
        console.log('🌟 Configuring POSITIVE superstitions test');
        config = {
            category : {
                name : 'Superstitions',
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
                    {image : 'P_dice.png'},
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
                name : 'Superstitions',
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
                    {image : 'N_umbrella.png'},
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
    
    // הוספת logger מותאם אישית
    API.addSettings('logger', {
        onRow: function(logName, log, settings, ctx){
            if (!ctx.logs) ctx.logs = [];
            ctx.logs.push(log);
        },
        onEnd: function(name, settings, ctx){
            var csvData = 'block,trial,latency,correct,stimulus,category\n';
            if (ctx.logs) {
                csvData += ctx.logs.map(function(log) {
                    return [
                        log.block || '',
                        log.trial || '',
                        log.latency || '',
                        log.correct || '',
                        log.stimulus || '',
                        log.category || ''
                    ].join(',');
                }).join('\n');
            }

            console.log('📊 Data collected for', actualTest, 'test:', csvData);

            // שליחה לקוואלטריקס
            if (typeof window.minnoJS !== 'undefined' && window.minnoJS.logger) {
                window.minnoJS.logger(csvData);
                console.log('✅ Data sent to Qualtrics via minnoJS.logger');
            }

            // גיבוי מקומי
            try {
                var storageKey = actualTest === 'positive' ? 'stiat_positive_data' : 'stiat_negative_data';
                localStorage.setItem(storageKey, csvData);
                console.log('💾 Data saved to localStorage with key:', storageKey);
            } catch(e) {
                console.error('Error saving to localStorage:', e);
            }

            // גיבוי נוסף
            try {
                window.parent.postMessage({
                    name: 'stiatComplete',
                    data: csvData,
                    testType: actualTest
                }, '*');
                console.log('📨 Data sent via postMessage');
            } catch(e) {
                console.error('Error sending to parent:', e);
            }

            return csvData;
        }
    });
    
    // קריאה ל-stiatExtension עם הקונפיגורציה הנכונה
    return stiatExtension(config);
});
