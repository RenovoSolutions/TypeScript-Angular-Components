import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform;

import { ModeFilterGroupOld } from './modeFilterGroupOld.service';

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

describe('ModeFilterGroupOld', () => {
	let modeFilterGroup: ModeFilterGroupOld;

	const buildFilter = settings => new ModeFilterGroupOld(settings, __object.objectUtility, __transform.transform);

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
		expect(modeFilterGroup.filter(trueObj)).to.be.true;
		expect(modeFilterGroup.filter(falseObj)).to.be.false;
		expect(modeFilterGroup.filter(emptyObj)).to.be.false;

		modeFilterGroup.activeOption = <any>falseModeOption;
		expect(modeFilterGroup.filter(falseObj)).to.be.true;
		expect(modeFilterGroup.filter(trueObj)).to.be.false;
		expect(modeFilterGroup.filter(emptyObj)).to.be.false;
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

		expect(modeFilterGroup.serialize()).to.equal(2);
	});

	it('should return null if the default option is selected', (): void => {
		let defaultOption: IModeFilterOptionMock2 = {
			displayAll: true,
			active: true,
		};

		modeFilterGroup = buildFilter({
			options: [defaultOption],
		});

		expect(modeFilterGroup.serialize()).to.be.null;
	});
});
