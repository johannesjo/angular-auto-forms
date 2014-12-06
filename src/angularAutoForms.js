angular.module('angularAutoForms')
    .factory('AngularAutoForms', function (autoFormBootstrap)
    {
        'use strict';

        // factory definition
        var AngularAutoForms = {
            handlers: {
                autoFormBootstrap: autoFormBootstrap
            },

            registerFormHandler: function (factoryStr, factory)
            {
                AngularAutoForms.handlers[factoryStr] = factory;
            },

            setDefaultFormHandler: function (handler)
            {
                AngularAutoForms.defaultHandler = handler;
            },

            defaultHandler: null
        };

        // set default
        AngularAutoForms.defaultHandler = autoFormBootstrap;

        // return factory
        return AngularAutoForms;
    });
