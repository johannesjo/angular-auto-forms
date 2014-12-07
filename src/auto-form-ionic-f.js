angular.module('angularAutoForms')
    .factory('autoFormIonic', function (AngularAutoForms)
    {
        'use strict';
        var labelName = AngularAutoForms.config.label,
            ignoreName = AngularAutoForms.config.ignore;


        // factory definition
        var factory = {
            basic: function (el)
            {

            },
            inlineLabels: function (el)
            {
            }
        };

        return factory;
    });
