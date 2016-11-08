import { services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { ModeFilterGroup } from './modeFilterGroup.service';

interface IModeFilterOptionMock {
	value: boolean;
}

interface IModeFilterOptionMock2 {
	value?: number;
	displayAll?: boolean;
	active?: boolean
}

interface ITestObject {
	flag?: boolean;
}

describe('ModeFilterGroup', () => {
	let modeFilterGroup: ModeFilterGroup<any>;

	const buildFilter = settings => new ModeFilterGroup<any>(settings, __transform.transform);

	it('should build an option filter function that filters out items with a value not matching the mode', (): void => {
		let trueModeOption: IModeFilterOptionMock = {
			value: true,
		};
		let falseModeOption: IModeFilterOptionMock = {
			value: false,
		};

		modeFilterGroup = buildFilter({
			options: [trueModeOption, falseModeOption],
			getValue(item: ITestObject): boolean {
				return item.flag;
			},
		});

		let trueObj: ITestObject = { flag: true };
		let falseObj: ITestObject = { flag: false };
		let emptyObj: ITestObject = {};

		modeFilterGroup.activeOption = <any>trueModeOption;
		expect(modeFilterGroup.predicate(trueObj)).to.be.true;
		expect(modeFilterGroup.predicate(falseObj)).to.be.false;
		expect(modeFilterGroup.predicate(emptyObj)).to.be.false;

		modeFilterGroup.activeOption = <any>falseModeOption;
		expect(modeFilterGroup.predicate(falseObj)).to.be.true;
		expect(modeFilterGroup.predicate(trueObj)).to.be.false;
		expect(modeFilterGroup.predicate(emptyObj)).to.be.false;
	});

	it('should serialize to the value of the active option', (): void => {
		let inactiveOption: IModeFilterOptionMock2 = {
			value: 1,
		};
		let activeOption: IModeFilterOptionMock2 = {
			value: 2,
			active: true,
		};

		modeFilterGroup = buildFilter({
			options: [inactiveOption, activeOption],
		});
		let value;

		modeFilterGroup.serialize().subscribe(result => value = result);

		expect(value).to.equal(2);
	});

	it('should return null if the default option is selected', (): void => {
		let defaultOption: IModeFilterOptionMock2 = {
			displayAll: true,
			active: true,
		};

		modeFilterGroup = buildFilter({
			options: [defaultOption],
		});
		let value;

		modeFilterGroup.serialize().subscribe(result => value = result);

		expect(value).to.be.null;
	});
});
