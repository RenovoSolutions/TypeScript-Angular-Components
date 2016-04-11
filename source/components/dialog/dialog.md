# Dialog
Use with the [dialog service]() to specify the contents of the dialog. Wraps bootstrap's modal dialog classes.

### Usage
```
<rl-dialog autosave="">
	<rl-dialog-header> ... </rl-dialog-header>
	<rl-dialog-content> ... </rl-dialog-content>
	<rl-dialog-footer> ... </rl-dialog-footer>
</rl-dialog>
```
### Options

#### `autosave (default: false)`
If true, the component will set a default dialog footer for handling autosave contents.

### Content

#### `rl-dialog-header`
Specifies the header for the dialog. The header will show with bootstrap's .modal-header class applied, along with an 'x' button to close the dialog.

#### `rl-dialog-content`
Specifies the content for the dialog. The content will show with bootstrap's .modal-body class applied.

#### `rl-dialog-footer`
Specifies the footer for the dialog. The footer will show with bootstrap's .modal-footer class applied. If autosave is specified, a default footer is applied.

### Full example
```
<rl-dialog>
	<rl-dialog-header>Header</rl-dialog-header>
	<rl-dialog-content>Content</rl-dialog-content>
	<rl-dialog-footer>Footer</rl-dialog-footer>
</rl-dialog>
```
Output:
```
<rl-form>
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="dialog.close()">
			<span class="fa-stack">
				<i class="close-bg fa fa-circle fa-stack-2x"></i>
				<i class="close-icon fa fa-close fa-stack-1x"></i>
			</span>
		</button>
		Header
	</div>
	<div class="modal-body">Content</div>
	<div class="modal-footer">Footer</div>
</rl-form>
```
With default autosave footer:
```
<rl-dialog>
	<rl-dialog-header>Header</rl-dialog-header>
	<rl-dialog-content>Content</rl-dialog-content>
</rl-dialog>
```
Output:
```
<rl-form>
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="dialog.close()">
			<span class="fa-stack">
				<i class="close-bg fa fa-circle fa-stack-2x"></i>
				<i class="close-icon fa fa-close fa-stack-1x"></i>
			</span>
		</button>
		Header
	</div>
	<div class="modal-body">Content</div>
	<div class="modal-footer">
		<rl-button type="danger" action="dialog.close()"><i class="fa fa-times"></i> Cancel</rl-button>
		<rl-button-async type="success" action="dialog.saveAndClose()"><i class="fa fa-check"></i> Save</rl-button-submit>
	</div>
</rl-form>
```