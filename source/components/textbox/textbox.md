# Textbox
This component extends the base [input](../input/input.md) with textbox-specific behavior.

### Usage
```
<rl-textbox maxlength="" ng-model="" validator="" label="" name=""> ... </rl-textbox>
```
### Options

#### `maxlength`

Sets the maxlength of the textbox.

See [input](../input/input.md) for detail on the base options.

### Full example
An input with **maxlength** and **label**.
```
<rl-textbox maxlength="20" label="Test" ng-model="test.text"></rl-textbox>
```
Output (if test.text is empty):
```
<input type="text" class="form-control" maxlength="20" ng-model="test.text" placeholder="Test" />
```
Output (if test.text has a value):
```
<label class="show-hide">Test</label>
<input type="text" class="form-control" maxlength="20" ng-model="test.text" placeholder="Test" />
```