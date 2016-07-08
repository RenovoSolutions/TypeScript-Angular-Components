###Component
Busy - Done  
Button - Done  
ButtonAsync - Done  
ButtonLink - Done  
ButtonSubmit - Done  
ButtonToggle - Done  
Checkbox - Done  
Comma list - Done  
DateTime - Done  
Dialog  
PromptDialog  
Form - In progress (autosave needs resolved)  
GenericContainer - Obsolete  
LazyLoad  
LongClickButton - Done  
MessageLog  
MultiStepIndicator - In Progress (Jamie)  
Radio - Done  
RadioGroup - Done   
RatingBar  
RichTextEditor  
Select - Done  
SignaturePad  
SimpleCard - Done  
SimpleCardList - Done  
Spinner - Done  
StringWithWatermark - Done  
Tab - In Progress (Andy)  
Tabset - In Progress (Andy)  
TemplateRenderer - Done  
Textarea - Done  
Textbox - Done  
Typeahead    
TypeheadList  
UserRating - Done  
ValidationGroup - Done  

###Directives  
Alias - Obsolete?  
AlternatingClass - Not possible, to my knowledge - one-off implementation in simple-card list for now  
Autosave - (relates to form)  
OffClick - Done  
Popover - Obsolete - we'll just use ng2-bootstrap tooltip for now  
Required - Obsolete - handled in the base input classes now  

###Pipes  
Date - Done  
LocalizeStringDates - Done


###Services  
Autosave - Obsolete? - Most of this behavior will move to the form and autosave directives  
AutosaveAction - (relates to autosave)  
Breakpoints  
ComponentValidator - Done  
ContentProvider  
Dialog - Obsolete? - Dialogs will probably be handled through the component now  
DocumentWrapper - Done  
Form - Done  
Jquery - Hopefully not really needed  
ParentChild - Obsolete - this is very angular 1 specific. May be needed during the upgrade, but we'll just upgrade it if needed  
Promise  
TemplateLoader - Obsolete - this is used for the generic container  
WindowWrapper - Done  
