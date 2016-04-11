# Comma list
A simple component for displaying an array as a comma separated list.

### Usage
```
<rl-comma-list list="" max="" transform=""> ... </rl-comma-list>
```
### Options

#### `list`

Specifies the list that is going to be displayed.

#### `max`

Specifies the maximum number of items that should be shown. If the list exceeds the maximum, the remaining items are truncated and an ellipses (...) is shown.

#### `transform`

A selector for getting the display name of the options. Can be a property name or a function that returns a string.

### Full Example
A comma-list with a **list**, **max**, and **transform**.
```
// myList = [{ value: 1 }, { value: 2 }, { value: 3 }];
<rl-comma-list list="myList" max="2" transform="'value'"></rl-comma-list>
```
Output:
```
1, 2... 1 more items
```