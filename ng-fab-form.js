angular.module('angularAutoForms', []);

angular.module('angularAutoForms')
    .directive('form', function (AngularAutoForms, $injector, $parse)
    {
        'use strict';

        function getHandlerFromAttr(aafFormHandler, el, attrs)
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

                    // return on ignore-'directive'
                    var ignore = el.attr(ignoreName);
                    if (ignore || ignore === '') {
                        return;
                    }

                    el.addClass('btn btn-primary');
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

                    el.addClass('btn btn-primary');
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

                    el.wrap('<div class="form-group"></div>')
                        .wrap('<div class ="' + getOffsetClass(colRightClass) + ' ' + colRightClass + '"></div>')
                        .addClass('btn btn-primary');
                });
            }
        };

        return factory;
    });

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

//# sourceMappingURL=ng-fab-form.min.js.map