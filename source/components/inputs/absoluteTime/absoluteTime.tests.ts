import { services } from 'typescript-angular-utilities';
import __time = services.time;
import __object = services.object;
import __guid = services.guid;

import { AbsoluteTimeComponent } from './absoluteTime';

describe('AbsoluteTimeComponent', () => {
	let time: AbsoluteTimeComponent;
	let setValue: Sinon.SinonSpy;

	beforeEach(() => {
		const validator: any = {
			validate: sinon.spy(),
			setValidators: sinon.spy(),
		};
		setValue = sinon.spy();

		time = new AbsoluteTimeComponent(null, validator, __object.objectUtility, null, __guid.guid, <any>__time.timeUtility);
		time.setValue = setValue;
	});

	it('should toggle the period and set the model value', (): void => {
		time.period = __time.timePeriods.AM;

		time.togglePeriod();

		expect(time.period).to.equal(__time.timePeriods.PM);
		sinon.assert.calledOnce(setValue);
	});

	describe('show times', (): void => {
		beforeEach((): void => {
			time.time = <any>{
				hour: 3,
				minute: 30,
			};

			expect(time.hourSelected).to.be.true;
			expect(time.minuteSelected).to.be.true;
		});

		it('should toggle the times and reset selection on close', (): void => {
			expect(time.showTimes).to.be.false;

			time.toggleTimes();

			expect(time.showTimes).to.be.true;

			time.hourSelected = false;
			time.minuteSelected = false;

			time.toggleTimes();

			expect(time.showTimes).to.be.false;

			expect(time.hourSelected).to.be.true;
			expect(time.minuteSelected).to.be.true;
		});

		it('should close the times and reset selection', (): void => {
			time.showTimes = true;
			time.hourSelected = false;
			time.minuteSelected = false;

			time.closeTimes();

			expect(time.showTimes).to.be.false;

			expect(time.hourSelected).to.be.true;
			expect(time.minuteSelected).to.be.true;
		});
	});

	describe('times list', (): void => {
		it('should generate a list of hours from 1 to 12', (): void => {
			time.ngOnInit();
			expect(time.allHours[0]).to.equal(1);
			expect(time.allHours[1]).to.equal(2);
			expect(time.allHours[2]).to.equal(3);
			expect(time.allHours[3]).to.equal(4);
			expect(time.allHours[4]).to.equal(5);
			expect(time.allHours[5]).to.equal(6);
			expect(time.allHours[6]).to.equal(7);
			expect(time.allHours[7]).to.equal(8);
			expect(time.allHours[8]).to.equal(9);
			expect(time.allHours[9]).to.equal(10);
			expect(time.allHours[10]).to.equal(11);
			expect(time.allHours[11]).to.equal(12);
		});

		it('should generate a list of possible minute selections at 15 minute intervals', (): void => {
			time.ngOnInit();
			expect(time.allMinutes[0]).to.equal(15);
			expect(time.allMinutes[1]).to.equal(30);
			expect(time.allMinutes[2]).to.equal(45);
			expect(time.allMinutes[3]).to.equal(60);
		});

		it('should generate a list of possible minute selections at the specified interval', (): void => {
			time.minuteInterval = 5;
			time.ngOnInit();
			expect(time.allMinutes[0]).to.equal(5);
			expect(time.allMinutes[1]).to.equal(10);
			expect(time.allMinutes[2]).to.equal(15);
			expect(time.allMinutes[3]).to.equal(20);
			expect(time.allMinutes[4]).to.equal(25);
			expect(time.allMinutes[5]).to.equal(30);
			expect(time.allMinutes[6]).to.equal(35);
			expect(time.allMinutes[7]).to.equal(40);
			expect(time.allMinutes[8]).to.equal(45);
			expect(time.allMinutes[9]).to.equal(50);
			expect(time.allMinutes[10]).to.equal(55);
			expect(time.allMinutes[11]).to.equal(60);
		});
	});
});
