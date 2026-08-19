define(['pipAPI','pipScorer','underscore'], function(APIConstructor, Scorer, _) {

 function stiatExtension(options)
 {
 var API = new APIConstructor();

 // ✨ תוספת לקריאת PROLIFIC_PID מה-URL
 const query = (new URL(window.location.href)).searchParams;
 const prolific_id = query.get('PROLIFIC_PID') || 'NA';
 
 var scorer = new Scorer();
 var piCurrent = API.getCurrent();


 var stiatObj = 
 {
 //Set the canvas of the task
 canvas : {
 maxWidth: 725,
 proportions : 0.7,
 background: '#ffffff',
 borderWidth: 5,
 canvasBackground: '#ffffff',
 borderColor: 'lightblue'
 }, 
 //Define the category.
 category : 
 {
 name : 'Black People', //Category name to be used for feedback and logging.
 title : {
 media : {word : 'Black People'}, //Name of the category presented in the task.
 css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
 height : 4 //Used to position the "Or" in the combined block.
 }, 
 media : [ //Stimuli
 {word: 'Tyron'},
 {word: 'Malik'},
 {word: 'Terrell'},
 {word: 'Jazmin'},
 {word: 'Tiara'},
 {word: 'Shanice'}
 ],
 //Can change color and size of the targets here.
 css : {color:'#31b404','font-size':'2em'}
 }, 
 attribute1 : 
 {
 name : 'Bad', //Attribute name to be used for feedback and logging
 title : {
 media : {word : 'Bad'}, //Name of the category presented in the task.
 css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
 height : 4 //Used to position the "Or" in the combined block.
 }, 
 media : [ //Stimuli
 {word: 'Bomb'},
 {word: 'Abuse'},
 {word: 'Sadness'},
 {word: 'Pain'},
 {word: 'Poison'},
 {word: 'Grief'}
 ], 
 //Can change color and size of the targets here.
 css : {color:'#31b404','font-size':'2em'}
 },
 attribute2 : 
 {
 name : 'Good', //Attribute name to be used for feedback and logging
 title : {
 media : {word : 'Good'}, //Name of the category presented in the task.
 css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
 height : 4 //Used to position the "Or" in the combined block.
 }, 
 media : [ //Stimuli
 {word: 'Paradise'},
 {word: 'Pleasure'},
 {word: 'Cheer'},
 {word: 'Wonderful'},
 {word: 'Splendid'},
 {word: 'Love'}
 ], 
 //Can change color and size of the targets here.
 css : {color:'#31b404','font-size':'2em'}
 }, 
 trialsByBlock : 
 [// 4 בלוקים: תרגול, מבחן, תרגול, מבחן
 {
 // בלוק 1: תרגול - אמונות טפלות עם Good/Bad (לא נכנס ל-D-score)
 instHTML : '', 
 block : 1, 
 miniBlocks : 2, // 2 מיני-בלוקים
 singleAttTrials : 10, // 10×2 = 20
 sharedAttTrials : 7, // 7×2 = 14
 categoryTrials : 7 // 7×2 = 14, סה"כ 48 חזרות
 }, 
 { 
 // בלוק 2: מבחן (כן נכנס ל-D-score)
 instHTML : '', 
 block : 2, 
 miniBlocks : 2, // 2 מיני-בלוקים
 singleAttTrials : 10, // 10×2 = 20
 sharedAttTrials : 7, // 7×2 = 14
 categoryTrials : 7 // 7×2 = 14, סה"כ 48 חזרות
 }, 
 { 
 // בלוק 3: תרגול אחרי החלפת צד (לא נכנס ל-D-score)
 instHTML : '', 
 block : 3, 
 miniBlocks : 2, // 2 מיני-בלוקים
 singleAttTrials : 10, // 10×2 = 20
 sharedAttTrials : 7, // 7×2 = 14
 categoryTrials : 7 // 7×2 = 14, סה"כ 48 חזרות
 }, 
 { 
 // בלוק 4: מבחן אחרי החלפת צד (כן נכנס ל-D-score)
 instHTML : '', 
 block : 4, 
 miniBlocks : 2, // 2 מיני-בלוקים
 singleAttTrials : 10, // 10×2 = 20
 sharedAttTrials : 7, // 7×2 = 14
 categoryTrials : 7 // 7×2 = 14, סה"כ 48 חזרות
 }
 ],
 //All blocks show attribute1 on the left and attribute2 on the right. 
 //blockOrder can be: 'startRight', 'startLeft', and 'random'
 blockOrder : 'startLeft', // שונה מ-random ל-startLeft לפי הטבלה
 //Change to 'startRight' if you want to start with category on the right in the first block. 
 //Change to 'startLeft' if you want to start with category on the left in the first block. 
 //Change to 'random' if you want to randomize whether the category starts on the left or on the right.
 //NOTICE: to know what the block-order condition is, we save the pairing definition of the second block, 
 //into the explicit table, under the variable name block2Condition.

 //If the switch parameter is 0 or smaller, we switch the side of the category every block. 
 //If it is larger than 0, then we switch the category side only once, in the block specified in switchSideBlock.
 switchSideBlock : 3, // החלפת צד בבלוק 3 (אחרי הסרת בלוק התרגול הישן)

 base_url : {//Where are your images?
 image : '/implicit/user/yba/pipexample/stiat/images/'
 }, 
 ITIDuration : 250, //Duration between trials.
 
 fontColor : '#000000', //The color of messages and key reminders. 
 
 //Text and style for key instructions displayed about the category labels.
 leftKeyText : 'Press "E" for', 
 rightKeyText : 'Press "I" for', 
 keysCss : {'font-size':'0.8em', 'font-family':'courier', color:'#000000'},
 //Text and style for the separator between the top and bottom category labels.
 orText : 'or', 
 orCss : {'font-size':'1.8em', color:'#000000'},

 //Will appear at the bottom of the screen during instruction screens only.
 remindErrorText : ' ' +
 'If you make a mistake, a red X will appear. ' +
 'Press the other key to continue. ',
 
 finalText: 'You have completed this task Press SPACE to continue.', 

 //These are templates for the instructions in the task. 
 //If you want more specific instructions for different blocks, 
 // use the instHTML variables above. 
 // The following variables in the instructions text will be replaced: 
 // blockNum, nBlocks, attribute1, attribute2, and thecategory.
 // Notice that this is HTML text.
 instTemplatePractice : '<div><p align="center" style="font-size:20px; font-family:arial">' +
 '<font color="#000000"><u>Part blockNum of nBlocks</u><br/><br/></p>' +
 '<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
 'Put a left finger on the <b>E</b> key for items that belong to the category ' +
 '<font color="#000000"><b>attribute1</b></font>.<br/>' +
 'Put a right finger on the <b>I</b> key for items that belong to the category ' +
 '<font color="#000000"><b>attribute2</b></font>.<br/>' +
 'Items will appear one at a time.<br/><br/>' +
 'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
 'Press the other key to continue.<br/><br/>' +
 '<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
 instTemplateCategoryRight : '<div><p align="center" style="font-size:20px; font-family:arial">' +
 '<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +
 '<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
 'Put a left finger on the <b>E</b> key for items that belong to the category ' +
 '<font color="#000000"><b>attribute1</b></font>.<br/>' +
 'Put a right finger on the <b>I</b> key for items that belong to the category ' +
 '<font color="#000000"><b>attribute2</b></font> ' +
 'and for items that belong to the category <font color="#000000"><b>thecategory</b></font>.<br/>' +
 'Items will appear one at a time.<br/><br/>' +
 'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
 'Press the other key to continue.<br/><br/>' +
 '<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
 instTemplateCategoryLeft : '<div><p align="center" style="font-size:20px; font-family:arial">' +
 '<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +
 '<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
 'Put a left finger on the <b>E</b> key for items that belong to the category ' +
 '<font color="#000000"><b>attribute1</b></font> ' +
 'and for items that belong to the category <font color="#000000"><b>thecategory</b></font>.<br/>' +
 'Put a right finger on the <b>I</b> key for items that belong to the category ' +
 '<font color="#000000"><b>attribute2</b></font>.<br/>' +
 'Items will appear one at a time.<br/><br/>' +
 'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
 'Press the other key to continue.<br/><br/>' +
 '<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>', 
 
 //The default feedback messages for each cutoff. 
 //If you put attribute1, attribute2 and thecategory here, 
 //these will be replaced with the names of attribute1, attribute2 and category.
 fb_strongAssociationWithAttribute2 : 'Your data suggest a strong positive automatic attitude toward thecategory.',
 fb_moderateAssociationWithAttribute2 : 'Your data suggest a moderate positive automatic attitude toward thecategory.',
 fb_weakAssociationWithAttribute2 : 'Your data suggest a weak positive automatic attitude toward thecategory.',
 fb_neutralAssociation : 'Your data suggest a neutral automatic attitude toward thecategory.',
 fb_weakAssociationWithAttribute1 : 'Your data suggest a weak negative automatic attitude toward thecategory.' ,
 fb_moderateAssociationWithAttribute1 : 'Your data suggest a moderate negative automatic attitude toward thecategory.' ,
 fb_strongAssociationWithAttribute1 : 'Your data suggest a strong negative automatic attitude toward thecategory.', 
 
 //Error messages in the scorer. If empty then we use the scorer's default messages.
 manyErrors: '',
 tooFast: '',
 notEnough: '' //Usually relevant only if skipped the task.
 };

 // extend the current object with the default
 _.defaults(piCurrent, options, stiatObj);

 // Between-subjects: which side Good appears on (E=left, I=right).
 // Default 'right' keeps current behavior: Bad on E, Good on I.
 // When 'left': swap attribute objects so Good is on E and Bad on I.
 // D-score cond1/cond2 are adjusted below so positive D still = association with Good.
 var goodSide = String(piCurrent.goodSide || query.get('goodSide') || 'right').toLowerCase();
 if (goodSide !== 'left' && goodSide !== 'right') goodSide = 'right';
 piCurrent.goodSide = goodSide;
 var goodOnLeft = (goodSide === 'left');
 if (goodOnLeft) {
  var swappedAttribute = piCurrent.attribute1;
  piCurrent.attribute1 = piCurrent.attribute2;
  piCurrent.attribute2 = swappedAttribute;
 }

 // ----- SC-IAT: תמיכה בהחלפת Condition בין בלוקים (חיובי/שלילי) -----
 var switchBlock = piCurrent.switchToNegativeAtBlock || piCurrent.switchToPositiveAtBlock || 0;
 var otherConfig = piCurrent.negativeConfig || piCurrent.positiveConfig || null;
 var attribute1_2, attribute2_2, category_2;
 var leftLayout2, rightLayout2;
 if (otherConfig) {
   attribute1_2 = otherConfig.attribute1.name;
   attribute2_2 = otherConfig.attribute2.name;
   category_2 = otherConfig.category.name;
   leftLayout2 = [
     {location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
     {location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
     {location:{left:6,top:4},media:otherConfig.attribute1.title.media, css:otherConfig.attribute1.title.css},
     {location:{right:6,top:4},media:otherConfig.attribute2.title.media, css:otherConfig.attribute2.title.css},
     {location:{left:6,top:4+(otherConfig.attribute1.title.height|3)}, media:{word:piCurrent.orText}, css:piCurrent.orCss},
     {location:{left:6,top:11+(otherConfig.attribute1.title.height|3)},media:otherConfig.category.title.media, css:otherConfig.category.title.css}
   ];
   rightLayout2 = [
     {location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
     {location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
     {location:{left:6,top:4},media:otherConfig.attribute1.title.media, css:otherConfig.attribute1.title.css},
     {location:{right:6,top:4},media:otherConfig.attribute2.title.media, css:otherConfig.attribute2.title.css},
     {location:{right:6,top:4+(otherConfig.attribute2.title.height|3)},media:{word:piCurrent.orText}, css:piCurrent.orCss},
     {location:{right:6,top:11+(otherConfig.attribute2.title.height|3)},media:otherConfig.category.title.media, css:otherConfig.category.title.css}
   ];
 }

 /***********************************************************************************
 *
 * Here starts the script. You might not need to change anything in the actual script.
 *
 ************************************************************************************/
 
 var attribute1 = piCurrent.attribute1.name;
 var attribute2 = piCurrent.attribute2.name;
 var category = piCurrent.category.name;

 //This is our block-order condition. We will save it in the explicit table.
 var block2Condition;
 
 // layout object for the trials where category on left
 var leftLayout = [
 {location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
 {location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
 {location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
 {location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css},
 {location:{left:6,top:4+(piCurrent.attribute1.title.height|3)}, media:{word:piCurrent.orText}, css:piCurrent.orCss},
 {location:{left:6,top:11+(piCurrent.attribute1.title.height|3)},media:piCurrent.category.title.media, css:piCurrent.category.title.css}
 ];
 // layout object for the trials where category on right
 var rightLayout = [
 {location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
 {location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
 {location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
 {location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css},
 {location:{right:6,top:4+(piCurrent.attribute2.title.height|3)},media:{word:piCurrent.orText}, css:piCurrent.orCss},
 {location:{right:6,top:11+(piCurrent.attribute2.title.height|3)},media:piCurrent.category.title.media, css:piCurrent.category.title.css}
 ];
 // layout object for practice blocks (no category)
 var pracLayout = [
 {location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
 {location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
 {location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
 {location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css}
 ];
 
 var reminderStimulus = {location:{bottom:1}, css: {color:piCurrent.fontColor,'font-size':'1em'}, media : {html: piCurrent.remindErrorText}};

 API.addSettings('canvas',piCurrent.canvas);
 API.addSettings('base_url',piCurrent.base_url);

 /**
 * Create default Trial
 */
 API.addTrialSets('sort',{
 // by default each trial is correct, this is modified in case of an error
 data: {score:0, parcel:'first'},
 // set the interface for trials
 input: [
 {handle:'skip1',on:'keypressed', key:27}, //Esc + Enter will skip blocks
 {handle:'left',on:'keypressed',key:'e'},
 {handle:'right',on:'keypressed',key:'i'},
 ],

 // user interactions
 interactions: [
 // begin trial : display stimulus immediately
 {
 conditions: [{type:'begin'}],
 actions: [{type:'showStim',handle:'targetStim'}]
 },

 // error
 {
 conditions: [
 {type:'inputEqualsTrial', property:'corResp',negate:true}, //Not the correct response.
 {type:'inputEquals',value:['right','left']} // responded with one of the two responses
 ],
 actions: [
 {type:'showStim',handle:'error'}, // show error stimulus
 {type:'setTrialAttr', setter:{score:1}} // set the score to 1
 ]
 },

 // correct
 {
 conditions: [{type:'inputEqualsTrial', property:'corResp'}], // check if the input handle is equal to correct response (in the trial's data object)
 actions: [
 {type:'removeInput',handle:['left','right','timeout']}, //Cannot respond anymore
 {type:'hideStim', handle: 'All'}, // hide everything
 {type:'log'}, // log this trial
 {type:'setInput',input:{handle:'end', on:'timeout',duration:piCurrent.ITIDuration}} // trigger the "end action after ITI"
 ]
 },

 // end after ITI
 {
 conditions: [{type:'inputEquals',value:'end'}],
 actions: [
 {type:'endTrial'}
 ]
 },

 // skip block
 {
 conditions: [{type:'inputEquals',value:'skip1'}],
 actions: [
 {type:'setInput',input:{handle:'skip2', on:'enter'}} // allow skipping if next key is enter.
 ]
 },
 // skip block
 {
 conditions: [{type:'inputEquals',value:'skip2'}],
 actions: [
 {type:'goto', destination: 'nextWhere', properties: {blockStart:true}},
 {type:'endTrial'}
 ]
 }
 ]
 });

 /**
 * Create default instructions trials
 */
 API.addTrialSets('instructions', [
 // generic instructions trial, to be inherited by all other inroduction trials
 {
 // set block as generic so we can inherit it later
 data: {blockStart:true, block:0, condition:'inst', score:0},

 // create user interface (just click to move on...)
 input: [
 {handle:'space',on:'space'}
 ],

 interactions: [
 // display instructions
 {
 conditions: [{type:'begin'}],
 actions: [
 {type:'showStim',handle:'All'}
 ]
 },
 // space hit, end trial soon
 {
 conditions: [{type:'inputEquals',value:'space'}],
 actions: [
 {type:'hideStim', handle:'All'},
 {type:'log'},
 {type:'trigger', handle:'endTrial', duration:500}
 ]
 },
 {
 conditions: [{type:'inputEquals',value:'endTrial'}],
 actions: [{type:'endTrial'}]
 }
 ]
 }
 ]);

 /**
 * The four basic trials (plus second-condition category trials when switching blocks).
 */
 var trialSetsToAdd = {
 leftAtt1: [{
 inherit : 'sort', 
 data : {corResp : 'left'},
 stimuli : 
 [
 {inherit:{type:'exRandom',set:'attribute1'}},
 {inherit:{set:'error'}},
 {inherit:{set:'timeoutStim'}}
 ]
 }],
 rightAtt2: [{
 inherit : 'sort', 
 data : {corResp : 'right'},
 stimuli : 
 [
 {inherit:{type:'exRandom',set:'attribute2'}},
 {inherit:{set:'error'}},
 {inherit:{set:'timeoutStim'}}
 ]
 }],
 leftCat: [{
 inherit : 'sort', 
 data : {corResp : 'left'},
 stimuli : 
 [
 {inherit:{type:'exRandom',set:'category'}},
 {inherit:{set:'error'}},
 {inherit:{set:'timeoutStim'}}
 ]
 }],
 rightCat: [{
 inherit : 'sort', 
 data : {corResp : 'right'},
 stimuli : 
 [
 {inherit:{type:'exRandom',set:'category'}},
 {inherit:{set:'error'}},
 {inherit:{set:'timeoutStim'}}
 ]
 }]
 };
 if (otherConfig) {
   trialSetsToAdd.leftCat2 = [{
     inherit : 'sort', 
     data : {corResp : 'left'},
     stimuli : [
       {inherit:{type:'exRandom',set:'category2'}},
       {inherit:{set:'error'}},
       {inherit:{set:'timeoutStim'}}
     ]
   }];
   trialSetsToAdd.rightCat2 = [{
     inherit : 'sort', 
     data : {corResp : 'right'},
     stimuli : [
       {inherit:{type:'exRandom',set:'category2'}},
       {inherit:{set:'error'}},
       {inherit:{set:'timeoutStim'}}
     ]
   }];
 }
 API.addTrialSets(trialSetsToAdd);

 /**
 * Stimulus Sets
 */
 var stimulusSetsToAdd = {
 Default: [
 {css:{color:'white','font-size':'2em'}}
 ],

 instructions: [
 {css:{'font-size':'1.4em',color:'black', lineHeight:1.2}, nolog:true, location:{bottom:1}}
 ],

 attribute1 : 
 [{
 data: {alias:attribute1, handle:'targetStim'}, 
 inherit : 'Default', 
 css:piCurrent.attribute1.css,
 media : {inherit:{type:'exRandom',set:'attribute1'}}
 }],
 attribute2 : 
 [{
 data: {alias:attribute2, handle:'targetStim'}, 
 inherit : 'Default', 
 css:piCurrent.attribute2.css,
 media : {inherit:{type:'exRandom',set:'attribute2'}}
 }],
 category : 
 [{
 data: {alias:category, handle:'targetStim'}, 
 inherit : 'Default', 
 css:piCurrent.category.css,
 media : {inherit:{type:'exRandom',set:'category'}}
 }], 
 error : [{
 data:{handle:'error'}, location: {top: 75}, css:{color:'red','font-size':'2.5em'}, media: {word:'X'}, nolog:true
 }],
 timeoutStim : [{
 data:{handle:'timeoutStim'}, location: {top: 80}, css:{color:'red','font-size':'2em'}, media: {word:'Please response faster'}, nolog:true
 }],
 dummyForLog : [{
 data:{name:'dummyForLog', alias:'dummyForLog'}, 
 location:{left:99}, media:{word:' '}
 }]
 };
 if (otherConfig) {
   stimulusSetsToAdd.category2 = [{
     data: {alias:category_2, handle:'targetStim'}, 
     inherit : 'Default', 
     css:otherConfig.category.css,
     media : {inherit:{type:'exRandom',set:'category2'}}
   }];
 }
 API.addStimulusSets(stimulusSetsToAdd);

 /**
 * Media Sets
 */
 var mediaSetsToAdd = {
 attribute1 : piCurrent.attribute1.media,
 attribute2: piCurrent.attribute2.media,
 category: piCurrent.category.media
 };
 if (otherConfig) {
   mediaSetsToAdd.category2 = otherConfig.category.media;
 }
 API.addMediaSets(mediaSetsToAdd);

 /**
 * Create the Task sequence
 */
 //helper Function for getting the instructions HTML (optional overrides for second condition).
 function getInstFromTemplate(inText, blockNum, nBlocks, optAttr1, optAttr2, optCat)
 {
 var a1 = (optAttr1 != null) ? optAttr1 : attribute1;
 var a2 = (optAttr2 != null) ? optAttr2 : attribute2;
 var cat = (optCat != null) ? optCat : category;
 var retText = inText.replace(/attribute1/g, a1);
 retText = retText.replace(/attribute2/g, a2);
 retText = retText.replace(/thecategory/g, cat);
 retText = retText.replace(/blockNum/g, blockNum);
 retText = retText.replace(/nBlocks/g, nBlocks);
 return (retText);
 }
 function getInstHTML(params, optAttr1, optAttr2, optCat)
 {
 var instHTML = '';
 if (params.isPractice)
 {
 instHTML = getInstFromTemplate(piCurrent.instTemplatePractice, params.blockNum, params.nBlocks, optAttr1, optAttr2, optCat);
 }
 else if (params.categorySide == 'rightCat')
 {
 instHTML = getInstFromTemplate(piCurrent.instTemplateCategoryRight, params.blockNum, params.nBlocks, optAttr1, optAttr2, optCat);
 }
 else if (params.categorySide == 'leftCat')
 {
 instHTML = getInstFromTemplate(piCurrent.instTemplateCategoryLeft, params.blockNum, params.nBlocks, optAttr1, optAttr2, optCat);
 }
 return (instHTML);
 }
 
 //This is the tricky part. We will create the trial sequence with js code, for flexibility.
 var trialSequence = [];
 
 ////Set the block order
 var firstCatSide = 'leftCat';
 if (piCurrent.blockOrder == 'startRight')
 {
 firstCatSide = 'rightCat';
 }
 else if (piCurrent.blockOrder == 'random')
 {
 firstCatSide = (Math.random() < 0.5) ? 'rightCat' : 'leftCat';
 }
 
 // בתוך כל Condition, באיזה בלוק (יחסי לתחילת ה-Condition) מחליפים צד.
 // ברירת מחדל: switchSideBlock מההגדרות (למשל 3 = החלפה בבלוק השלישי של כל חלק).
 var sideSwitchOffset = (piCurrent.switchSideBlock > 0) ? piCurrent.switchSideBlock : 0;

 var catSide = '';
 for (var iBlock = 1; iBlock <= piCurrent.trialsByBlock.length; iBlock++)
 {//For each block

 // ----- SC-IAT: בחירת Condition לפי מספר הבלוק (חיובי vs שלילי) -----
 var useSecondCondition = (otherConfig && switchBlock > 0 && iBlock >= switchBlock);
 var currentAttr1 = useSecondCondition ? attribute1_2 : attribute1;
 var currentAttr2 = useSecondCondition ? attribute2_2 : attribute2;
 var currentCategory = useSecondCondition ? category_2 : category;

 // בתחילת החלק השני מאפסים את צד הקטגוריה כדי שכל Condition יתחיל מאותו צד
 if (useSecondCondition && iBlock === switchBlock)
 {
 catSide = '';
 }

 var isPrac = false;
 var currentCondition = '';
 var blockLayout;
 if (piCurrent.trialsByBlock[iBlock-1].categoryTrials === 0)
 {//There are no category trials, so this is a practice block because.
 isPrac = true;
 }
 else if (catSide != 'rightCat' && catSide != 'leftCat' )
 {//This is not practice, and we should not switch sides, but the category side has has never been set.
 catSide = firstCatSide;
 }
 else
 {
 // החלפת צד פעם אחת בכל Condition: בבלוק היחסי שנבחר ב-switchSideBlock
 var blockIndexInCondition = useSecondCondition ? (iBlock - switchBlock + 1) : iBlock;
 var shouldSwitchSide = (sideSwitchOffset > 0 && blockIndexInCondition === sideSwitchOffset) ||
  (piCurrent.switchSideBlock <= 0); // Switch layout every block
 if (shouldSwitchSide)
 {//Switch layout
 if (catSide == 'rightCat')
 {
 catSide = 'leftCat';
 }
 else if (catSide == 'leftCat')
 {
 catSide = 'rightCat';
 }
 }
 }

 // איזה trial type להצגה עבור קטגוריה: בבלוקים של Condition שני משתמשים ב-leftCat2/rightCat2
 var catTrialType = (useSecondCondition && (catSide === 'leftCat' || catSide === 'rightCat')) ? (catSide === 'leftCat' ? 'leftCat2' : 'rightCat2') : catSide;

 //According to the catSide
 if (isPrac)
 {
 blockLayout = pracLayout;
 currentCondition = currentAttr1 + ',' + currentAttr2;
 }
 else if (catSide == 'leftCat')
 {
 blockLayout = useSecondCondition ? leftLayout2 : leftLayout;
 singleAttribute = 'rightAtt2';
 catAttribute = 'leftAtt1';
 currentCondition = currentCategory + '/' + currentAttr1 + ',' + currentAttr2;
 }
 else if (catSide == 'rightCat')
 {
 blockLayout = useSecondCondition ? rightLayout2 : rightLayout;
 singleAttribute = 'leftAtt1';
 catAttribute = 'rightAtt2';
 currentCondition = currentAttr1 + ',' + currentAttr2 + '/' + currentCategory;
 }

 if (iBlock === 2) // שינוי: הבלוק השני הוא עכשיו הבלוק שיגדיר את התנאי
 {//Set the block2Condition variable. That is our block order condition.
 block2Condition = currentCondition;
 }
 //Which is the single attribute? The one that is on the other side of the category.
 var singleAttribute = (catSide == 'rightCat') ? 'leftAtt1' : 'rightAtt2';
 //And the category's attribute? The other side, of course.
 var catAttribute = (singleAttribute == 'leftAtt1') ? 'rightAtt2' : 'leftAtt1';
 
 //Set the instructions html (use current condition names for this block).
 var instHTML = piCurrent.trialsByBlock[iBlock-1].instHTML; 
 if (instHTML === '') 
 {
 instHTML = getInstHTML({
 blockNum : iBlock, 
 nBlocks : piCurrent.trialsByBlock.length, 
 isPractice : isPrac, categorySide : catSide
 }, currentAttr1, currentAttr2, currentCategory);
 }
 //Add the block's instructions sequence
 trialSequence.push(
 {
 inherit : 'instructions', 
 data: {blockStart:true},
 layout : blockLayout, 
 stimuli : [
 { 
 inherit : 'instructions', 
 media : {html : instHTML}
 },
 {
 data : {handle:'dummy', alias:'dummy'},
 media : {word:' '}, 
 location : {top:1}
 }
 ]
 }
 );
 
 //We separate each block to mini blocks to reduce repetition of categories and responses.
 // D-score: רק בלוקי מבחן (2 ו-4). בלוקי תרגול (1 ו-3) מסומנים parcel:'practice' ולא נכנסים לחישוב.
 var scoreParcel = (iBlock === 2 || iBlock === 4) ? 'first' : 'practice';
 for (var iMini = 1; iMini <= piCurrent.trialsByBlock[iBlock-1].miniBlocks; iMini++)
 {//For each mini block
 var mixer = 
 {
 mixer : 'random', 
 data : 
 [
 {
 mixer : 'repeat', 
 times : piCurrent.trialsByBlock[iBlock-1].singleAttTrials,
 data : 
 [{
 inherit : singleAttribute, 
 data : {condition : currentCondition, block : iBlock, parcel : scoreParcel}, 
 layout : blockLayout
 }]
 }, 
 {
 mixer : 'repeat', 
 times : piCurrent.trialsByBlock[iBlock-1].sharedAttTrials,
 data : 
 [{
 inherit : catAttribute, 
 data : {condition : currentCondition, block : iBlock, parcel : scoreParcel}, 
 layout : blockLayout
 }]
 } 
 ]
 };
 if (!isPrac)
 {
 mixer.data.push(
 {
 mixer : 'repeat', 
 times : piCurrent.trialsByBlock[iBlock-1].categoryTrials,
 data : 
 [{
 inherit : catTrialType, 
 data : {condition : currentCondition, block : iBlock, parcel : scoreParcel}, 
 layout : blockLayout
 }]
 }
 );
 }
 trialSequence.push(mixer);
 }
 }
 //Add the final goodbye trial.
 trialSequence.push({
 inherit : 'instructions', 
 data: {blockStart:true},
 layout : [{media:{word:''}}], 
 stimuli : [
 { 
 inherit : 'instructions', 
 css : {color:piCurrent.fontColor}, 
 media:{html:' ' + 
 piCurrent.finalText + ' '}
 },
 {
 data : {handle:'dummy', alias:'dummy'},
 media : {word:' '}, 
 location : {top:1}
 } 
 ]
 });
 //Now add the trials sequence to the API.
 API.addSequence(trialSequence);
 
 /**
 Compute the Feedback.
 **/
 
 //Settings for the score computation.
 // cond2 = category paired with Good (positive D = positive attitude toward category).
 // When Good is on the left, attribute objects were swapped, so the pairing strings flip.
 var condCategoryWithBad = goodOnLeft ? [
  attribute1 + ',' + attribute2 + '/' + category
 ] : [
  category + '/' + attribute1 + ',' + attribute2
 ];
 var condCategoryWithGood = goodOnLeft ? [
  category + '/' + attribute1 + ',' + attribute2
 ] : [
  attribute1 + ',' + attribute2 + '/' + category
 ];
 if (otherConfig) {
  if (goodOnLeft) {
   condCategoryWithBad = [
    attribute1 + ',' + attribute2 + '/' + category,
    attribute1_2 + ',' + attribute2_2 + '/' + category_2
   ];
   condCategoryWithGood = [
    category + '/' + attribute1 + ',' + attribute2,
    category_2 + '/' + attribute1_2 + ',' + attribute2_2
   ];
  } else {
   condCategoryWithBad = [
    category + '/' + attribute1 + ',' + attribute2,
    category_2 + '/' + attribute1_2 + ',' + attribute2_2
   ];
   condCategoryWithGood = [
    attribute1 + ',' + attribute2 + '/' + category,
    attribute1_2 + ',' + attribute2_2 + '/' + category_2
   ];
  }
 }
 scorer.addSettings('compute',{
 ErrorVar:'score',
 condVar:'condition',
 cond1VarValues: condCategoryWithBad,
 cond2VarValues: condCategoryWithGood,
 parcelVar : "parcel", 
 // רק parcel 'first' = בלוקים 2 ו-4 (מבחן). בלוקים 1 ו-3 הם 'practice' ולא נכללים.
 parcelValue : ['first'],
 fastRT : 150, 
 maxFastTrialsRate : 0.1, 
 minRT : 400, 
 maxRT : 1500, 
 errorLatency : {use:"latency", penalty:600, useForSTD:true},
 postSettings : {score:"score",msg:"feedback",url:"/implicit/scorer"}
 });

 //Helper function to set the feedback messages.
 function getFBFromTemplate(inText)
 {
 var retText = inText.replace(/attribute1/g, attribute1);
 retText = retText.replace(/attribute2/g, attribute2);
 retText = retText.replace(/thecategory/g, category);
 return (retText);
 }
 //Set the feedback messages.
 var messageDef = [
 { cut:'-0.65', message : getFBFromTemplate(piCurrent.fb_strongAssociationWithAttribute1) },
 { cut:'-0.35', message : getFBFromTemplate(piCurrent.fb_moderateAssociationWithAttribute1) },
 { cut:'-0.15', message : getFBFromTemplate(piCurrent.fb_weakAssociationWithAttribute1) },
 { cut:'0.15', message : getFBFromTemplate(piCurrent.fb_neutralAssociation) },
 { cut:'0.35', message : getFBFromTemplate(piCurrent.fb_weakAssociationWithAttribute2) },
 { cut:'0.65', message : getFBFromTemplate(piCurrent.fb_moderateAssociationWithAttribute2) },
 { cut:'5', message : getFBFromTemplate(piCurrent.fb_strongAssociationWithAttribute2) }
 ];
 var scoreMessageObject = { MessageDef : messageDef };
 if (piCurrent.manyErrors !== '')
 {
 scoreMessageObject.manyErrors = piCurrent.manyErrors;
 }
 if (piCurrent.tooFast !== '')
 {
 scoreMessageObject.tooFast = piCurrent.tooFast;
 }
 if (piCurrent.notEnough !== '')
 {
 scoreMessageObject.notEnough = piCurrent.notEnough;
 }
 scorer.addSettings('message',scoreMessageObject);

 // ----- Logger: שולח שדות נפרדים – חומר גלם (rawData) ו-D-score (dScore, feedback, block2Condition).
 //     הנתונים מגיעים כ-JSON אחד. ב-Qualtrics: לפרסר ולשים כל שדה במשתנה embedded נפרד (ראו הוראות-שדות-נפרדים.txt). -----
 API.addSettings('logger', {
   onRow: function(logName, log, settings, ctx) {
     if (!ctx.logs) ctx.logs = [];
     ctx.logs.push(log);
   },
   onEnd: function(name, settings, ctx) {
     return ctx.logs;
   },
   serialize: function(name, logs) {
     var headers = ['block', 'trial', 'cond', 'type', 'cat', 'stim', 'resp', 'err', 'rt', 'parcel'];
     var hasProps = function(obj, props) {
       for (var i = 0; i < props.length; i++) if (!obj || !obj.hasOwnProperty(props[i])) return false;
       return true;
     };
     var rows = [];
     var i, log;
     var minRT = 400;
     var maxRT = 1500;
     var badCondMap = {};
     var goodCondMap = {};
     for (i = 0; i < condCategoryWithBad.length; i++) badCondMap[condCategoryWithBad[i]] = true;
     for (i = 0; i < condCategoryWithGood.length; i++) goodCondMap[condCategoryWithGood[i]] = true;
     var badRTs = [];
     var goodRTs = [];
     var nExcludedFast = 0;
     var nExcludedSlow = 0;

     for (i = 0; i < (logs && logs.length) || 0; i++) {
       log = logs[i];
       if (log && log.data && hasProps(log.data, ['block', 'condition', 'score'])) {
         rows.push([
           log.data.block,
           log.trial_id != null ? log.trial_id : '',
           log.data.condition,
           log.name != null ? log.name : '',
           (log.stimuli && log.stimuli[0]) != null ? log.stimuli[0] : '',
           (log.media && log.media[0]) != null ? log.media[0] : '',
           log.responseHandle != null ? log.responseHandle : '',
           log.data.score,
           log.latency != null ? log.latency : '',
           log.data.parcel != null ? log.data.parcel : ''
         ]);

         // Summary stats for researchers (same inclusion rules as D-score)
         if (log.data.parcel === 'first' && log.latency != null && !isNaN(log.latency)) {
           var rt = Number(log.latency);
           var cond = log.data.condition;
           if (rt < minRT) {
             nExcludedFast++;
           } else if (rt > maxRT) {
             nExcludedSlow++;
           } else if (badCondMap[cond]) {
             badRTs.push(rt);
           } else if (goodCondMap[cond]) {
             goodRTs.push(rt);
           }
         }
       }
     }

     var mean = function(arr) {
       if (!arr.length) return '';
       var sum = 0;
       for (var j = 0; j < arr.length; j++) sum += arr[j];
       return Math.round((sum / arr.length) * 100) / 100;
     };
     var sdCombined = function(a, b) {
       var all = a.concat(b);
       if (all.length < 2) return '';
       var m = 0;
       for (var j = 0; j < all.length; j++) m += all[j];
       m = m / all.length;
       var ss = 0;
       for (j = 0; j < all.length; j++) ss += (all[j] - m) * (all[j] - m);
       return Math.round(Math.sqrt(ss / (all.length - 1)) * 100) / 100;
     };

     var toCsv = function(mat) { return mat.map(function(arr) { return arr.map(function(v) { var s = String(v); return (/[\n,"]/.test(s)) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(','); }).join('\n'); };
     var rawDataCsv = headers.join(',') + '\n' + toCsv(rows);
     var payload = {
       rawData: rawDataCsv,
       dScore: piCurrent.d != null ? piCurrent.d : '',
       feedback: piCurrent.feedback != null ? piCurrent.feedback : '',
       block2Condition: block2Condition != null ? block2Condition : '',
       goodSide: piCurrent.goodSide != null ? piCurrent.goodSide : 'right',
       meanBad: mean(badRTs),
       meanGood: mean(goodRTs),
       sd: sdCombined(badRTs, goodRTs),
       nBad: badRTs.length,
       nGood: goodRTs.length,
       nExcludedFast: nExcludedFast,
       nExcludedSlow: nExcludedSlow
     };
     return JSON.stringify(payload);
   },
   send: function(name, serialized) {
     if (typeof window.minnoJS !== 'undefined' && window.minnoJS.logger) {
       window.minnoJS.logger(serialized);
       console.log('📊 Data sent: rawData + dScore (separate fields in one JSON object)');
     }
   }
 });

 API.addSettings('hooks',{
 endTask: function(){
 var DScoreObj = scorer.computeD();
 piCurrent.feedback = DScoreObj.FBMsg;
 piCurrent.d = DScoreObj.DScore;
 API.save({prolific_id: prolific_id, block2Condition:block2Condition, feedback:DScoreObj.FBMsg, d: DScoreObj.DScore, goodSide: piCurrent.goodSide});
 // מאפשר ל-wrapper (למשל combined-superstitions) לעדכן משתנה מעבר בין חלקים
 if (typeof piCurrent.onTaskEnd === 'function') {
 try { piCurrent.onTaskEnd(); } catch (e) { console.error('onTaskEnd failed', e); }
 }
 if (typeof window.minnoJS !== 'undefined' && window.minnoJS.onEnd) {
 window.minnoJS.onEnd();
 console.log('✅ Called minnoJS.onEnd()');
 }
 }
});
 return API.script;
 }
 
 return stiatExtension;
});
