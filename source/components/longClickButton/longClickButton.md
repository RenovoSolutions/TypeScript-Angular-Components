# Long click button
Extends [button async](../buttonAsync/buttonAsync.md) with `hold to click` behavior. Text must be specified via a binding so it can be optionally replaced with a warning when the user clicks without holding.

### Usage
```
<rl-long-click-button action="" warning="" size="" type="" ng-disabled="" right-aligned="" busy=""> ... </rl-long-click-button>
```
### Options

#### `warning`

The specified warning will be notified to the user if they click the button without holding it for long enough.

`action`, `busy`.

See [buttonAsync](../buttonAsync/buttonAsync.md) for detail on the button async options.

`right-aligned`, `size`, `type`, and `ng-disabled`.

See [buttons](../button/buttons.md) for detail on the base options.

### Full Example
A long click button with **action**, **size**, **type**, **right-align** and **busy**.
```
<rl-long-click-button action="button.click()" size="lg" type="danger" ng-disabled="false" right-aligned="true" busy="true"></rl-long-click-button>
```
Output:
```
<button type="button" class="btn btn-lg btn-danger" ng-mousedown="// starts timer" ng-mouseup="// cancels timer" disabled>
	<rl-busy loading="true"></rl-busy>
	...
</button>
```

### Deprecated options

Use transcluded content instead of `text` and `icon`. `on-short-click-text` is replaced by `warning`.

#### `text`

The specified test will be shown as the primary content of the button.

#### `on-short-click-text`

This text will be shown as a warning to the user if they click the button without holding it for long enough.

#### `icon`

If specified, the icon is shown to the left of the button text.
