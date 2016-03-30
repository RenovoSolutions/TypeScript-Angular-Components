# Busy
Component that conditionally shows a spinner when a flag is set.

### Usage
```
<rl-busy loading="" size=""> ... </rl-busy>
```
### Options

#### `loading`

If the loading expression evaluates to truthy, the spinner will be shown.

#### `size`

This will set the **size** of the spinner. We use the following sizes: `2x`, `3x`, `4x`, `5x`, `lg`. This option is applied to the spinner's class attribute and prefixed with `rl-`.

### Full example
A spinner with **loading** and **size**.
```
<rl-busy loading="true" size="2x"></rl-busy>
```
Output:
```
<i class="busy rl-2x"></i>
```