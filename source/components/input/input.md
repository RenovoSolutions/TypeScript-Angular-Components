# Input
These components wrap primitive inputs with validation behavior.

### Usage
```
<rl-textbox ng-model="" validator="" label="" name=""> ... </rl-textbox>
```
See [textbox](../textbox/textbox.md) for options specific to textbox inputs. Also can attach [rl-required](../../behaviors/required/required.md) to add required field validation with an error message.
### Options

#### [`ng-model`](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjv_PHnouTLAhWFXh4KHScJBmsQFggcMAA&url=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fdirective%2FngModel&usg=AFQjCNFGX5gYo-4684URATQ4lnqF1DVXPg&bvm=bv.117868183,d.dmo)

Two-way binds the specified value to the input value. See [ng-model](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjv_PHnouTLAhWFXh4KHScJBmsQFggcMAA&url=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fdirective%2FngModel&usg=AFQjCNFGX5gYo-4684URATQ4lnqF1DVXPg&bvm=bv.117868183,d.dmo).

#### `validator`

A handler for applying custom validation logic to an input component.
Model:
```
{
	validate(): boolean;
	errorMessage: string | { (): string };
	isActive?: boolean | { (): boolean };
}
```
#### `label`

The label is used as the placeholder for the textbox. When the user enters a value, the label 'flowers-up' to above the textbox.

#### `name`

Applies a name to the ng-model for the component. If none is specified, defaults to `input-{{guid}}`.

### Input components
* [textbox](../textbox/textbox.md)
* [textarea](../textarea/textarea.md)
* [spinner](../spinner/spinner.md)
* [datetime](../dateTime/dateTime.md)
* [select]()
* [typeahead]()