# Form
Component that wraps an angular form with the ability to validate and show an error if the user attempts to submit the form.

### Usage
```
<rl-form save="" saving="" form="" child-link="" initialize-form-dirty=""> ... </rl-form>
```
### Options

#### `save`

This expression will be triggered whenever validation passes and the form is submitted.

#### `saving`

Outputs a flag specifying if the form is currently saving.

#### `form`

Outputs the underlying angular form object.

#### `child-link`

If specified, the form component will attach child behavior for triggering the form to save programmatically using the [parentChildBehavior](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/parentChildBehavior/parentChildBehavior.service.ts) service.

#### `initialize-form-dirty`

If `true`, the form component will default to a dirty state and allow submission even if no values are changed. If `false` (default), the form starts as pristine.
