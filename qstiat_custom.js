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
		category : { 
			name : 'Superstitions',
			title : {
				media : {word : 'Superstitions'},
				css : {color:'#007acc','font-size':'2em'},
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
			css : {color:'#007acc','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid black'}
		},	
		attribute1 : 
		{
			name : 'Bad',
			title : {
				media : {word : 'Bad'},
				css : {color:'#cc0000','font-size':'2em'},
				height : 7
			}, 
			media : [
				{image: 'N_scull.png'},
				{image: 'N_brokenheart.png'},
				{image: 'N_unlike.png'},
				{image: 'N_sad.png'},
				{image: 'N_fire.png'}
			], 
			css : {color:'#cc0000','font-size':'3em', 'max-width':'200px', 'max-height':'200px', width:'200px', height:'200px', border:'3px solid black'}
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
		
		// מגבלת זמן - 1500 מילישניות כפי שכתוב במחקר
		maxRT : 1500,
		
		// הודעה כשהזמן נגמר
		remindErrorText : '<p align="center" style="font-size:0.6em; font-family:arial">' +
			'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
			'Press the other key to continue.<br/>' +
			'<font color="#ff0000">אנא הגיבו מהר יותר?</font><p/>',
		
		// הגדרת 4 הבלוקים לפי הטבלה שלך
		trialsByBlock : 
		[
			// בלוק 1: תרגול - Superstitions+Good בשמאל, Bad בימין (24 חזרות)
			{
				instHTML : '',
				block : 1,
				miniBlocks : 1,
				singleAttTrials : 8,  // Bad trials (ימין)
				sharedAttTrials : 8,  // Good trials (שמאל, משותף עם superstitions)  
				categoryTrials : 8    // Superstitions trials (שמאל)
				// סה"כ: 24 חזרות
			}, 
			// בלוק 2: מבחן - Superstitions+Good בשמאל, Bad בימין (72 חזרות)
			{ 
				instHTML : '', 
				block : 2, 
				miniBlocks : 3,
				singleAttTrials : 8,   // Bad trials (ימין) - 8x3=24
				sharedAttTrials : 12,  // Good trials (שמאל) - 12x3=36
				categoryTrials : 4     // Superstitions trials (שמאל) - 4x3=12
				// סה"כ: 72 חזרות
			}, 
			// בלוק 3: תרגול - Good בשמאל, Superstitions+Bad בימין (24 חזרות)
			{ 
				instHTML : '', 
				block : 3, 
				miniBlocks : 1,
				singleAttTrials : 8,   // Good trials (שמאל)
				sharedAttTrials : 8,   // Bad trials (ימין, משותף עם superstitions)
				categoryTrials : 8     // Superstitions trials (ימין)
				// סה"כ: 24 חזרות
			}, 
			// בלוק 4: מבחן - Good בשמאל, Superstitions+Bad בימין (72 חזרות)
			{ 
				instHTML : '', 
				block : 4, 
				miniBlocks : 3,
				singleAttTrials : 24,  // Good trials (שמאל) - 24x1=24  
				sharedAttTrials : 12,  // Bad trials (ימין) - 12x3=36
				categoryTrials : 4     // Superstitions trials (ימין) - 4x3=12
				// סה"כ: 72 חזרות
			}
		],
		
		// מתחילים עם הקטגוריה בצד שמאל (superstitions משמאל בבלוקים 1-2)
		blockOrder : 'startLeft',
		
		// עוברים צד בבלוק 3
		switchSideBlock : 3,
		
		// תיקון צבעים בהוראות
		instTemplatePractice : '<div><p align="center" style="font-size:20px; font-family:arial">' +
			'<font color="#000000"><u>Part blockNum of 4</u><br/><br/></p>' + 
			'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
			'Put a left finger on the <b>E</b> key for items that belong to the category ' + 
			'<font color="#cc0000">attribute1</font>.<br/>' + 
			'Put a right finger on the <b>I</b> key for items that belong to the category ' + 
			'<font color="#31b404">attribute2</font>.<br/>' + 
			'Items will appear one at a time.<br/><br/>' + 
			'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' + 
			'Press the other key to continue.<br/><br/>' + 
			'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>', 
		instTemplateCategoryRight : '<div><p align="center" style="font-size:20px; font-family:arial">' +
			'<font color="#000000"><u>Part blockNum of 4</u><br/><br/></p>' + 
			'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
			'Put a left finger on the <b>E</b> key for items that belong to the category ' + 
			'<font color="#cc0000">attribute1</font>.<br/>' + 
			'Put a right finger on the <b>I</b> key for items that belong to the category ' + 
			'<font color="#31b404">attribute2</font> ' +
			'and for items that belong to the category <font color="#007acc">thecategory</font>.<br/>' + 
			'Items will appear one at a time.<br/><br/>' + 
			'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' + 
			'Press the other key to continue.<br/><br/>' + 
			'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>', 
		instTemplateCategoryLeft : '<div><p align="center" style="font-size:20px; font-family:arial">' +
			'<font color="#000000"><u>Part blockNum of 4</u><br/><br/></p>' + 
			'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
			'Put a left finger on the <b>E</b> key for items that belong to the category ' + 
			'<font color="#cc0000">attribute1</font> ' +
			'and for items that belong to the category <font color="#007acc">thecategory</font>.<br/>' + 
			'Put a right finger on the <b>I</b> key for items that belong to the category ' + 
			'<font color="#31b404">attribute2</font>.<br/>' + 
			'Items will appear one at a time.<br/><br/>' + 
			'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' + 
			'Press the other key to continue.<br/><br/>' + 
			'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
		
		base_url : {
			image : 'https://raw.githubusercontent.com/lizdahanantebi/liz.github.io/main/superstition_images/'
		}
	});
});
