# Checkbox
A basic checkbox input

### Usage
```
<rl-checkbox ng-model="" on-toggle="" ng-disabled="" active=""> ... </rl-checkbox>
```
### Options

#### [`ng-model`](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjv_PHnouTLAhWFXh4KHScJBmsQFggcMAA&url=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fdirective%2FngModel&usg=AFQjCNFGX5gYo-4684URATQ4lnqF1DVXPg&bvm=bv.117868183,d.dmo)

Two-way binds the specified value to the checkbox 'checked' property. See [ng-model](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjv_PHnouTLAhWFXh4KHScJBmsQFggcMAA&url=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fdirective%2FngModel&usg=AFQjCNFGX5gYo-4684URATQ4lnqF1DVXPg&bvm=bv.117868183,d.dmo).

#### `on-toggle`

This expression is triggered when the checkbox is clicked. The new `value` of the checked property is provided on the expression scope as `value`.

#### [`ng-disabled`](https://docs.angularjs.org/api/ng/directive/ngDisabled)

This option will set `disabled` on the checkbox if the [expression](https://docs.angularjs.org/guide/expression) inside it is truthy.

#### `active (default: true)`

If set to false, clicking on the checkbox won't trigger the state to change. This is used primarily if the checkbox is within a larger context that can be clicked to toggle to avoid toggle/untoggle behavior.

### Full Example
A checkbox with an **ng-model**, **on-toggle**, and **disabling**.
```
<rl-checkbox ng-model="button.checked" on-toggle="button.click()" ng-disabled="true"> ... </rl-checkbox>
```
Output (When checkbox.checked is true):
```
<span class="rl-checkbox-checked" ng-click="checkbox.toggle()" disabled> ... </span>
```
Output (When checkbox.checked is false):
```
<span class="rl-checkbox" ng-click="checkbox.toggle()" disabled> ... </span>
```
(By default, rl-checkbox is styled as [`fa-square-o`](https://fortawesome.github.io/Font-Awesome/icon/square-o) and rl-checkbox-checked is styled as [`fa-check-square-o`](https://fortawesome.github.io/Font-Awesome/icon/check-square-o)