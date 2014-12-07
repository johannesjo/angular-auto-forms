angular-auto-forms
==================
*[ng-fab-form](https://github.com/johannesjo/ng-fab-form)'s little companion for auto-markup*

Simple helper + extendable api. Get from a couple of form elements to fully standard bootstrap-markup in a breeze. Take the same form, change an attribute and get anther form layout. Allows you to declare your own rules and should be easily extended for other css-frameworks, even your very own. [Try it yourself!](http://plnkr.co/edit/id1Oh4?p=preview)

## Install
```
bower install angular-auto-forms --save-dev
```
or install its companion [ng-fab-form](https://github.com/johannesjo/ng-fab-form) together with it:
```
bower install angular-auto-forms ng-fab-form --save-dev
```


## Example

Load the module:
```javascript
angular.module('exampleApp', [
    'angularAutoForms'
]);
```

Set the `aaf-form-handler` to `autoFormBootstrap.basic` on your form:
```html
<form role="form"
      name="exampleForm"
      ng-submit="submit()"
      aaf-form-handler="autoFormBootstrap.basic">
    <input type="email"
           placeholder="Enter Email"          
           aaf-label="Email">

    <input type="password"
           required
           ng-model="formData.password"
           aaf-label="Your public Password: {{ formData.password }}">
    <!-- note that you can pass $scope.variables to aaf-label -->

    <input type="checkbox"
           aaf-label="I agree!">

    <input type="text"
           aaf-label="Pattern-Label for /asd/">

    <textarea aaf-label="Some Textarea"></textarea>

    <select aaf-label="Some Select">
        <option value="Test Option">Test-Option</option>
    </select>

    <button type="submit">Submit Form</button>
</form>

```
And enjoy! 

## Directives
#### aaf-ignore
If applied to a form, the form ignores the default form-handler if one is set.
If applied to a form-element, it leaves it untouched.

#### aaf-label
The label-text. Applieable to every form element. You can pass scope-variables to it, too!
```
<textarea aaf-label="Some Textarea-Label"></textarea>
```

#### aaf-form-handler
Sets the form markup-helper function. The default bootstrap helper ships with three: `inline`,  `basic` and `horizontal`. 
```html
<form role="form"
      name="exampleForm"
      ng-submit="submit()"
      aaf-form-handler="autoFormBootstrap.inline">
      ...
      ...
      ...
</form>
```


## Set a default Handler
```
angular.module('exampleApp', [
    'angularAutoForms'
])
    .run(function (AngularAutoForms, autoFormBootstrap)
    {
        AngularAutoForms.defaultHandler = autoFormBootstrap.inline;
    });
```

## Create your own helper
Although not required for the standard form, it is highly recommended to install jQuery, when creating your own handlers as things are little complicated with jQuery-lite sometimes. 

With jQuey it should be super easy to create your own helpers. An example:
```
angular.module('angularAutoForms')
    .factory('autoFormMyForm', function (AngularAutoForms)
    {
        'use strict';
        
        var labelName = AngularAutoForms.config.label,
            ignoreName = AngularAutoForms.config.ignore;
        
        return {
            simple:function(formEl){
                formEl.addClass('my-simple-form');
            
                var inputs = formEl.find('input');            
                inputs.each(function(){
                var el = $(this);
                    el.wrap('<div class="my-simple-form-input-wrapper"></div>')
                      .parent().prepend('<label>' + el.attr(labelName) + '</label>');
                       
                });
                
                var checkboxes = formEl.find('input[type="checkbox"');
                checkboxes.wrap('<label class ="checkbox"></label>');            
            }
        };
    });
       
```

```html
<form role="form"
      name="exampleForm"
      ng-submit="submit()"
      aaf-form-handler="autoFormMyForm.simple">
      ...
      ...
      ...
</form>
```

Created something useful? Share it!


`angular-auto-forms` is published under the [The GNU Lesser General Public License V2.1](https://github.com/johannesjo/angular-auto-forms4/blob/master/LICENSE).

