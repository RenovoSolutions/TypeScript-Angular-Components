// /// <reference path="./moment/moment-node.d.ts"/>
// /// <reference path="./jquery/jquery.d.ts"/>

declare module bootstrapDateTimePicker {
	interface IConfiguration {
		stepping?: number;
		format?: string | boolean;
		direction?: string;
		elementHeight?: number;
		pickDate?: boolean;
		pickTime?: boolean;
		minDate?: string | Date | moment.Moment;
		maxDate?: string | Date | moment.Moment;
	}

	interface IDateTimePicker {
		(config: IConfiguration): JQuery;
		defaults: IConfiguration;
	}
}

interface JQuery {
	datetimepicker: bootstrapDateTimePicker.IDateTimePicker;
}