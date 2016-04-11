# Generic container
A component that uses an expression to conditionally display a template. Functions similar to [`ng-switch`](https://docs.angularjs.org/api/ng/directive/ngSwitch) with the significant difference that expressions are supported in the `when` operators, where `ng-switch` only allows for primitive values.

### Usage
```
<rl-generic-container selector="">
	<template when-selector=""> ... </template>
	<template default> ... </template>
</rl-generic-container>
```
### Options

#### `selector`
An expression that evaluates to a string value representing the template that should be shown. If no match is found, the default is used.

#### `when-selector`
Specifies the value that the container should match against to determine if this template should be shown. Unlike `ng-switch`, interpolation is permitted.

#### `default (default: false)`
If specified, the specified template is used if no match is found. In this case, no `when-selector` need be specified.

Template contents must be surrounded with an html tag to function correctly.

### Full example
```
// myNum = 2
<rl-generic-container selector="myValue">
	<template when-selector="1">Template 1</template>
	<template when-selector="{{myNum}}">Template 2</template>
	<template default>Default</template>
</rl-generic-container>
```
Output (myValue = 1):
```
<div id="container"><span>Template 1</span></div>
```
Output (myValue = 2):
```
<div id="container"><span>Template 2</span></div>
```
Output (myValue = 3):
```
<div id="container"><span>Default</span></div>
```