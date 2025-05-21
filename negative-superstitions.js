define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/qualtrics/qstiat6.js'], function(APIConstructor, stiatExtension){
	
	var API = new APIConstructor();
	return stiatExtension({
		category : { 
			name : 'Negative Superstitions', //Will appear in the data.
			title : {
				media : {word : 'Negative Superstitions'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 7 //Used to position the "Or" in the combined block.
			}, 
			media : [ //Stimuli content as PIP's media objects
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
			media : [ //Stimuli - עכשיו משתמשים בתמונות במקום מילים
				{image: 'N_skull.png'},
				{image: 'N_brokenheart.png'},
				{image: 'N_thumbsdown.png'},
				{image: 'N_sad.png'},
				{image: 'N_fire.png'} // סמל האש החדש במקום סמל האזהרה
			], 
			//שינוי ה-CSS להתאים לתמונות
			css : {color:'#31b404', 'max-width':'100px', 'max-height':'100px', width:'100px', height:'100px'}
		},
		attribute2 : 
		{
			name : 'Good', //Attribute label
			title : {
				media : {word : 'Good'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 7 //Used to position the "Or" in the combined block.
			}, 
			media : [ //Stimuli - עכשיו משתמשים בתמונות במקום מילים
				{image: 'P_gift.png'},
				{image: 'P_heart.png'},
				{image: 'P_thumbsup.png'},
				{image: 'P_smiley.png'},
				{image: 'P_sun.png'}
			], 
			//שינוי ה-CSS להתאים לתמונות
			css : {color:'#31b404', 'max-width':'100px', 'max-height':'100px', width:'100px', height:'100px'}
		},
		base_url : {//Where are your images at?
			image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
		}
	});
});
