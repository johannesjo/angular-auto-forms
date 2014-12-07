angular.module('angularAutoForms')
    .directive('form', function (AngularAutoForms, $injector)
    {
        'use strict';

        function getHandlerFromAttr(aafFormHandler)
        {
            var split = aafFormHandler.split('.');
            if (split.length > 2) {
                throw 'angularAutoForms: you should not deep nest template functions';
            } else if (split.length === 2) {
                var factory = $injector.get(split[0]);
                return factory[split[1]];
            } else if (split.length === 1) {
                return $injector.get(split[0]);
            }
        }


        return {
            restrict: 'E',
            scope: false,
            require: 'form',
            compile: function (el, attrs)
            {
                if (AngularAutoForms.defaultHandler) {
                    var ignore = el.attr('aaf-ignore'),
                        aafFormHandler = el.attr('aaf-form-handler');
                    if (ignore || ignore === '') {
                        return;
                    } else if (aafFormHandler) {
                        getHandlerFromAttr(aafFormHandler)(el, attrs);
                    } else {
                        AngularAutoForms.defaultHandler(el, attrs);
                    }
                }
            }
        };
    });
