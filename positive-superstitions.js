define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/qualtrics/qstiat6.js'], function(APIConstructor, stiatExtension){
	
	var API = new APIConstructor();
	return stiatExtension({
		category : { 
			name : 'Positive Superstitions', //Will appear in the data.
			title : {
				media : {word : 'Positive Superstitions'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 7 //Used to position the "Or" in the combined block.
			}, 
			media : [ //Stimuli content as PIP's media objects
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_shootingstar.png" width="80" height="80" style="border:2px solid black;">'}, 
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_penny.png" width="80" height="80" style="border:2px solid black;">'}, 
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_crossedfingers.png" width="80" height="80" style="border:2px solid black;">'}, 
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_clover.png" width="80" height="80" style="border:2px solid black;">'},
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_dice.png" width="80" height="80" style="border:2px solid black;">'},
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_clothes.png" width="80" height="80" style="border:2px solid black;">'}
			], 
			//Stimulus css (style)
			css : {color:'#31b404','font-size':'3em'}
		},	
		attribute1 : 
		{
			name : 'Bad', //Attribute label
			title : {
				media : {word : 'Bad'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 7 //Used to position the "Or" in the combined block.
			}, 
			media : [ //Stimuli
				{word: 'Awkward'},
				{word: 'Hate'},
				{word: 'Failure'},
				{word: 'Slum'},
				{word: 'Stink'}
			], 
			//Can change color and size of the targets here.
			css : {color:'#31b404','font-size':'3em'}
		},
		attribute2 : 
		{
			name : 'Good', //Attribute label
			title : {
				media : {word : 'Good'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 7 //Used to position the "Or" in the combined block.
			}, 
			media : [ //Stimuli
				{word: 'Brilliant'},
				{word: 'Diamond'},
				{word: 'Joy'},
				{word: 'Truth'},
				{word: 'Sunrise'}
			], 
			//Can change color and size of the targets here.
			css : {color:'#31b404','font-size':'3em'}
		},
		base_url : {//Where are your images at?
			image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
		}
	});
});
