define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/qualtrics/qstiat6.js'], function(APIConstructor, stiatExtension){
	
	var API = new APIConstructor();
	return stiatExtension({
		category : { 
			name : 'Negative Superstitions', 
			title : {
				media : {word : 'Negative Superstitions'}, 
				css : {color:'#31b404','font-size':'2em'}, 
				height : 7 
			}, 
			media : [ 
				{image : 'N_blackcat.png'}, 
				{image : 'N_brokenmirror.png'}, 
				{image : 'N_friday.png'}, 
				{image : 'N_knockonwood.png'},
				{image : 'N_ladder.png'},
				{image : 'N_umbrella.png'}
			], 
			css : {color:'#31b404','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid black'}
		},	
		attribute1 : 
		{
			name : 'Bad', 
			title : {
				media : {word : 'Bad'}, 
				css : {color:'#31b404','font-size':'2em'}, 
				height : 7 
			}, 
			media : [ 
				{word: 'Awkward'},
				{word: 'Hate'},
				{word: 'Failure'},
				{word: 'Slum'},
				{word: 'Stink'}
			], 
			css : {color:'#31b404','font-size':'3em'}
		},
		attribute2 : 
		{
			name : 'Good', 
			title : {
				media : {word : 'Good'}, 
				css : {color:'#31b404','font-size':'2em'}, 
				height : 7 
			}, 
			media : [ 
				{word: 'Brilliant'},
				{word: 'Diamond'},
				{word: 'Joy'},
				{word: 'Truth'},
				{word: 'Sunrise'}
			], 
			css : {color:'#31b404','font-size':'3em'}
		},
		base_url : {
			image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
		}
	});
});
