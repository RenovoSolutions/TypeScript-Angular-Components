# Button Link
This component wraps a hyperlink that is styled like a button.

### Usage
```
<rl-button-link link="" new-tab="" size="" type="" ng-disabled=""> ... </rl-button-link>
```
### Options

#### `link`

Sets the url of the hyperlink. Interpolation is permitted.

#### `new-tab (default: false)`

If true, the link opens in another tab. (Equivalent to `target="_blank"`)

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
A button link with a **link**, **new-tab**, **size**, **type**, and **disabling**.
```
<rl-button-link link="http://www.google.com" new-tab="true" size="lg" type="danger" ng-disabled="true"> ... </rl-button-link>
```
Output:
```
<a class="btn btn-lg btn-danger" href="http://www.google.com" target="_blank" disabled> ... </a>
```