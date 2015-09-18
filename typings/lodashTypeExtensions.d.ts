/// <reference path='lodash/lodash.d.ts' />

declare module _ {
	interface LoDashArrayWrapper<T> extends LoDashWrapperBase<T[], LoDashArrayWrapper<T>> {
		drop<T>(num: number): LoDashArrayWrapper<T>;
	}
}