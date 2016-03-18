# Button
Basic button with configurable options for **action**, **size**, **type**, and **disabling**.

### Usage
```
<rl-button action="" size="" type="" ng-disabled=""> ... </rl-button>
```
### Options

#### `action`

This will set the **ng-click event** of the button.

#### `size`

This will set the **size** of the button. We use the following sizes: `xs`, `sm`, `md`, `lg`. This option is applied to the button's class attribute and prefixed with `btn-`.

Example: `size="lg"` will ouput `class="btn-lg"`.

#### `type`

This option sets the button's **visual type**. This option defaults to `default`. We use the following types: `primary`, `success`, `danger`, `info`, `warning`, `link`. This option is applied to the button's class attribute and prefixed with `btn-`.

Example: `type="danger"` will output `class="btn-danger"`.


#### [`ng-disabled`](https://docs.angularjs.org/api/ng/directive/ngDisabled)

This option will set `disabled` on the button if the [expression](https://docs.angularjs.org/guide/expression) inside it is truthy.

Example: `ng-disabled="true"` will output `<button disabled> ... </button>`

### Full Example
A button with an **action**, **size**, **type**, and **disabling**.
```
<rl-button action="button.click()" size="lg" type="danger" ng-disabled="true"> ... </rl-button>
```
Output:
```
<button type="button" class="btn btn-lg btn-danger" ng-click="button.click()" disabled> ... </button>
```