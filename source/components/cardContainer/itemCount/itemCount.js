'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.itemCount';
exports.componentName = 'rlItemCount';
var itemCount = {
    require: { cardContainer: '?^^rlCardContainer' },
    template: require('./itemCount.html'),
    controllerAs: 'itemCount',
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, itemCount);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUNvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUNvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRXhCLGtCQUFVLEdBQVcsMENBQTBDLENBQUM7QUFDaEUscUJBQWEsR0FBVyxhQUFhLENBQUM7QUFFakQsSUFBSSxTQUFTLEdBQThCO0lBQzFDLE9BQU8sRUFBRSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFBRTtJQUNoRCxRQUFRLEVBQUUsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0lBQ3JDLFlBQVksRUFBRSxXQUFXO0NBQ3pCLENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDIn0=