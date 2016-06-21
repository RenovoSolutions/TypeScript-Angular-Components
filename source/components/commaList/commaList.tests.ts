import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform;

import { CommaListComponent } from './commaList';

interface ITestObject {
	prop: string;
}

describe('CommaListComponent', () => {
	let commaList: CommaListComponent<any>;

	beforeEach(() => {
		commaList = new CommaListComponent<any>(__object.objectUtility, __transform.transform);
	});

	it('shoult limit to 3 items on the scope', (): void => {
		commaList.list = ['item1', 'item2', 'item3', 'item4', 'item5'];
		commaList.max = 3;

		const list: string[] = commaList.getFirstItems();

		expect(commaList.remainingItems).to.equal(2);
		expect(list).to.have.length(3);
		expect(list[0]).to.equal('item1');
		expect(list[1]).to.equal('item2');
		expect(list[2]).to.equal('item3');
	});

	it('should show all items if no max is provided', (): void => {
		commaList.ngOnInit();
		commaList.list = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10'];
		expect(commaList.getFirstItems()).to.have.length(10);
	});

	it('should show none if 0 is specified as the max', (): void => {
		commaList.list = ['item1', 'item2', 'item3', 'item4', 'item5'];
		commaList.max = 0;

		const list: string[] = commaList.getFirstItems();

		expect(list).to.have.length(0);
		expect(commaList.remainingItems).to.equal(5);
	});

	it('should transform the list items if a transform function is provided', (): void => {
		let transform: { (item: ITestObject): string } = (item: ITestObject): string => {
			return item.prop;
		};
		let baseList: ITestObject[] = [
			{ prop: 'item1' },
			{ prop: 'item2' },
			{ prop: 'item3' },
		];

		commaList.list = baseList;
		commaList.max = 3;
		commaList.transform = transform;

		const filteredList: string[] = commaList.getFirstItems();

		expect(filteredList[0]).to.equal('item1');
		expect(filteredList[1]).to.equal('item2');
		expect(filteredList[2]).to.equal('item3');
	});
});
