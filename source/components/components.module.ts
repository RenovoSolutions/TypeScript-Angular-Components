'use strict';

import * as angular from 'angular';

import * as autosaveDialogFooter from './autosaveDialogFooter/autosaveDialogFooter';
import * as busy from './busy/busy';
import * as button from './button/button';
import * as buttonAsync from './buttonAsync/buttonAsync';
import * as buttonLink from './buttonLink/buttonLink';
import * as buttonToggle from './buttonToggle/buttonToggle';
import * as cardContainer from './cardContainer/cardContainer.module';
import * as checkbox from './checkbox/checkbox';
import * as commaList from './commaList/commaList';
import * as dateTime from './dateTime/dateTime';
import * as genericContainer from './genericContainer/genericContainer';
import * as lazyLoad from './lazyLoad/lazyLoad';
import * as longClickButton from './longClickButton/longClickButton';
import * as messageLog from './messageLog/messageLog.module';
import * as multiStepIndicator from './multiStepIndicator/multiStepIndicator';
import * as radio from './radio/radio.module';
import * as ratingBar from './ratingBar/ratingBar';
import * as responsiveCardGrid from './responsiveCardGrid/responsiveCardGrid.module';
import * as richTextEditor from './richTextEditor/richTextEditor';
import * as signaturePad from './signaturePad/signaturePad';
import * as simpleCardList from './simpleCardList/simpleCardList.module';
import * as spinner from './spinner/spinner';
import * as stringWithWatermark from './stringWithWatermark/stringWithWatermark';
import * as textarea from './textarea/textarea';
import * as textbox from './textbox/textbox';
import * as typeahead from './typeahead/typeahead';
import * as userRating from './userRating/userRating';

export {
	autosaveDialogFooter,
	busy,
	button,
	buttonAsync,
	buttonLink,
	buttonToggle,
	cardContainer,
	checkbox,
	commaList,
	dateTime,
	genericContainer,
	lazyLoad,
	longClickButton,
	messageLog,
	multiStepIndicator,
	radio,
	ratingBar,
	responsiveCardGrid,
	richTextEditor,
	signaturePad,
	simpleCardList,
	spinner,
	stringWithWatermark,
	textarea,
	textbox,
	typeahead,
	userRating,
};

export var moduleName: string = 'rl.ui.components';

angular.module(moduleName, [
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
	textarea.moduleName,
	textbox.moduleName,
	typeahead.moduleName,
	userRating.moduleName,
]);
