# String with Watermark
Component for showing a placeholder if the specified string has no value.

### Usage
```
<rl-string-with-watermark string="" watermark=""></rl-string-with-watermark>
```
### Options

#### `string`

The value that should be displayed.

#### `watermark`

The placeholder that should be shown in place of the string if none is present.

### Full example

A string with a value:
```
<rl-string-with-watermark string="Something here" watermark="Placeholder"></rl-string-with-watermark>
```
Output:
```
<span>Something here</span>
```
An empty string:
```
<rl-string-with-watermark string="" watermark="Placeholder"></rl-string-with-watermark>
```
Output:
```
<span class="watermark">Placeholder</span>
```