"use strict";
var angular = require('angular');
var busy = require('./busy/busy');
exports.busy = busy;
var button = require('./button/button');
exports.button = button;
var buttonAsync = require('./buttonAsync/buttonAsync');
exports.buttonAsync = buttonAsync;
var buttonLink = require('./buttonLink/buttonLink');
exports.buttonLink = buttonLink;
var buttonSubmit = require('./buttonSubmit/buttonSubmit');
exports.buttonSubmit = buttonSubmit;
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
var form = require('./form/form');
exports.form = form;
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
var typeaheadList = require('./typeaheadList/typeaheadList');
exports.typeaheadList = typeaheadList;
var userRating = require('./userRating/userRating');
exports.userRating = userRating;
var validationGroup = require('./validationGroup/validationGroup');
exports.validationGroup = validationGroup;
var componentsDefaultTheme_1 = require('./componentsDefaultTheme');
exports.defaultThemeValueName = componentsDefaultTheme_1.defaultThemeValueName;
exports.moduleName = 'rl.ui.components';
angular.module(exports.moduleName, [
    busy.moduleName,
    button.moduleName,
    buttonAsync.moduleName,
    buttonLink.moduleName,
    buttonSubmit.moduleName,
    buttonToggle.moduleName,
    cardContainer.moduleName,
    checkbox.moduleName,
    commaList.moduleName,
    dateTime.moduleName,
    dateTimeStatic.moduleName,
    dialog.moduleName,
    form.moduleName,
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
    typeaheadList.moduleName,
    userRating.moduleName,
    validationGroup.moduleName,
])
    .value(componentsDefaultTheme_1.defaultThemeValueName, componentsDefaultTheme_1.defaultThemeValue);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsSUFBWSxJQUFJLFdBQU0sYUFBYSxDQUFDLENBQUE7QUF5Q25DLFlBQUk7QUF4Q0wsSUFBWSxNQUFNLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQXlDekMsY0FBTTtBQXhDUCxJQUFZLFdBQVcsV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBeUN4RCxtQkFBVztBQXhDWixJQUFZLFVBQVUsV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBeUNyRCxrQkFBVTtBQXhDWCxJQUFZLFlBQVksV0FBTSw2QkFBNkIsQ0FBQyxDQUFBO0FBeUMzRCxvQkFBWTtBQXhDYixJQUFZLFlBQVksV0FBTSw2QkFBNkIsQ0FBQyxDQUFBO0FBeUMzRCxvQkFBWTtBQXhDYixJQUFZLGFBQWEsV0FBTSxzQ0FBc0MsQ0FBQyxDQUFBO0FBeUNyRSxxQkFBYTtBQXhDZCxJQUFZLFFBQVEsV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBeUMvQyxnQkFBUTtBQXhDVCxJQUFZLFNBQVMsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBeUNsRCxpQkFBUztBQXhDVixJQUFZLFFBQVEsV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBeUMvQyxnQkFBUTtBQXhDVCxJQUFZLGNBQWMsV0FBTSxpQ0FBaUMsQ0FBQyxDQUFBO0FBeUNqRSxzQkFBYztBQXhDZixJQUFZLE1BQU0sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBeUN6QyxjQUFNO0FBeENQLElBQVksSUFBSSxXQUFNLGFBQWEsQ0FBQyxDQUFBO0FBeUNuQyxZQUFJO0FBeENMLElBQVksZ0JBQWdCLFdBQU0scUNBQXFDLENBQUMsQ0FBQTtBQXlDdkUsd0JBQWdCO0FBdkNqQixJQUFZLFFBQVEsV0FBTSxxQkFBcUIsQ0FBQyxDQUFB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