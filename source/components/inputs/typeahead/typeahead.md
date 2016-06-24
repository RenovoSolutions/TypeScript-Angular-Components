# Typeahead
This component extends the base [input](../input.md) with typeahead-specific behavior.

### Usage
```
<rl-typeahead get-items="" use-client-searching="" transform="" select="" allow-collapse="" create="" prefix="" ng-disabled="" ng-model="" validator="" label="" name=""> ... </rl-typeahead>
```
### Options

#### `get-items`

A function for loading the items for the typeahead. If use client searching is off, sends the current search value with the request.

#### `use-client-searching (default: false)`

If set to true, the typeahead will make a single request against the `get-items` function to get the full of options and cache it. The typeahead will apply the search value internally against the cached list. If false (default), the typeahead will make a request against `get-items` each time the search changes after a debounce delay.

#### `transform`

A selector for getting the display name of the options. Can be a property name or a function that returns a string.

#### `select`

This expression will be triggered whenever a selection is made in the dropdown. If specified, `allow-collapse` defaults to false.

#### `allow-collapse (default: true)`

If specified, the typeahead will collapse to show the selected value when a selection is made.

#### `create`

If specified, the current search value will appear as an entry at the top of the list. If selected, the create handler is called to convert the search string into an object matching the options data model. The result is then applied as the new selection.

#### `prefix (default: 'Search for')`

A prefix that is appended before the label in the typeahead placeholder to indicate the action that is being performed.

Example: `prefix="Enter a" label="Search"` will output `placeholder="Enter a search"`

#### [`ng-disabled`](https://docs.angularjs.org/api/ng/directive/ngDisabled)

This option will set `disabled` on the textarea if the [expression](https://docs.angularjs.org/guide/expression) inside it is truthy.

Example: `ng-disabled="true"` will output `<textarea disabled> ... </textarea>`

`ng-model`, `validator`, `validators`, `label`, `name`.

See [input](../input.md) for detail on the base options.
