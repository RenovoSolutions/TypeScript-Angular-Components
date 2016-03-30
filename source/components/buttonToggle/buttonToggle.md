# Button Toggle
A basic toggle button. Functions similar to a checkbox. Button shows as depressed with a check on the left if 'checked'.

### Usage
```
<rl-button-toggle ng-model="" on-toggle="" size="" type="" ng-disabled=""> ... </rl-button-toggle>
```
### Options

#### [`ng-model`](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjv_PHnouTLAhWFXh4KHScJBmsQFggcMAA&url=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fdirective%2FngModel&usg=AFQjCNFGX5gYo-4684URATQ4lnqF1DVXPg&bvm=bv.117868183,d.dmo)

Two-way binds the specified value to the button 'checked' property. See [ng-model](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjv_PHnouTLAhWFXh4KHScJBmsQFggcMAA&url=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fdirective%2FngModel&usg=AFQjCNFGX5gYo-4684URATQ4lnqF1DVXPg&bvm=bv.117868183,d.dmo).

#### `on-toggle`

This expression is triggered when the button is clicked. The new `value` of the checked property is provided on the expression scope as `value`.

`size`, `type`, and `ng-disabled`.

See [buttons](./buttons.md) for detail on the base options.

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