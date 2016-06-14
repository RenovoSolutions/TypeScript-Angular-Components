# Button
Basic button with configurable options for **action**, **size**, **type**, and **disabling**.

### Usage
```
<rl-button action="" size="" type="" ng-disabled=""> ... </rl-button>
```
### Options

`action`, `size`, `type`, and `ng-disabled`.

See [buttons](../buttons.md) for detail on the base options.

### Full Example
A button with an **action**, **size**, **type**, and **disabling**.
```
<rl-button action="button.click()" size="lg" type="danger" ng-disabled="true"> ... </rl-button>
```
Output:
```
<button type="button" class="btn btn-lg btn-danger" ng-click="button.click()" disabled> ... </button>
```