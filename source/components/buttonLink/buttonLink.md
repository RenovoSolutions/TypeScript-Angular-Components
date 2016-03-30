# Button Link
This component wraps a hyperlink that is styled like a button.

### Usage
```
<rl-button-link link="" new-tab="" size="" type="" ng-disabled=""> ... </rl-button-link>
```
### Options

#### `link`

Sets the url of the hyperlink. Interpolation is permitted.

#### `new-tab (default: false)`

If true, the link opens in another tab. (Equivalent to `target="_blank"`)

`size`, `type`, and `ng-disabled`.

See [buttons](./buttons.md) for detail on the base options.

### Full Example
A button link with a **link**, **new-tab**, **size**, **type**, and **disabling**.
```
<rl-button-link link="http://www.google.com" new-tab="true" size="lg" type="danger" ng-disabled="true"> ... </rl-button-link>
```
Output:
```
<a class="btn btn-lg btn-danger" href="http://www.google.com" target="_blank" disabled> ... </a>
```