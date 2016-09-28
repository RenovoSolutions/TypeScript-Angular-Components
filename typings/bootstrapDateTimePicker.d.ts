import * as moment from 'moment'

declare namespace bootstrapDateTimePicker {
	export interface IConfiguration {
		stepping?: number;
		format?: string | boolean;
		direction?: string;
		elementHeight?: number;
		pickDate?: boolean;
		pickTime?: boolean;
		minDate?: string | Date | moment.Moment;
		maxDate?: string | Date | moment.Moment;
	}

	export interface IDateTimePicker extends JQuery {
		(config: IConfiguration): JQuery;
		defaults: IConfiguration;
	}
}


export = bootstrapDateTimePicker;
export as namespace bootstrapDateTimePicker;


