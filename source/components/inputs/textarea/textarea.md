# Textarea
This component extends the base [input](../input.md) with textarea-specific behavior.

### Usage
```
<rl-textarea maxlength="" rows="" ng-disabled="" ng-model="" validator="" label="" name=""> ... </rl-textarea>
```
### Options

#### `maxlength`

Sets the maxlength of the textbox.

#### `rows`

Sets the height of the textarea in rows.

#### [`ng-disabled`](https://docs.angularjs.org/api/ng/directive/ngDisabled)

This option will set `disabled` on the textarea if the [expression](https://docs.angularjs.org/guide/expression) inside it is truthy.

Example: `ng-disabled="true"` will output `<textarea disabled> ... </textarea>`

`ng-model`, `validator`, `validators`, `label`, `name`.

See [input](../input.md) for detail on the base options.

### Full example
A textarea with **maxlength**, **rows**, **ng-disabled**, and **label**.
```
<rl-textarea maxlength="20" rows="3" ng-disabled="true" label="Test" ng-model="test.text"></rl-textarea>
```
Output (if test.text is empty):
```
<textarea class="form-control" maxlength="20" rows="3" disabled ng-model="test.text" placeholder="Test"></textarea>
```
Output (if test.text has a value):
```
<label class="show-hide">Test</label>
<textarea class="form-control" maxlength="20" rows="3" disabled ng-model="test.text" placeholder="Test"></textarea>
```