# Button Submit
This button can be placed on a form to trigger a submit action.

### Usage
```
<form>
	<rl-button-submit saving="" right-aligned="" size="" type="" ng-disabled=""> ... </rl-button-link>
</form>
```
### Options

#### `saving`

Shows a spinner if the expression evaluates to truthy.

#### `right-aligned (default: false)`

Specifies if the button is within a right aligned context. This is used by the button to determine which side the spinner should show on.

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
A submit button with **saving**, **right-aligned**, **size**, **type**, and **disabling**.
```
<rl-button-submit saving="true" right-aligned="true" size="lg" type="danger" ng-disabled="true"> ... </rl-button-submit>
```
Output:
```
<button type="submit" class="btn btn-lg btn-danger" disabled>
	<rl-busy loading="true"></rl-busy>
	...
</button>
```