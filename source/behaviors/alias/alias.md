# Alias
Behavior for aliasing a data object under a different name on the given scope.

### Usage
```
<div rl-alias="(value) as (alias)"> ... </div>
```
### Options

#### `value`

Binds to a value on the current scope

#### `alias`

Sets the name the value should be aliased under on the scope. Interpolation is permitted, but if used, one-time binding is recommended. Dynamically changing the alias value could result in memory leaks as the value will still be saved against the scope under a previous alias.

### Full example
```
// controller
this.value = 5;

// view (controller as test)
<div rl-alias="test.value as foo">
	{{foo}} // 5
</div>
```