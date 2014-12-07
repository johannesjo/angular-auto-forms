angular.module('angularAutoForms')
    .factory('AngularAutoForms', function ()
    {
        'use strict';

        // factory definition
        var AngularAutoForms = {
            config: {
                label: 'aaf-label',
                ignore: 'aaf-ignore'
            },
            extendConfig: function (extendConfigObj)
            {
                angular.extend(AngularAutoForms.config, extendConfigObj);
            },
            defaultHandler: 'autoFormBootstrap.basic'
        };

        // return factory
        return AngularAutoForms;
    });
