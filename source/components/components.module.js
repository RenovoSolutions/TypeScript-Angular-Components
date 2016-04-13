'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyxJQUFZLElBQUksV0FBTSxhQUFhLENBQUMsQ0FBQTtBQXlDbkMsWUFBSTtBQXhDTCxJQUFZLE1BQU0sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBeUN6QyxjQUFNO0FBeENQLElBQVksV0FBVyxXQUFNLDJCQUEyQixDQUFDLENBQUE7QUF5Q3hELG1CQUFXO0FBeENaLElBQVksVUFBVSxXQUFNLHlCQUF5QixDQUFDLENBQUE7QUF5Q3JELGtCQUFVO0FBeENYLElBQVksWUFBWSxXQUFNLDZCQUE2QixDQUFDLENBQUE7QUF5QzNELG9CQUFZO0FBeENiLElBQVksWUFBWSxXQUFNLDZCQUE2QixDQUFDLENBQUE7QUF5QzNELG9CQUFZO0FBeENiLElBQVksYUFBYSxXQUFNLHNDQUFzQyxDQUFDLENBQUE7QUF5Q3JFLHFCQUFhO0FBeENkLElBQVksUUFBUSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUF5Qy9DLGdCQUFRO0FBeENULElBQVksU0FBUyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUF5Q2xELGlCQUFTO0FBeENWLElBQVksUUFBUSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUF5Qy9DLGdCQUFRO0FBeENULElBQVksY0FBYyxXQUFNLGlDQUFpQyxDQUFDLENBQUE7QUF5Q2pFLHNCQUFjO0FBeENmLElBQVksTUFBTSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUF5Q3pDLGNBQU07QUF4Q1AsSUFBWSxJQUFJLFdBQU0sYUFBYSxDQUFDLENBQUE7QUF5Q25DLFlBQUk7QUF4Q0wsSUFBWSxnQkFBZ0IsV0FBTSxxQ0FBcUMsQ0FBQyxDQUFBO0FBeUN2RSx3QkFBZ0I7QUF2Q2pCLElBQVksUUFBUSxXQUFNLHFC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