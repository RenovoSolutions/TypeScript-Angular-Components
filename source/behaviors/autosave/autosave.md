# Autosave
Behavior for autosaving a specific context. Generally used with `ng-form` to save the contents of the form when valid.

### Usage
```
<ng-form rl-autosave="" save="" triggers="" save-when-invalid="" debounce-duration=""> ... </ng-form>
```
### Options

#### `Default(rl-autosave)`

If specified, the component will attach child behavior for triggering an autosave programmatically using the [parentChildBehavior](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/parentChildBehavior/parentChildBehavior.service.ts) service.

#### `save`

Handler for saving the contents of the form.

#### [`triggers`](../../services/autosave/triggers/triggers.md)

Sets the triggers for the autosave. See [triggers](../../services/autosave/triggers/triggers.md) for documentation.


#### `save-when-invalid`

This option enables the form to save in an invalid state. This is useful for cases where we want to apply validation to form, but we still want to persist the data while the form is invalid.

#### `debounce-duration`

Configures the debounce duration for certain autosave [triggers](../../services/autosave/triggers/triggers.md).