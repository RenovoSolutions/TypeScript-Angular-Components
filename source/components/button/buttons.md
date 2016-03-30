# Buttons
These components wrap various kinds of buttons in order to hide the concerns of styling and display.

### Usage
```
<rl-button action="" right-aligned="" size="" type="" ng-disabled=""> ... </rl-button>
```
### Options

#### `action`

The expression in the **action** will be triggered when the button is clicked.

Available in [button](../button/button.md), [buttonAsync](../buttonAsync/buttonAsync.md), and [longClickButton](../longClickButton/longClickButton.md)

#### `size`

This will set the **size** of the button. We use the following sizes: `xs`, `sm`, `md`, `lg`. This option is applied to the button's class attribute and prefixed with `btn-`.

Example: `size="lg"` will ouput `class="btn-lg"`.

Available in [button](../button/button.md), [buttonAsync](../buttonAsync/buttonAsync.md), [buttonLink](../buttonLink/buttonLink.md), [buttonSubmit](../buttonSubmit/buttonSubmit.md), and[buttonToggle](../buttonToggle/buttonToggle.md).

#### `type`

This option sets the button's **visual type**. This option defaults to `default`. We use the following types: `primary`, `success`, `danger`, `info`, `warning`, `link`. This option is applied to the button's class attribute and prefixed with `btn-`.

Example: `type="danger"` will output `class="btn-danger"`.

Available in all buttons.

#### [`ng-disabled`](https://docs.angularjs.org/api/ng/directive/ngDisabled)

This option will set `disabled` on the button if the [expression](https://docs.angularjs.org/guide/expression) inside it is truthy.

Example: `ng-disabled="true"` will output `<button disabled> ... </button>`

Available in all buttons

#### `right-aligned (default: false)`

For buttons that have the ability to show a spinner, specifies whether the spinner should show up on the left or right side of the button. In this context, a right-aligned button will have the spinner on the left, and visa versa. (It's preferrable to avoid having the text jump when the spinner appears)

Available in [buttonAsync](../buttonAsync/buttonAsync.md), [buttonSubmit](../buttonSubmit/buttonSubmit.md), and [longClickButton](../longClickButton/longClickButton.md)

### Full Example
A button with an **action**, **size**, **type**, and **disabling**.
```
<rl-button action="button.click()" size="lg" type="danger" ng-disabled="true"> ... </rl-button>
```
Output:
```
<button type="button" class="btn btn-lg btn-danger" ng-click="button.click()" disabled> ... </button>
```

### Button components
* [button](../button/button.md)
* [buttonAsync](../buttonAsync/buttonAsync.md)
* [buttonLink](../buttonLink/buttonLink.md)
* [buttonSubmit](../buttonSubmit/buttonSubmit.md)
* [buttonToggle](../buttonToggle/buttonToggle.md)
* [longClickButton](../longClickButton/longClickButton.md)