import * as angular from 'angular';

import * as busyNg1 from './busy/busy.ng1';
import * as buttonNg1 from './buttons/button/button.ng1';
import * as buttonAsyncNg1 from './buttons/buttonAsync/buttonAsync.ng1';
import * as buttonLinkNg1 from './buttons/buttonLink/buttonLink.ng1';
import * as buttonSubmitNg1 from './buttons/buttonSubmit/buttonSubmit.ng1';
import * as buttonToggleNg1 from './buttons/buttonToggle/buttonToggle.ng1';
import * as cardContainerNg1 from './cardContainer/cardContainer.module';
import * as checkboxNg1 from './inputs/checkbox/checkbox.ng1';
import * as commaListNg1 from './commaList/commaList.ng1';
import * as dateTimeNg1 from './inputs/dateTime/dateTime.ng1';
import * as dateTimeStaticNg1 from './dateTimeStatic/dateTimeStatic';
import * as dialogNg1 from './dialog/dialog.ng1';
import * as formNg1 from './form/form.ng1';
import * as genericContainerNg1 from './genericContainer/genericContainer';
import * as inputNg1 from './inputs/input.ng1';
import * as lazyLoadNg1 from './lazyLoad/lazyLoad';
import * as longClickButtonNg1 from './buttons/buttonLongClick/buttonLongClick.ng1';
import * as messageLogNg1 from './messageLog/messageLog.module';
import * as multiStepIndicatorNg1 from './multiStepIndicator/multiStepIndicator';
import * as radioNg1 from './inputs/radio/radio.module';
import * as ratingBarNg1 from './ratingBar/ratingBar';
import * as richTextEditorNg1 from './richTextEditor/richTextEditor';
import * as selectNg1 from './inputs/select/select.ng1';
import * as signaturePadNg1 from './signaturePad/signaturePad';
import * as simpleCardListNg1 from './simpleCardList/simpleCardList.module';
import * as spinnerNg1 from './inputs/spinner/spinner.ng1';
import * as stringWithWatermarkNg1 from './stringWithWatermark/stringWithWatermark.ng1';
import * as tabsNg1 from './tabs/tabs.module';
import * as templateRendererNg1 from './templateRenderer/templateRenderer.ng1';
import * as textareaNg1 from './inputs/textarea/textarea.ng1';
import * as textboxNg1 from './inputs/textbox/textbox.ng1';
import * as typeaheadNg1 from './inputs/typeahead/typeahead.ng1';
import * as typeaheadListNg1 from './inputs/typeaheadList/typeaheadList.ng1';
import * as userRatingNg1 from './inputs/userRating/userRating.ng1';
import * as validationGroupNg1 from './validationGroup/validationGroup.ng1';

import * as busy from './busy/busy';
import * as buttons from './buttons/index';
import * as cardContainer from './cardContainer/index';
import * as commaList from './commaList/commaList';
import * as dialog from './dialog/index';
import * as inputs from './inputs/index';
import * as form from './form/form';
import * as simpleCardList from './simpleCardList/index';
import * as stringWithWatermark from './stringWithWatermark/stringWithWatermark';
import * as validationGroup from './validationGroup/validationGroup';

import { defaultThemeValueName, DefaultTheme } from './componentsDefaultTheme';

export {
	defaultThemeValueName,
	DefaultTheme,

	busyNg1,
	buttonNg1,
	buttonAsyncNg1,
	buttonLinkNg1,
	buttonSubmitNg1,
	buttonToggleNg1,
	cardContainerNg1,
	checkboxNg1,
	commaListNg1,
	dateTimeNg1,
	dateTimeStaticNg1,
	dialogNg1,
	formNg1,
	genericContainerNg1,
	lazyLoadNg1,
	longClickButtonNg1,
	messageLogNg1,
	multiStepIndicatorNg1,
	radioNg1,
	ratingBarNg1,
	richTextEditorNg1,
	selectNg1,
	signaturePadNg1,
	simpleCardListNg1,
	spinnerNg1,
	stringWithWatermarkNg1,
	tabsNg1,
	templateRendererNg1,
	textareaNg1,
	textboxNg1,
	typeaheadNg1,
	typeaheadListNg1,
	userRatingNg1,
	validationGroupNg1,

	busy,
	buttons,
	cardContainer,
	commaList,
	dialog,
	inputs,
	form,
	simpleCardList,
	stringWithWatermark,
	validationGroup,
};

export let moduleName: string = 'rl.ui.components';

angular.module(moduleName, [
	busyNg1.moduleName,
	buttonNg1.moduleName,
	buttonAsyncNg1.moduleName,
	buttonLinkNg1.moduleName,
	buttonSubmitNg1.moduleName,
	buttonToggleNg1.moduleName,
	cardContainerNg1.moduleName,
	checkboxNg1.moduleName,
	commaListNg1.moduleName,
	dateTimeNg1.moduleName,
	dateTimeStaticNg1.moduleName,
	dialogNg1.moduleName,
	formNg1.moduleName,
	genericContainerNg1.moduleName,
	lazyLoadNg1.moduleName,
	longClickButtonNg1.moduleName,
	messageLogNg1.moduleName,
	multiStepIndicatorNg1.moduleName,
	radioNg1.moduleName,
	ratingBarNg1.moduleName,
	richTextEditorNg1.moduleName,
	selectNg1.moduleName,
	signaturePadNg1.moduleName,
	simpleCardListNg1.moduleName,
	spinnerNg1.moduleName,
	stringWithWatermarkNg1.moduleName,
	tabsNg1.moduleName,
	templateRendererNg1.moduleName,
	textareaNg1.moduleName,
	textboxNg1.moduleName,
	typeaheadNg1.moduleName,
	typeaheadListNg1.moduleName,
	userRatingNg1.moduleName,
	validationGroupNg1.moduleName,
]);
