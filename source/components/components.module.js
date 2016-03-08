'use strict';
var angular = require('angular');
var autosaveDialogFooter = require('./autosaveDialogFooter/autosaveDialogFooter');
exports.autosaveDialogFooter = autosaveDialogFooter;
var busy = require('./busy/busy');
exports.busy = busy;
var button = require('./button/button');
exports.button = button;
var buttonAsync = require('./buttonAsync/buttonAsync');
exports.buttonAsync = buttonAsync;
var buttonLink = require('./buttonLink/buttonLink');
exports.buttonLink = buttonLink;
var buttonToggle = require('./buttonToggle/buttonToggle');
exports.buttonToggle = buttonToggle;
var cardContainer = require('./cardContainer/cardContainer.module');
exports.cardContainer = cardContainer;
var checkbox = require('./checkbox/checkbox');
exports.checkbox = checkbox;
var commaList = require('./commaList/commaList');
exports.commaList = commaList;
var dateTime = require('./dateTime/dateTime');
exports.dateTime = dateTime;
var dateTimeStatic = require('./dateTimeStatic/dateTimeStatic');
exports.dateTimeStatic = dateTimeStatic;
var dialog = require('./dialog/dialog');
exports.dialog = dialog;
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
var richTextEditor = require('./richTextEditor/richTextEditor');
exports.richTextEditor = richTextEditor;
var select = require('./select/select');
exports.select = select;
var signaturePad = require('./signaturePad/signaturePad');
exports.signaturePad = signaturePad;
var simpleCardList = require('./simpleCardList/simpleCardList.module');
exports.simpleCardList = simpleCardList;
var spinner = require('./spinner/spinner');
exports.spinner = spinner;
var stringWithWatermark = require('./stringWithWatermark/stringWithWatermark');
exports.stringWithWatermark = stringWithWatermark;
var tabs = require('./tabs/tabs.module');
exports.tabs = tabs;
var templateRenderer = require('./templateRenderer/templateRenderer');
exports.templateRenderer = templateRenderer;
var textarea = require('./textarea/textarea');
exports.textarea = textarea;
var textbox = require('./textbox/textbox');
exports.textbox = textbox;
var typeahead = require('./typeahead/typeahead');
exports.typeahead = typeahead;
var userRating = require('./userRating/userRating');
exports.userRating = userRating;
var validationGroup = require('./validationGroup/validationGroup');
exports.validationGroup = validationGroup;
var componentsDefaultTheme_1 = require('./componentsDefaultTheme');
exports.defaultThemeValueName = componentsDefaultTheme_1.defaultThemeValueName;
exports.moduleName = 'rl.ui.components';
angular.module(exports.moduleName, [
    autosaveDialogFooter.moduleName,
    busy.moduleName,
    button.moduleName,
    buttonAsync.moduleName,
    buttonLink.moduleName,
    buttonToggle.moduleName,
    cardContainer.moduleName,
    checkbox.moduleName,
    commaList.moduleName,
    dateTime.moduleName,
    dateTimeStatic.moduleName,
    dialog.moduleName,
    genericContainer.moduleName,
    lazyLoad.moduleName,
    longClickButton.moduleName,
    messageLog.moduleName,
    multiStepIndicator.moduleName,
    radio.moduleName,
    ratingBar.moduleName,
    richTextEditor.moduleName,
    select.moduleName,
    signaturePad.moduleName,
    simpleCardList.moduleName,
    spinner.moduleName,
    stringWithWatermark.moduleName,
    tabs.moduleName,
    templateRenderer.moduleName,
    textarea.moduleName,
    textbox.moduleName,
    typeahead.moduleName,
    userRating.moduleName,
    validationGroup.moduleName,
])
    .value(componentsDefaultTheme_1.defaultThemeValueName, componentsDefaultTheme_1.defaultThemeValue);
//# sourceMappingURL=components.module.js.map