define(['pipAPI', 'https://lizdahanantebi.github.io/liz.github.io/qstiat_custom.js?v=' + new Date().getTime()], function(APIConstructor, stiatExtension){
    
    var API = new APIConstructor();
    
    console.log('🎯 Starting sequential superstitions test with 8 blocks');
    
    // רנדומיזציה - איזה מבחן יתחיל קודם
    var firstTest = Math.random() < 0.5 ? 'positive' : 'negative';
    var secondTest = firstTest === 'positive' ? 'negative' : 'positive';
    
    console.log('🎲 Random order: First 4 blocks =', firstTest, ', Last 4 blocks =', secondTest);
    
    // הגדרת קונפיגורציות למבחנים
    var positiveConfig = {
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
        }
    };
    
    var negativeConfig = {
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
        }
    };
    
    // בניית קונפיגורציה משולבת עם 8 בלוקים
    var combinedConfig = {
        base_url : {
            image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
        }
    };
    
    // הוספת logger מותאם אישית
    API.addSettings('logger', {
        onRow: function(logName, log, settings, ctx){
            if (!ctx.logs) ctx.logs = [];
            // הוספת מידע על איזה מבחן זה (חיובי או שלילי)
            var blockNum = log.block || 0;
            if (blockNum >= 1 && blockNum <= 4) {
                log.test_type = firstTest;
                log.test_phase = 'first';
            } else if (blockNum >= 5 && blockNum <= 8) {
                log.test_type = secondTest;
                log.test_phase = 'second';
            }
            ctx.logs.push(log);
        },
        onEnd: function(name, settings, ctx){
            var csvData = 'block,trial,latency,correct,stimulus,category,test_type,test_phase\n';
            if (ctx.logs) {
                csvData += ctx.logs.map(function(log) {
                    return [
                        log.block || '',
                        log.trial || '',
                        log.latency || '',
                        log.correct || '',
                        log.stimulus || '',
                        log.category || '',
                        log.test_type || '',
                        log.test_phase || ''
                    ].join(',');
                }).join('\n');
            }

            console.log('📊 Combined data collected:', csvData);

            // שליחה לקוואלטריקס
            if (typeof window.minnoJS !== 'undefined' && window.minnoJS.logger) {
                window.minnoJS.logger(csvData);
                console.log('✅ Data sent to Qualtrics via minnoJS.logger');
            }

            // גיבוי מקומי
            try {
                localStorage.setItem('stiat_combined_data', csvData);
                console.log('💾 Data saved to localStorage');
            } catch(e) {
                console.error('Error saving to localStorage:', e);
            }

            return csvData;
        }
    });
    
    // בניית הקונפיגורציה לפי הסדר הרנדומלי
    if (firstTest === 'positive') {
        console.log('🌟 Blocks 1-4: POSITIVE, Blocks 5-8: NEGATIVE');
        combinedConfig.category = positiveConfig.category;
        combinedConfig.attribute1 = positiveConfig.attribute1;
        combinedConfig.attribute2 = positiveConfig.attribute2;
        
        // נשנה בבלוק 5 לקונפיגורציה השלילית
        combinedConfig.switchToNegativeAtBlock = 5;
        combinedConfig.negativeConfig = negativeConfig;
    } else {
        console.log('🌑 Blocks 1-4: NEGATIVE, Blocks 5-8: POSITIVE');
        combinedConfig.category = negativeConfig.category;
        combinedConfig.attribute1 = negativeConfig.attribute1;
        combinedConfig.attribute2 = negativeConfig.attribute2;
        
        // נשנה בבלוק 5 לקונפיגורציה החיובית
        combinedConfig.switchToPositiveAtBlock = 5;
        combinedConfig.positiveConfig = positiveConfig;
    }
    
    // קריאה ל-stiatExtension עם הקונפיגורציה המשולבת
    return stiatExtension(combinedConfig);
});
