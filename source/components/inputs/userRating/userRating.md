# User rating
An input for allowing the user to select a rating from 1-n stars.

### Usage
```
<rl-user-rating ng-model="" range=""></rl-user-rating>
```
### Options

#### [`ng-model`](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjv_PHnouTLAhWFXh4KHScJBmsQFggcMAA&url=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fdirective%2FngModel&usg=AFQjCNFGX5gYo-4684URATQ4lnqF1DVXPg&bvm=bv.117868183,d.dmo)

Two-way binds the specified value to the selected rating. See [ng-model](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjv_PHnouTLAhWFXh4KHScJBmsQFggcMAA&url=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fdirective%2FngModel&usg=AFQjCNFGX5gYo-4684URATQ4lnqF1DVXPg&bvm=bv.117868183,d.dmo).

#### `range (default: 5)`

Specifies the number of stars the user can rate by.

### Full example

```
<rl-user-rating ng-model="myRating" range="3"></rl-user-rating>
```
Output (where myRating is 2):
```
<span class="rating">
	<span class="star filled" ng-repeat="star in [1, 2, 3]" ng-click="setRating(1)"></span>
	<span class="star filled" ng-repeat="star in [1, 2, 3]" ng-click="setRating(2)"></span>
	<span class="star" ng-repeat="star in [1, 2, 3]" ng-click="setRating(3)"></span>
</span>
```
