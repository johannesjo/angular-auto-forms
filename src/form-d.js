angular.module('angularAutoForms')
    .directive('form', function (AngularAutoForms)
    {
        'use strict';

        return {
            restrict: 'E',
            scope: false,
            require: 'form',
            compile: function (el, attrs)
            {
                if (AngularAutoForms.defaultHandler) {
                    AngularAutoForms.defaultHandler(el, attrs);
                }
            }
        };
    });
