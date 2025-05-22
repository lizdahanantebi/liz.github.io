define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/qualtrics/qstiat6.js'], function(APIConstructor, stiatExtension){
	
	var API = new APIConstructor();
	
	// Add logger for Qualtrics
	API.addSettings('logger', {
		onRow: function(logName, log, settings, ctx){
			if (!ctx.logs) ctx.logs = [];
			ctx.logs.push(log);
		},
		onEnd: function(name, settings, ctx){
			return ctx.logs;
		},
		serialize: function(name, logs, settings){
			return JSON.stringify(logs);
		},
		send: function(name, serialized, settings, ctx){
			if (window.minnoJS && window.minnoJS.logger) {
				window.minnoJS.logger(serialized);
			}
		}
	});

	API.addSettings('onEnd', function() {
		if (window.minnoJS && window.minnoJS.onEnd) {
			window.minnoJS.onEnd();
		}
	});
	
	return stiatExtension({
		category : { 
			name : 'Superstitions',
			title : {
				media : {word : 'Superstitions'},
				css : {color:'#31b404','font-size':'2em'},
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
				{image: 'N_scull.png'},
				{image: 'N_brokenheart.png'},
				{image: 'N_unlike.png'},
				{image: 'N_sad.png'},
				{image: 'N_fire.png'}
			], 
			css : {color:'#31b404','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid black'}
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
				{image: 'P_gift.png'},
				{image: 'P_heart.png'},
				{image: 'P_like.png'},
				{image: 'P_smile.png'},
				{image: 'P_sun.png'}
			], 
			css : {color:'#31b404','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid black'}
		},
		base_url : {
			image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
		}
	});
});
