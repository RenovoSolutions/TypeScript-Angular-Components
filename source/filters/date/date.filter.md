# Date filter
A filter for formatting [`moment`](http:\\www.momentjs.com) objects for display.

### Usage
```
{{myDate | rlDate:includeTime?}}
```
### Options

#### `includeTime (default: false)`

If true, date will be formatted as 'MM/DD/YYYY h:mm A z'.

Default format is 'MM/DD/YYYY'.

### Full Example
Example date with and without time included.
```
// myDate = moment('2016-01-02T12:00:00-05:00');
{{myDate | rlDate}}
{{myDate | rlDate:true}}
```
Output:
```
01/02/2016
01/02/2016 12:00 PM EST
```