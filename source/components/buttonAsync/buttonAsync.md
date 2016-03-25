# Button Async
Button for triggering asynchronous operations. The async button handles showing a spinner until a promise is resolved. For simple actions, use [button](/source/components/button/button.md) instead.

### Usage
```
<rl-button-async action="" size="" type="" ng-disabled="" right-aligned="" busy=""> ... </rl-button>
```
### Options

#### `action`

The expression in the **action** will be triggered when the button is clicked. If the action returns a promise, the button will show a spinner until the promise resolves. If the action returns true, the button will show a spinner until told to do otherwise via the busy option.

#### `busy`

This option allows you to show/hide the spinner via a binding. This is useful in cases where simply returning a promise from the action isn't sufficient.

#### `right-aligned`

Specifies if the button is within a right aligned context. Defaults to `false`. This is used by the button to determine which side the spinner should show on.

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
An async button with an **action**, **size**, **type**, **right-align** and **busy**.
```
<rl-button action="button.click()" size="lg" type="danger" ng-disabled="false" right-aligned="true" busy="true"> ... </rl-button>
```
Output:
```
<button type="button" class="btn btn-lg btn-danger" ng-click="button.click()" disabled>
	<rl-busy loading="true"></rl-busy>
	...
</button>
```