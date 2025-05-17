define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/qualtrics/qstiat6.js'], 
function(APIConstructor, stiatExtension){
    var API = new APIConstructor();
    
    return stiatExtension({
        category : {
            name : 'Positive Superstitions', // Will appear in the data
            title : {
                media : {word : 'Positive Superstitions'}, // Name of the category presented in the task
                css : {color:'#31b404','font-size':'2em'}, // Style of the category title
                height : 7 // Used to position the "Or" in the combined block
            },
            media : [ // Stimuli
                {image : 'P_shootingstar.png'}, // Shooting Star
                {image : 'P_penny.png'}, // Lucky Penny
                {image : 'P_crossedfingers.png'}, // Crossed Fingers
                {image : 'P_clover.png'}, // Four-Leaf Clover
                {image : 'P_dice.png'}, // Lucky Dice
                {image : 'P_clothes.png'} // Lucky Clothes
            ],
            // Stimulus css (style)
            css : {color:'#31b404','font-size':'3em'}
        },
        
        attribute1 : {
            name : 'Good', // Attribute label
            title : {
                media : {word : 'Good'}, // Name of the category presented in the task
                css : {color:'#31b404','font-size':'2em'}, // Style of the category title
                height : 7 // Used to position the "Or" in the combined block
            },
            media : [ // Stimuli
                {word: 'Brilliant'},
                {word: 'Diamond'},
                {word: 'Joy'},
                {word: 'Truth'},
                {word: 'Sunrise'}
            ],
            // Can change color and size of the targets here
            css : {color:'#31b404','font-size':'3em'}
        },
        
        attribute2 : {
            name : 'Bad', // Attribute label
            title : {
                media : {word : 'Bad'}, // Name of the category presented in the task
                css : {color:'#31b404','font-size':'2em'}, // Style of the category title
                height : 7 // Used to position the "Or" in the combined block
            },
            media : [ // Stimuli
                {word: 'Awkward'},
                {word: 'Hate'},
                {word: 'Failure'},
                {word: 'Slum'},
                {word: 'Stink'}
            ],
            // Can change color and size of the targets here.
            css : {color:'#31b404','font-size':'3em'}
        },

        base_url : {
            // Where are your images at?
            image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
        },
        
        // The default font-size is 20px and default font-family is Arial
        fontSize: 20,
        
        // How to respond when the user presses the wrong key
        errorCorrection: true,
        
        // How to respond to correct responses - display green checkmark
        showStimuliWithInst: true,
        
        // Should we randomize which attribute is on the right and which on the left?
        randomAttSide: true,
        
        // Related to canvas size
        fullscreen: false, 
        
        // Show results to the user at the end?
        showDebriefing: false,
        
        // Number of trials before giving feedback about progress
        nBlocks: 3,
        
        // Optional: Blocks attributes are all in the stiatExtension file
        // You can modify them but not required
        
        // Instructions templates:
        instTemplate: '<div><p align="center" style="font-size: 20px; font-family: arial">' +
            '<font color="#000000"><u>Block ${blockNum} of ${nBlocks}</u><br/><br/></p>' + 
            '<p style="font-size: 20px; text-align: left; vertical-align: bottom; margin-left: 10px; font-family: arial">' +
            '${instAttributePractice}<br/>' +
            '${instCategoriesPractice}<br/>' +
            '${instFirstCombined}<br/>' +
            '${instSecondCombined}<br/>' +
            '${instSwitchCategories}<br/>' +
            '<br/>' +
            '<p align="center">Press space to start</p>' +
            '</div>',
            
        // Text blocks from the extension file, you can override them here
        remindErrorText : '<p align="center" style="font-size: 20px; font-family: arial">' +
		    '<font color="#D8000C"><i>X</i> Press <b>E</b> or <b>I</b> for the correct category.<br/><br/></font>' +
		    '</p>',
		    
        remindErrorTextTouch : '<p align="center" style="font-size: 20px; font-family: arial">' +
            '<font color="#D8000C"><i>X</i> Press the left or right side for the correct category.<br/><br/></font>' +
            '</p>',
            
        leftKeyText : 'Press "E" for',
		rightKeyText : 'Press "I" for',
		
		orText : 'or',
		
		instAttributePractice: 'Categorize words as <font color="#31b404">Good</font> or <font color="#31b404">Bad</font><br/><br/>',
		instCategoriesPractice: 'Categorize images of <font color="#31b404">Positive Superstitions</font>.<br/>',
		instFirstCombined : 'Press <b>E</b> for <font color="#31b404">Good</font> items<br/>Press <b>I</b> for <font color="#31b404">Bad</font> items and <font color="#31b404">Positive Superstitions</font> items.<br/>',
		instSecondCombined : 'Press <b>E</b> for <font color="#31b404">Good</font> items and <font color="#31b404">Positive Superstitions</font> items<br/>Press <b>I</b> for <font color="#31b404">Bad</font> items.<br/>',
		instSwitchCategories : '<font color="#000000"><b>Watch out, the categories have changed!</b><br/><br/></font>',
    });
});
