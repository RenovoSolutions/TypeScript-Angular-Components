# Spinner
This component extends the base [input](../input/input.md) with spinner-specific behavior.

### Usage
```
<rl-spinner max="" min="" step="" round-to-step="" decimals="" prefix="" postfix="" ng-disabled="" spinner-id="" ng-model="" validator="" label="" name=""> ... </rl-spinner>
```
### Options

#### `max`

Restricts the value of the spinner to a maximum of the specified value.

#### `min`

Restricts the value of the spinner to a minimum of the specified value.

#### `step`

Sets the amount by which the spinner increments when the user clicks the + or - or uses the spinner wheel.

#### `round-to-step`

If true, will force the spinner value to round to the nearest step increment.

#### `decimals`

Sets the precision that is allowed by the spinner value.

#### `prefix`

If specified, will be used to show an input group addon immediately before the textbox.

#### `postfix`

If specified, will be used to show an input group addon immediately after the textbox.

#### [`ng-disabled`](https://docs.angularjs.org/api/ng/directive/ngDisabled)

This option will set `disabled` on the textarea if the [expression](https://docs.angularjs.org/guide/expression) inside it is truthy.

Example: `ng-disabled="true"` will output `<textarea disabled> ... </textarea>`

`ng-model`, `validator`, `validators`, `label`, `name`.

See [input](../input/input.md) for detail on the base options.

#### `spinner-id`

Sets the id of the input box element of the spinner.

### Full example
A spinner with **prefix**, **postfix**, and **spinner-id**.
```
<rl-spinner prefix="$" postfix="/ hour" spinner-id="mySpinner" ng-model="test.number"></rl-spinner>
```
Output:
```
<span class="input-group-btn">
	<button class="btn btn-default" type="button">-</button>
</span>
<span class="input-group-addon">
	$
</span>
<input type="text" class="spinner form-control" id="mySpinner" ng-model="test.number" />
<span class="input-group-addon">
	/ hour
</span>
<span class="input-group-btn">
	<button class="btn btn-default" type="button">+</button>
</span>
```