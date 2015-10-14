'use strict';
var angular = require('angular');
var autosaveDialogFooter = require('./autosaveDialogFooter/autosaveDialogFooter');
exports.autosaveDialogFooter = autosaveDialogFooter;
var busy = require('./busy/busy');
exports.busy = busy;
var button = require('./button/button');
exports.button = button;
var buttonToggle = require('./buttonToggle/buttonToggle');
exports.buttonToggle = buttonToggle;
var cardContainer = require('./cardContainer/cardContainer.module');
exports.cardContainer = cardContainer;
var commaList = require('./commaList/commaList');
exports.commaList = commaList;
var dateTime = require('./dateTime/dateTime');
exports.dateTime = dateTime;
var genericContainer = require('./genericContainer/genericContainer');
exports.genericContainer = genericContainer;
var lazyLoad = require('./lazyLoad/lazyLoad');
exports.lazyLoad = lazyLoad;
var longClickButton = require('./longClickButton/longClickButton');
exports.longClickButton = longClickButton;
var messageLog = require('./messageLog/messageLog.module');
exports.messageLog = messageLog;
var multiStepIndicator = require('./multiStepIndicator/multiStepIndicator');
exports.multiStepIndicator = multiStepIndicator;
var radio = require('./radio/radio.module');
exports.radio = radio;
var ratingBar = require('./ratingBar/ratingBar');
exports.ratingBar = ratingBar;
var responsiveCardGrid = require('./responsiveCardGrid/responsiveCardGrid.module');
exports.responsiveCardGrid = responsiveCardGrid;
var richTextEditor = require('./richTextEditor/richTextEditor');
exports.richTextEditor = richTextEditor;
var signaturePad = require('./signaturePad/signaturePad');
exports.signaturePad = signaturePad;
var simpleCardList = require('./simpleCardList/simpleCardList.module');
exports.simpleCardList = simpleCardList;
var spinner = require('./spinner/spinner');
exports.spinner = spinner;
var stringWithWatermark = require('./stringWithWatermark/stringWithWatermark');
exports.stringWithWatermark = stringWithWatermark;
var typeahead = require('./typeahead/typeahead');
exports.typeahead = typeahead;
var userRating = require('./userRating/userRating');
exports.userRating = userRating;
exports.moduleName = 'rl.ui.components';
angular.module(exports.moduleName, [
    autosaveDialogFooter.moduleName,
    busy.moduleName,
    button.moduleName,
    buttonToggle.moduleName,
    cardContainer.moduleName,
    commaList.moduleName,
    dateTime.moduleName,
    genericContainer.moduleName,
    lazyLoad.moduleName,
    longClickButton.moduleName,
    messageLog.moduleName,
    multiStepIndicator.moduleName,
    radio.moduleName,
    ratingBar.moduleName,
    responsiveCardGrid.moduleName,
    richTextEditor.moduleName,
    signaturePad.moduleName,
    simpleCardList.moduleName,
    spinner.moduleName,
    stringWithWatermark.moduleName,
    typeahead.moduleName,
    userRating.moduleName,
]);
//# sourceMappingURL=components.module.js.map