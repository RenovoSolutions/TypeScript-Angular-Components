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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNvdXJjZUV2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFTb3VyY2VFdmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakIsaUJBQVMsR0FBVyxXQUFXLENBQUM7QUFDaEMsZUFBTyxHQUFXLFNBQVMsQ0FBQztBQUM1QixhQUFLLEdBQVcsT0FBTyxDQUFDO0FBQ3hCLGVBQU8sR0FBVyxTQUFTLENBQUM7QUFDNUIsZ0JBQVEsR0FBVyxVQUFVLENBQUM7QUFFOUIsV0FBRyxHQUFhLENBQUMsaUJBQVMsRUFBRSxlQUFPLEVBQUUsYUFBSyxFQUFFLGVBQU8sRUFBRSxnQkFBUSxDQUFDLENBQUM7QUFRL0QsYUFBSyxHQUFpQjtJQUNoQyxRQUFRLEVBQUUsVUFBVTtJQUVwQixHQUFHLEVBQUUsRUFBRTtDQUNQLENBQUM7QUFFRixhQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBRyxDQUFDLENBQUM7QUFDekIsYUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDIn0=