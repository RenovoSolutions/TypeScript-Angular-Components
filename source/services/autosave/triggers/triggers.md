# Autosave Triggers
Configures how the save is triggered on an autosave form. Multiple triggers may be specified in a space seperated list.

### Usage
```
<ng-form rl-autosave triggers=""> ... </ng-form>
```
### Options

#### `none`

Disables automatic autosaving. Saves can still be triggered programatically.

Example: `triggers="none"`

#### `onChange(default)`

Triggers autosave when the form becomes dirty. This is debounced as the user enters additional keystrokes.

**debounce-duration** may be configured on the [rl-autosave](../../behaviors/autosave/autosave.md) behavior.

Example: `triggers="onChange"`, `triggers="onChange other"`