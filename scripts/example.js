angular.module('exampleApp', [
    'angularAutoForms'
])
    .config(function ()
    {
    })
    .controller('exampleCtrl', function ($scope,AngularAutoForms,autoFormBootstrap)
    {
        AngularAutoForms.defaultHandler = autoFormBootstrap.inline;


        $scope.submit = function ()
        {
            alert('Form submitted');
        };
    });
