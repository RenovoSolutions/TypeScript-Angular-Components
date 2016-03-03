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
import * as dialog from './dialog/dialog';
import * as genericContainer from './genericContainer/genericContainer';
import * as lazyLoad from './lazyLoad/lazyLoad';
import * as longClickButton from './longClickButton/longClickButton';
import * as messageLog from './messageLog/messageLog.module';
import * as multiStepIndicator from './multiStepIndicator/multiStepIndicator';
import * as radio from './radio/radio.module';
import * as ratingBar from './ratingBar/ratingBar';
import * as richTextEditor from './richTextEditor/richTextEditor';
import * as select from './select/select';
import * as signaturePad from './signaturePad/signaturePad';
import * as simpleCardList from './simpleCardList/simpleCardList.module';
import * as spinner from './spinner/spinner';
import * as stringWithWatermark from './stringWithWatermark/stringWithWatermark';
import * as tabs from './tabs/tabs.module';
import * as textarea from './textarea/textarea';
import * as textbox from './textbox/textbox';
import * as typeahead from './typeahead/typeahead';
import * as typeahead2 from './typeahead2/typeahead2';
import * as userRating from './userRating/userRating';
import * as validationGroup from './validationGroup/validationGroup';

import { defaultThemeValue, defaultThemeValueName } from './componentsDefaultTheme';

export {
	defaultThemeValueName,

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
	dialog,
	genericContainer,
	lazyLoad,
	longClickButton,
	messageLog,
	multiStepIndicator,
	radio,
	ratingBar,
	richTextEditor,
	select,
	signaturePad,
	simpleCardList,
	spinner,
	stringWithWatermark,
	tabs,
	textarea,
	textbox,
	typeahead,
	typeahead2,
	userRating,
	validationGroup,
};

export let moduleName: string = 'rl.ui.components';

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
	textarea.moduleName,
	textbox.moduleName,
	typeahead.moduleName,
	typeahead2.moduleName,
	userRating.moduleName,
	validationGroup.moduleName,
])
	.value(defaultThemeValueName, defaultThemeValue);
