define(['pipAPI', 'https://lizdahanantebi.github.io/liz.github.io/qstiat_custom.js'], function(APIConstructor, stiatExtension){
	
	var API = new APIConstructor();
	
	// Add logger and onEnd handlers for data collection
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
			
			console.log('Data collected:', csvData);
			
			// Save to localStorage
			try {
				localStorage.setItem('stiat_positive_data', csvData);
				console.log('Data saved to localStorage');
			} catch(e) {
				console.error('Error saving to localStorage:', e);
			}
			
			// Send to parent window (Qualtrics)
			try {
				window.parent.postMessage({
					name: 'stiatComplete',
					data: csvData
				}, '*');
				console.log('Data sent to parent window');
			} catch(e) {
				console.error('Error sending to parent:', e);
			}
			
			return csvData;
		}
	});
	
	return stiatExtension({
		// רקע שחור
		canvas : {
			maxWidth: 725,
			proportions : 0.7,
			background: '#000000',
			borderWidth: 5,
			canvasBackground: '#000000',
			borderColor: '#ffffff'
		},
		
		category : { 
			name : 'Superstitions',
			title : {
				media : {word : 'Superstitions'},
				css : {color:'#ffffff','font-size':'2em'}, // לבן על רקע שחור
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
			css : {color:'#ffffff','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid white', 'filter':'invert(1)'}
		},	
		attribute1 : 
		{
			name : 'Bad',
			title : {
				media : {word : 'Bad'},
				css : {color:'#31b404','font-size':'2em'}, // ירוק
				height : 7
			}, 
			media : [
				{image: 'N_scull.png'},
				{image: 'N_brokenheart.png'},
				{image: 'N_unlike.png'},
				{image: 'N_sad.png'},
				{image: 'N_fire.png'}
			], 
			css : {color:'#ffffff','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid white', 'filter':'invert(1)'}
		},
		attribute2 : 
		{
			name : 'Good',
			title : {
				media : {word : 'Good'},
				css : {color:'#31b404','font-size':'2em'}, // ירוק
				height : 7
			}, 
			media : [
				{image: 'P_gift.png'},
				{image: 'P_heart.png'},
				{image: 'P_like.png'},
				{image: 'P_smile.png'},
				{image: 'P_sun.png'}
			], 
			css : {color:'#ffffff','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid white', 'filter':'invert(1)'}
		},
		
		// הגדרות נוספות לרקע שחור
		fontColor : '#ffffff',
		leftKeyText : 'Press "E" for', 
		rightKeyText : 'Press "I" for', 
		keysCss : {'font-size':'0.8em', 'font-family':'courier', color:'#ffffff'},
		orText : 'or', 
		orCss : {'font-size':'1.8em', color:'#ffffff'},
		
		// הסרת ההודעה על הX
		remindErrorText : '',
		
		base_url : {
			image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
		}
	});
});
