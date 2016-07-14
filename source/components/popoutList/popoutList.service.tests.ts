import { Observable } from 'rxjs';

import { PopoutListService } from './popoutList.service';

describe('PopoutListService', () => {
	let listService: PopoutListService<string>;

	beforeEach(() => {
		listService = new PopoutListService<string>();
	});

	describe('showOptions', (): void => {
		it('should close the options', (): void => {
			listService._showOptions = true;
			listService.close();
			expect(listService.showOptions).to.be.false;
		});

		it('should open the options', (): void => {
			listService.open();
			expect(listService.showOptions).to.be.true;
		});
	});
});
