# Lazy Load
Component for conditionally showing content. With this component, the content will not render until it is first shown. Afterward the initial render it will hide and show using `ng-show`.

### Usage
```
<rl-lazy-load show=""> ... </rl-lazy-load>
```
### Options

#### `show`

This expression determines whether the content should show or hide.