# Button Submit
This button can be placed on a form to trigger a submit action.

### Usage
```
<form>
	<rl-button-submit saving="" right-aligned="" size="" type="" ng-disabled=""> ... </rl-button-link>
</form>
```
### Options

#### `saving`

Shows a spinner if the expression evaluates to truthy.

`right-aligned`, `size`, `type`, and `ng-disabled`.

See [buttons](../button/buttons.md) for detail on the base options.

### Full Example
A submit button with **saving**, **right-aligned**, **size**, **type**, and **disabling**.
```
<rl-button-submit saving="true" right-aligned="true" size="lg" type="danger" ng-disabled="true"> ... </rl-button-submit>
```
Output:
```
<button type="submit" class="btn btn-lg btn-danger" disabled>
	<rl-busy loading="true"></rl-busy>
	...
</button>
```