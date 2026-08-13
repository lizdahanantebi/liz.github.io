define(['pipAPI', './qstiat_custom.js?v=20260813-goodside'], function(APIConstructor, stiatExtension){

    var API = new APIConstructor();

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

            console.log('📊 Data collected:', csvData);

            // זה מה שחסר! קריאה ל-minnoJS.logger
            if (typeof window.minnoJS !== 'undefined' && window.minnoJS.logger) {
                window.minnoJS.logger(csvData);
                console.log('✅ Data sent to Qualtrics via minnoJS.logger');
            }

            // גיבוי - שמירה מקומית
            try {
                localStorage.setItem('stiat_positive_data', csvData);
            } catch(e) {
                console.error('Error saving to localStorage:', e);
            }

            // גיבוי נוסף - postMessage
            try {
                window.parent.postMessage({
                    name: 'stiatComplete',
                    data: csvData
                }, '*');
                console.log('📨 Data sent via postMessage');
            } catch(e) {
                console.error('Error sending to parent:', e);
            }

            return csvData;
        }
    });

    return stiatExtension({
        category : {
            name : 'Folk beliefs',
            title : {
                media : {word : 'Folk beliefs'},
                css : {color:'#000000','font-size':'1.6em','font-weight':'bold'},
                height : 7
            },
            media : [
                {image : 'P_shootingstar.png'},
                {image : 'P_penny.png'},
                {image : 'P_crossedfingers.png'},
                {image : 'P_clover.png'},
                {image : 'P_clothes.png'}
            ],
            css : {color:'#0066cc','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid #000000'}
        },
        attribute1 : {
            name : 'Bad',
            title : {
                media : {word : 'Bad'},
                css : {color:'#000000','font-size':'1.6em','font-weight':'bold'},
                height : 7
            },
            media : [
                {image: 'N_scull.png'},
                {image: 'N_brokenheart.png'},
                {image: 'N_unlike.png'},
                {image: 'N_sad.png'},
                {image: 'N_fire.png'}
            ],
            css : {color:'#31b404','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid #000000'}
        },
        attribute2 : {
            name : 'Good',
            title : {
                media : {word : 'Good'},
                css : {color:'#000000','font-size':'1.6em','font-weight':'bold'},
                height : 7
            },
            media : [
                {image: 'P_gift.png'},
                {image: 'P_heart.png'},
                {image: 'P_like.png'},
                {image: 'P_smile.png'},
                {image: 'P_sun.png'}
            ],
            css : {color:'#31b404','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid #000000'}
        },
        base_url : {
            image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
        }
    });
});
