angular.module('angularAutoForms')
    .factory('autoFormBootstrap', function (AngularAutoForms)
    {
        'use strict';
        var labelName = AngularAutoForms.config.label,
            ignoreName = AngularAutoForms.config.ignore;


        // helper function
        function standardTransform(elements, setSrLabel)
        {
            angular.forEach(elements, function (el)
            {
                el = angular.element(el);
                var label = el.attr(labelName),
                    ignore = el.attr(ignoreName),
                    type = el.attr('type');

                // return on ignore-'directive'
                if (ignore || ignore === '') {
                    return;
                }

                // handle checkboxes and radios
                if (type === 'checkbox' || type === 'radio') {
                    el.wrap('<div class="' + type + '"></div>')
                        .wrap('<label></label>');

                    if (label) {
                        el.after(el.attr(labelName));
                    }

                    // handle other elements
                } else {
                    el.addClass('form-control')
                        .wrap('<div class="form-group"></div>');

                    if (label) {
                        var labelClass = setSrLabel && 'sr-only' || 'control-label';
                        el.parent()
                            .prepend('<label class="' + labelClass + '">' + el.attr(labelName) + '</label>');
                    }
                }
            });
        }

        function getColClassParts(colRightClass)
        {
            return colRightClass.match(/([^-]+)-([^-]+)-(\d+)/);
        }

        function getOffsetClass(colRightClass)
        {
            return 'col-' + getColClassParts(colRightClass)[2] + '-offset-' +
                (12 - getColClassParts(colRightClass)[3]);
        }

        function horizontalTransform(elements, colLeftClass, colRightClass)
        {

            angular.forEach(elements, function (el)
            {
                el = angular.element(el);
                var label = el.attr(labelName),
                    ignore = el.attr(ignoreName),
                    type = el.attr('type');

                // return on ignore-'directive'
                if (ignore || ignore === '') {
                    return;
                }

                // handle checkboxes and radios
                if (type === 'checkbox' || type === 'radio') {
                    el.wrap('<div class="form-group"></div>')
                        .wrap('<div class ="' + getOffsetClass(colRightClass) + ' ' + colRightClass + '"></div>')
                        .wrap('<div class="' + type + '"></div>')
                        .wrap('<label></label>');

                    if (label) {
                        el.after(el.attr(labelName));
                    }

                    // handle other elements
                } else {
                    el.addClass('form-control')
                        .wrap('<div class="form-group"></div>')
                        .wrap('<div class="' + colRightClass + '"></div>');

                    if (label) {
                        var labelClass = 'control-label ' + colLeftClass;
                        el.parent().parent()
                            .prepend('<label class="' + labelClass + '">' + el.attr(labelName) + '</label>');
                    }
                }
            });
        }


        // factory definition
        var factory = {
            basic: function (el, attrs)
            {
                var inputs = el.find('input'),
                    textareas = el.find('textarea'),
                    selects = el.find('select'),
                    submits = el.find('button');


                // handle input elements
                standardTransform(inputs);

                // handle textareas
                standardTransform(textareas);

                // handle selects
                standardTransform(selects);

                // handle buttons
                angular.forEach(submits, function (el)
                {
                    el = angular.element(el);
                    if (el.attr('type') === 'submit') {
                        // return on ignore-'directive'
                        var ignore = el.attr(ignoreName);
                        if (ignore || ignore === '') {
                            return;
                        }

                        el.addClass('btn btn-primary');
                    }
                });
            },

            inline: function (el)
            {
                // add form class
                el.addClass('form-inline');

                var inputs = el.find('input'),
                    textareas = el.find('textarea'),
                    selects = el.find('select'),
                    submits = el.find('button');


                // handle input elements
                standardTransform(inputs, true);

                // handle textareas
                standardTransform(textareas, true);

                // handle selects
                standardTransform(selects, true);

                // handle buttons
                angular.forEach(submits, function (el)
                {
                    el = angular.element(el);

                    // return on ignore-'directive'
                    var ignore = el.attr(ignoreName);
                    if (ignore || ignore === '') {
                        return;
                    }
                    if (el.attr('type') === 'submit') {
                        el.addClass('btn btn-primary');
                    }
                });
            },

            horizontal: function (el)
            {
                el.addClass('form-horizontal');
                var inputs = el.find('input'),
                    textareas = el.find('textarea'),
                    selects = el.find('select'),
                    submits = el.find('button'),
                    colLeftClass = 'col-sm-2',
                    colRightClass = 'col-sm-10';


                // handle input elements
                horizontalTransform(inputs, colLeftClass, colRightClass);

                // handle textareas
                horizontalTransform(textareas, colLeftClass, colRightClass);

                // handle selects
                horizontalTransform(selects, colLeftClass, colRightClass);

                // handle buttons
                angular.forEach(submits, function (el)
                {
                    el = angular.element(el);

                    // return on ignore-'directive'
                    var ignore = el.attr(ignoreName);
                    if (ignore || ignore === '') {
                        return;
                    }
                    if (el.attr('type') === 'submit') {
                        el.wrap('<div class="form-group"></div>')
                            .wrap('<div class ="' + getOffsetClass(colRightClass) + ' ' + colRightClass + '"></div>')
                            .addClass('btn btn-primary');
                    }
                });
            }
        };

        return factory;
    });
