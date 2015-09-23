// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/sinon/sinon.d.ts' />

/// <reference path="responsiveCard.ts" />

module rl.ui.components.responsiveCardGrid {
	export interface ICardGridMock {
		unregisterSpy: Sinon.SinonSpy;
		registerCard(behavior: responsiveCard.ICardBehavior, element: ng.IAugmentedJQuery): { (): void };
		registerCardSpy: Sinon.SinonSpy;
		openCard(card: any): void;
		openCardSpy: Sinon.SinonSpy;
		closeCard(): void;
		closeCardSpy: Sinon.SinonSpy;
		hoverIn(card: any): void;
		hoverInSpy: Sinon.SinonSpy;
		hoverOut(): void;
		hoverOutSpy: Sinon.SinonSpy;
		cardIsEndOfRow(card: any): boolean;
		cardIsEndOfRowSpy: Sinon.SinonSpy;
	}

	export class CardGridMock implements ICardGridMock {
		private behavior: responsiveCard.ICardBehavior;
		unregisterSpy: Sinon.SinonSpy = sinon.spy();
		registerCardSpy: Sinon.SinonSpy = sinon.spy();
		openCardSpy: Sinon.SinonSpy = sinon.spy();
		closeCardSpy: Sinon.SinonSpy = sinon.spy();
		hoverInSpy: Sinon.SinonSpy = sinon.spy();
		hoverOutSpy: Sinon.SinonSpy = sinon.spy();
		cardIsEndOfRowSpy: Sinon.SinonSpy = sinon.spy();

		registerCard(behavior: responsiveCard.ICardBehavior, element: ng.IAugmentedJQuery): { (): void } {
			this.registerCardSpy(behavior, element);
			this.behavior = behavior;
			return this.unregisterSpy;
		}

		openCard(card: any): void {
			this.openCardSpy(card);
			if (this.autosaveCode() && card === this.behavior) {
				this.behavior.open();
			}
		}

		closeCard(): void {
			this.closeCardSpy();
			this.autosaveCode();
		}

		private autosaveCode(): boolean {
			var canClose: boolean = this.behavior.autosave();

			if (canClose) {
				this.behavior.close();
				return true;
			};
			return false;
		}

		hoverIn(card: any): void {
			this.hoverInSpy(card);
			this.behavior.hoverIn();
		}

		hoverOut(): void {
			this.hoverOutSpy();
			this.behavior.hoverOut();
		}

		cardIsEndOfRow(card: any): boolean {
			this.cardIsEndOfRowSpy(card);
			return (card.index + 1) % 2 === 0;
		}
	}
}
