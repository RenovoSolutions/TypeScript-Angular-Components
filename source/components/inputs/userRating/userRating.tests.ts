import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __guid = services.guid;

import { UserRatingComponent } from './userRating';

describe('UserRatingComponent', () => {
	let userRating: UserRatingComponent;
	let setValue: Sinon.SinonSpy;

	beforeEach(() => {
		userRating = new UserRatingComponent(<any>{}, null, __object.objectUtility, __guid.guid);

		setValue = sinon.spy();
		userRating.setValue = setValue;
	});

	it('should create a list of stars with values 5 to 1', (): void => {
		userRating.ngOnInit();

		expect(userRating.stars.length).to.equal(5);
		expect(userRating.stars[0].value).to.equal(5);
		expect(userRating.stars[1].value).to.equal(4);
		expect(userRating.stars[2].value).to.equal(3);
		expect(userRating.stars[3].value).to.equal(2);
		expect(userRating.stars[4].value).to.equal(1);
	});

	it('should set all stars less than or equal to the rating to filled', (): void => {
		userRating.ngOnInit();

		userRating.setRating(3);

		sinon.assert.calledOnce(setValue);
		sinon.assert.calledWith(setValue, 3);

		expect(userRating.stars[0].filled).to.be.false;
		expect(userRating.stars[1].filled).to.be.false;
		expect(userRating.stars[2].filled).to.be.true;
		expect(userRating.stars[3].filled).to.be.true;
		expect(userRating.stars[4].filled).to.be.true;
	});

	it('should set the initial view state based on the initial view value', (): void => {
		userRating.value = 2;
		userRating.ngOnInit();

		expect(userRating.stars[0].filled).to.be.false;
		expect(userRating.stars[1].filled).to.be.false;
		expect(userRating.stars[2].filled).to.be.false;
		expect(userRating.stars[3].filled).to.be.true;
		expect(userRating.stars[4].filled).to.be.true;
	});
});
