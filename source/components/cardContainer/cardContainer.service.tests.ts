/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../typings/lodash/lodash.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	ICardContainerService,
	CardContainerService,
} from './cardContainer.service';

import * as angular from 'angular';
import 'angular-mocks';

interface IDataSourceMock {
	refresh: Sinon.SinonSpy;
}

interface IDataPagerMock {
	pageSize: number;
}

interface ICardContainerMock {
	dataSource: IDataSourceMock;
	pager: IDataPagerMock;
	searchFilter: any;
	numberSelected: number;
}

describe('CardContainerService', () => {
	let containerService: ICardContainerService;
	let cardContainer: ICardContainerMock;

	beforeEach((): void => {
		cardContainer = {
			dataSource: { refresh: sinon.spy() },
			pager: { pageSize: 5 },
			searchFilter: {},
			numberSelected: 0,
		};

		containerService = new CardContainerService(<any>cardContainer);
	});

	it('should put the dataSource, pager, and search filter on the service', (): void => {
		expect(containerService.dataSource).to.equal(cardContainer.dataSource);
		expect(containerService.pager).to.equal(cardContainer.pager);
		expect(containerService.searchFilter).to.equal(cardContainer.searchFilter);
	});

	it('should specify a getter to get the numberSelected off the card container', (): void => {
		cardContainer.numberSelected = 5;

		expect(containerService.numberSelected).to.equal(cardContainer.numberSelected);

		cardContainer.numberSelected = 10;

		expect(containerService.numberSelected).to.equal(cardContainer.numberSelected);
	});
});
