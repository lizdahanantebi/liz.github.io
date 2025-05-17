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
    		    {image : 'P_shootingstar.png'}, 
    			{image : 'P_penny.png'}, 
    			{image : 'P_crossedfingers.png'}, 
    			{image : 'P_clover.png'},
                {image : 'P_dice.png'},
                {image : 'P_clothes.png'}
		    ], 
		    //Stimulus css (style)
		    css : {color:'#31b404','font-size':'3em', 'max-width': '150px', 'max-height': '150px', 'border': '2px solid black'}
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
  }}
  );
  });
