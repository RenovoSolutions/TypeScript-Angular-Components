# Popover
Behavior that wraps angular-ui [popovers](https://angular-ui.github.io/bootstrap/#/popover) to hide some of the gimmicky behavior and allow for binding in a dynamic template.

### Usage
```
<div rl-popover="" text-only=""> ... </div>
```
### Options

#### `Default(rl-popover)`

Binds in an html template from the scope.

#### `text-only (default: false)`

If true, uses the popover value as a simple text value for the popover rather than an html template binding.

Example: `rl-popover="Hello world!" text-only="true"` outputs a popover with `Hello world!`.

See [popover](https://angular-ui.github.io/bootstrap/#/popover) for additional options. All options under the `uib-popover-* settings` section apply.

### Full example
```
// controller
this.template = '<h1>Hello world!</h1>;

// view (controller as test)
<div rl-popover="test.template"></div>
```
Output (popover content):
```
<h1>Hello world!</h1>
```