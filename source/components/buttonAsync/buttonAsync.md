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

`right-aligned`, `size`, `type`, and `ng-disabled`.

See [buttons](./buttons.md) for detail on the base options.

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