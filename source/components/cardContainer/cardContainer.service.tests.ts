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
	filters?: { [index: string]: IFilterMock };
}

interface IDataPagerMock {
	pageSize: number;
}

interface IFilterMock {
	type: string;
	filter: Sinon.SinonSpy;
}

interface ICardContainerMock {
	dataSource: IDataSourceMock;
	pager: IDataPagerMock;
	filters: { [index: string]: IFilterMock };
	numberSelected: number;
}

describe('CardContainerService', () => {
	let containerService: ICardContainerService;
	let cardContainer: ICardContainerMock;

	beforeEach((): void => {
		cardContainer = {
			dataSource: { refresh: sinon.spy() },
			pager: { pageSize: 5 },
			filters: {},
			numberSelected: 0,
		};

		containerService = new CardContainerService(<any>cardContainer);
	});

	it('should put the dataSource and pager on the service', (): void => {
		expect(containerService.dataSource).to.equal(cardContainer.dataSource);
		expect(containerService.pager).to.equal(cardContainer.pager);
	});

	it('should specify a getter to get the numberSelected off the card container', (): void => {
		cardContainer.numberSelected = 5;

		expect(containerService.numberSelected).to.equal(cardContainer.numberSelected);

		cardContainer.numberSelected = 10;

		expect(containerService.numberSelected).to.equal(cardContainer.numberSelected);
	});

	describe('filters', (): void => {
		it('should init data source filters from card container filters', (): void => {
			let filters: { [index: string]: IFilterMock } = <any>{};
			filters['type1'] = {
				type: 'type1',
				filter: sinon.spy(),
			};
			filters['type2'] = {
				type: 'type2',
				filter: sinon.spy(),
			};

			cardContainer.filters = filters;
			containerService = new CardContainerService(<any>cardContainer);

			expect(containerService.lookupFilter('type1')).to.equal(filters['type1']);
			expect(containerService.lookupFilter('type2')).to.equal(filters['type2']);
		});

		it('should init filters from data source filters if no filters are specified', (): void => {
			let filters: { [index: string]: IFilterMock } = {};
			filters['type'] = {
				type: 'type',
				filter: sinon.spy(),
			};

			let dataSource: IDataSourceMock = { refresh: sinon.spy() };
			dataSource.filters = filters;

			cardContainer.dataSource = <any>dataSource;
			cardContainer.filters = filters;
			containerService = new CardContainerService(<any>cardContainer);

			expect(containerService.lookupFilter('type')).to.equal(filters['type']);
			expect(containerService.dataSource.filters).to.equal(filters);
		});

		it('should return undefined if the specified filter does not exist', (): void => {
			let filters: { [index: string]: IFilterMock } = {};
			filters['myFilter'] = {
				type: 'myFilter',
				filter: sinon.spy(),
			};

			cardContainer.filters = filters;
			containerService = new CardContainerService(<any>cardContainer);

			expect(containerService.lookupFilter('myFilter')).to.equal(filters['myFilter']);
			expect(containerService.lookupFilter('nonExistantFilter')).to.be.undefined;
		});
	});
});
