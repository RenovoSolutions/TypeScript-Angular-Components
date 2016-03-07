'use strict';

import * as _ from 'lodash';

export let redrawing: string = 'redrawing';
export let changed: string = 'changed';
export let added: string = 'added';
export let removed: string = 'removed';
export let replaced: string = 'replaced';

export let all: string[] = [redrawing, changed, added, removed, replaced];

export interface IAsyncEvents {
	reloaded: string;

	all: string[];
}

export let async: IAsyncEvents = {
	reloaded: 'reloaded',

	all: [],
};

async.all = _.clone(all);
async.all.push(async.reloaded);
