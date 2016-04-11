# Button Toggle
A basic toggle button. Functions similar to a checkbox. Button shows as depressed with a check on the left if 'checked'.

### Usage
```
<rl-button-toggle ng-model="" on-toggle="" size="" type="" ng-disabled=""> ... </rl-button-toggle>
```
### Options

`ng-model`, `on-toggle`

See [checkbox](../checkbox/checkbox.md) for details on the check behavior options.

`size`, `type`, and `ng-disabled`.

See [buttons](./buttons.md) for detail on the button options.

### Full Example
A toggle button with an **ng-model**, **on-toggle**, **size**, **type**, and **disabling**.
```
<rl-button-toggle ng-model="button.checked" on-toggle="button.click()" size="lg" type="danger" ng-disabled="true"> ... </rl-button-toggle>
```
Output (When button.checked is true):
```
<button type="button" class="btn btn-lg btn-danger active" ng-click="button.click()" disabled>
	<i class="fa fa-check completed"></i>
	...
</button>
```
Output (When button.checked is false):
```
<button type="button" class="btn btn-lg btn-danger" ng-click="button.click()" disabled>
	...
</button>
```