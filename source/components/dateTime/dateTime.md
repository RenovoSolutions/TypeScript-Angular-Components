# DateTime
This component extends the base [input](../input/input.md) with datetime-specific behavior.

### Usage
```
<rl-date-time max="" min="" use-date="" use-time="" minute-stepping="" clear-button="" on-clear-event="" ng-model="" validator="" label="" name=""> ... </rl-date-time>
```
### Options

#### `max`

Restricts the value of the date picker to a maximum of the specified value.

#### `min`

Restricts the value of the date picker to a minimum of the specified value.

#### `use-date (default: true)`

If set to false, will hide the date portion of the date picker. (Only shows a time spinner)

#### `use-time (default: true)`

If set to false, will hide the time portion of the date picker.

#### `minute-stepping`

Sets the amount incremented by in the minutes spinner.

#### `clear-button (default: false)`

If set to true, shows a button for clearing the date-time value.

#### `on-clear-event`

This expression will be triggered whenever the clear button is clicked, if clear is enabled.

`ng-model`, `validator`, `validators`, `label`, `name`.

See [input](../input/input.md) for detail on the base options.

### Full example
A date picker with **clear-button**.
```
<rl-date-time clear-button="true" ng-model="test.dateTime"></rl-date-time>
```
Output:
```
<input type="text" class="form-control" ng-model="test.dateTime">
<span class="input-group-btn">
	<button class="btn btn-default"><i class="fa fa-calendar"></i></button>
</span>
<span class="datepicker-clear">
	<button type="button" class="btn btn-default"><i class="fa fa-times"></i></button>
</span>
```