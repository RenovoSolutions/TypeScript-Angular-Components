# Select
This component extends the base [input](../input/input.md) with dropdown-specific behavior.

### Usage
```
<rl-select options="" get-options="" transform="" null-option="" ng-disabled="" ng-model="" validator="" label="" name=""> ... </rl-select>
```
### Options

#### `options`

A list of options to display in the dropdown.

#### `get-options`

Use instead of `options` for loading options asynchronously. Accepts a function that returns a list or a promise that returns a list.

#### `transform`

A selector for getting the display name of the options. Can be a property name or a function that returns a string.

#### `null-option`

If specified, will show an option with the specified text at the top of the list for 'clearing' the selection.

#### `select`

This expression will be triggered whenever a selection is made in the dropdown.

#### [`ng-disabled`](https://docs.angularjs.org/api/ng/directive/ngDisabled)

This option will set `disabled` on the textarea if the [expression](https://docs.angularjs.org/guide/expression) inside it is truthy.

Example: `ng-disabled="true"` will output `<textarea disabled> ... </textarea>`

`ng-model`, `validator`, `validators`, `label`, `name`.

See [input](../input/input.md) for detail on the base options.
