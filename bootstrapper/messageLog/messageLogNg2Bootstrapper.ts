import { Component } from '@angular/core';

@Component({
	selector: 'tsMessageLogBootstrapper',
	template: require('./messageLogNg2Bootstrapper.html'),
})
export class MessageLogNg2BootstrapperComponent {
	messages: any[];
	pageSize = 8;
	hasNextPage = true;
	loading: boolean = false;

	ngOnInit(): void {
		this.messages = [
			{
				id: 1,
				isSystemMessage: false,
				message: 'Cool',
				createdBy: { name: 'Jim Davis' },
				createdDate: '2017-01-01T12:00:00',
			},
			{
				id: 2,
				isSystemMessage: true,
				message: 'Event',
				createdBy: { name: 'System' },
				createdDate: '2017-01-01T01:00:00',
			},
		];
	}

	log = x => console.log(x);
}
