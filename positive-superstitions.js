define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.3.0/stiat/qualtrics/exampleSTIAT.js'], function(APIConstructor, stiatExtension){
    var API = new APIConstructor();

    return stiatExtension({
        category : {
            name : 'Positive Superstitions',
            title : {
                media : {word : 'Positive Superstitions'},
                css : {color:'#000000','font-size':'2em'},
                height : 7
            },
            media : [
                {image : 'shooting_star.png'},
                {image : 'birthday_candles.png'},
                {image : 'crossed_fingers.png'},
                {image : 'lucky_charm.png'},
                {image : 'blowing_dice.png'},
                {image : 'lucky_clothes.png'}
            ],
            css : {color:'#000000','font-size':'3em'}
        },

        attribute1 : {
            name : 'Negative',
            title : {
                media : {word : 'Negative'},
                css : {color:'#000000','font-size':'2em'},
                height : 7
            },
            media : [
                {word: 'awkward'},
                {word: 'hate'},
                {word: 'failure'},
                {word: 'slum'},
                {word: 'stink'}
            ],
            css : {color:'#000000','font-size':'3em'}
        },

        attribute2 : {
            name : 'Positive',
            title : {
                media : {word : 'Positive'},
                css : {color:'#000000','font-size':'2em'},
                height : 7
            },
            media : [
                {word: 'brilliant'},
                {word: 'diamond'},
                {word: 'joy'},
                {word: 'truth'},
                {word: 'sunrise'}
            ],
            css : {color:'#000000','font-size':'3em'}
        },

        base_url : {
            image : 'https://lizdahanantebi.github.io/liz.github.io/images/'
        }
    });
});
