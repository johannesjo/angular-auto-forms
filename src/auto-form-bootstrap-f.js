angular.module('angularAutoForms')
    .factory('autoFormBootstrap', function ()
    {
        'use strict';

        // factory definition
        var autoFormBootstrap = function (el, attrs)
        {
            var labelName = 'aaf-label',
                ignoreName = 'aaf-ignore',
                inputs = el.find('input'),
                textareas = el.find('textarea'),
                selects = el.find('select'),
                submits = el.find('button');

            // handle input elements
            angular.forEach(inputs, function (el)
            {
                el = angular.element(el);
                var label = el.attr(labelName),
                    ignore = el.attr(ignoreName),
                    type = el.attr('type');

                // return on ignore-'directive'
                if (ignore || ignore === '') return;

                switch (type) {
                    case 'checkbox':
                    case 'radio':
                        el
                            .wrap('<div class="' + type + '"></div>')
                            .wrap('<label></label>');

                        label && el.after(el.attr(labelName));
                        break;

                    default:
                        el
                            .addClass('form-control')
                            .wrap('<div class="form-group"></div>');

                        if (label) {
                            el
                                .parent()
                                .prepend('<label class="control-label">' + el.attr(labelName) + '</label>');
                        }
                        break;
                }
            });

            // handle textareas
            angular.forEach(textareas, function (el)
            {
                el = angular.element(el);
                el.addClass('form-control')
                    .wrap('<div class="form-group"></div>');

            });

            // handle selects
            angular.forEach(selects, function (el)
            {
                el = angular.element(el);
                el.addClass('form-control')
                    .wrap('<div class="form-group"></div>');

            });

            // handle buttons
            angular.forEach(submits, function (el)
            {
                el = angular.element(el);
                el.addClass('btn btn-primary');
            });
        };

        // return factory
        return autoFormBootstrap;
    });
