# Validation group
A component for applying validation to a group of elements, such as a list that must have at least one entry.

### Usage
```
<rl-validation-group validator="" validators=""> ... </rl-validation-group>
```
### Options

#### `validator (alias: validators)`

A handler for applying custom validation logic to the content group. Validators can be provided as a single or as an array of validators.
Model:
```
{
	validate(): boolean;
	errorMessage: string | { (): string };
	isActive?: boolean | { (): boolean };
}
```
Examples:
```
validator="myValidator"
validators="[myValidator1, myValidator2]"
```

### Full example

```
<rl-validation-group validator="myValidator"> ... </rl-validation-group>
```
Output (with validation errors):
```
<div class="content-group" ng-form="validationGroupForm">
	<div class="error-message">
		<label>myError</label>
	</div>
	...
</div>
```
Output (with no errors):
```
<div class="content-group" ng-form="validationGroupForm">
	...
</div>
```