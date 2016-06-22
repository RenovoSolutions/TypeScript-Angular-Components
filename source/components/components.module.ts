import * as angular from 'angular';

import * as busy from './busy/busy.ng1';
import * as button from './buttons/button/button.ng1';
import * as buttonAsync from './buttons/buttonAsync/buttonAsync.ng1';
import * as buttonLink from './buttons/buttonLink/buttonLink.ng1';
import * as buttonSubmit from './buttons/buttonSubmit/buttonSubmit.ng1';
import * as buttonToggle from './buttons/buttonToggle/buttonToggle.ng1';
import * as cardContainer from './cardContainer/cardContainer.module';
import * as checkbox from './inputs/checkbox/checkbox.ng1';
import * as commaList from './commaList/commaList.ng1';
import * as dateTime from './inputs/dateTime/dateTime.ng1';
import * as dateTimeStatic from './dateTimeStatic/dateTimeStatic';
import * as dialog from './dialog/dialog.ng1';
import * as form from './form/form.ng1';
import * as genericContainer from './genericContainer/genericContainer';
import * as input from './inputs/input.ng1';
import * as lazyLoad from './lazyLoad/lazyLoad';
import * as longClickButton from './buttons/buttonLongClick/buttonLongClick.ng1';
import * as messageLog from './messageLog/messageLog.module';
import * as multiStepIndicator from './multiStepIndicator/multiStepIndicator';
import * as radio from './inputs/radio/radio.module';
import * as ratingBar from './ratingBar/ratingBar';
import * as richTextEditor from './richTextEditor/richTextEditor';
import * as select from './inputs/select/select.ng1';
import * as signaturePad from './signaturePad/signaturePad';
import * as simpleCardList from './simpleCardList/simpleCardList.module';
import * as spinner from './inputs/spinner/spinner.ng1';
import * as stringWithWatermark from './stringWithWatermark/stringWithWatermark.ng1';
import * as tabs from './tabs/tabs.module';
import * as templateRenderer from './templateRenderer/templateRenderer.ng1';
import * as textarea from './inputs/textarea/textarea.ng1';
import * as textbox from './inputs/textbox/textbox.ng1';
import * as typeahead from './typeahead/typeahead';
import * as typeaheadList from './typeaheadList/typeaheadList';
import * as userRating from './inputs/userRating/userRating.ng1';
import * as validationGroup from './validationGroup/validationGroup';

import { defaultThemeValueName } from './componentsDefaultTheme';

export {
	defaultThemeValueName,

	busy,
	button,
	buttonAsync,
	buttonLink,
	buttonSubmit,
	buttonToggle,
	cardContainer,
	checkbox,
	commaList,
	dateTime,
	dateTimeStatic,
	dialog,
	form,
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
	templateRenderer,
	textarea,
	textbox,
	typeahead,
	typeaheadList,
	userRating,
	validationGroup,
};

export let moduleName: string = 'rl.ui.components';

angular.module(moduleName, [
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
]);
