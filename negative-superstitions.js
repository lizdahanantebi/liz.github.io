define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/qualtrics/qstiat6.js'], function(APIConstructor, stiatExtension){
	
	var API = new APIConstructor();
	return stiatExtension({
		category : { 
			name : 'Superstitions', //Changed from 'Negative Superstitions' to just 'Superstitions'
			title : {
				media : {word : 'Superstitions'}, //Changed category title
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 7 //Used to position the "Or" in the combined block.
			}, 
			media : [ //Stimuli content as PIP's media objects - these remain the same
				{image : 'N_blackcat.png'}, 
				{image : 'N_brokenmirror.png'}, 
				{image : 'N_friday.png'}, 
				{image : 'N_knockonwood.png'},
				{image : 'N_ladder.png'},
				{image : 'N_umbrella.png'}
			], 
			//Stimulus css (style)
			css : {color:'#31b404','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid black'}
		},	
		attribute1 : 
		{
			name : 'Bad', //Attribute label
			title : {
				media : {word : 'Bad'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 7 //Used to position the "Or" in the combined block.
			}, 
			media : [ //Stimuli - using HTML instead of plain images
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/N_scull.png" style="width:200px; height:200px; border:3px solid black;">'},
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/N_brokenheart.png" style="width:200px; height:200px; border:3px solid black;">'},
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/N_unlike.png" style="width:200px; height:200px; border:3px solid black;">'},
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/N_sad.png" style="width:200px; height:200px; border:3px solid black;">'},
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/N_fire.png" style="width:200px; height:200px; border:3px solid black;">'}
			], 
			//No CSS needed since we're using HTML with inline styles
			css : {}
		},
		attribute2 : 
		{
			name : 'Good', //Attribute label
			title : {
				media : {word : 'Good'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 7 //Used to position the "Or" in the combined block.
			}, 
			media : [ //Stimuli - using HTML instead of plain images
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_gift.png" style="width:200px; height:200px; border:3px solid black;">'},
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_heart.png" style="width:200px; height:200px; border:3px solid black;">'},
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_like.png" style="width:200px; height:200px; border:3px solid black;">'},
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_smile.png" style="width:200px; height:200px; border:3px solid black;">'},
				{html: '<img src="https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/P_sun.png" style="width:200px; height:200px; border:3px solid black;">'}
			], 
			//No CSS needed since we're using HTML with inline styles
			css : {}
		},
		base_url : {//Where are your images at?
			image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
		}
	});
});
