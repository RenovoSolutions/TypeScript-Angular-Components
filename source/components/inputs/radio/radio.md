# Radio
A basic radio button input

### Usage
```
<rl-radio ng-model="" value=""> ... </rl-radio>
<rl-radio-group ng-model="">
	<rl-radio value=""> ... </rl-radio>
</rl-radio-group>
```
### Options

#### [`ng-model`](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjv_PHnouTLAhWFXh4KHScJBmsQFggcMAA&url=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fdirective%2FngModel&usg=AFQjCNFGX5gYo-4684URATQ4lnqF1DVXPg&bvm=bv.117868183,d.dmo)

Two-way binds the specified value to the checkbox 'checked' property. See [ng-model](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjv_PHnouTLAhWFXh4KHScJBmsQFggcMAA&url=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fdirective%2FngModel&usg=AFQjCNFGX5gYo-4684URATQ4lnqF1DVXPg&bvm=bv.117868183,d.dmo).

The ng-model can be applied either to a radio group, or to a single radio button. It should only be applied against a single radio button if the radio is not going to be used in a group.

#### `value`

The value of the radio button when selected. Complex values are allowed.

### Full Example
A radio group with an **ng-model** and several radio **values**.
```
<rl-radio-group ng-model="input.radio1">
	<rl-radio value="{ value: 1 }"> ... </rl-radio>
	<rl-radio value="{ value: 2 }"> ... </rl-radio>
	<rl-radio value="{ value: 3 }"> ... </rl-radio>
</rl-radio-group>
```
Output:
```
// where groupName is a randomly generated name shared across the group
<label><input id="radio" type="radio" name="groupName" ng-model="input.radio1" ng-value="{ value: 1 }" /> ... </label>
<label><input id="radio" type="radio" name="groupName" ng-model="input.radio1" ng-value="{ value: 2 }" /> ... </label>
<label><input id="radio" type="radio" name="groupName" ng-model="input.radio1" ng-value="{ value: 3 }" /> ... </label>
```
A single radio button.
```
<rl-radio ng-model="input.radio2" value="{ value: 4 }">4</rl-radio>
```
Output:
```
<label><input id="radio" type="radio" ng-model="input.radio2" ng-value="{ value: 4 }" /> ... </label>
```
