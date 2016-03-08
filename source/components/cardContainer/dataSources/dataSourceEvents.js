'use strict';
var _ = require('lodash');
exports.redrawing = 'redrawing';
exports.changed = 'changed';
exports.added = 'added';
exports.removed = 'removed';
exports.replaced = 'replaced';
exports.all = [exports.redrawing, exports.changed, exports.added, exports.removed, exports.replaced];
exports.async = {
    reloaded: 'reloaded',
    all: [],
};
exports.async.all = _.clone(exports.all);
exports.async.all.push(exports.async.reloaded);
//# sourceMappingURL=dataSourceEvents.js.map