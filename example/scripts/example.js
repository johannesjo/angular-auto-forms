angular.module('exampleApp', [
    'angularAutoForms'
])
    .config(function ()
    {
    })
    .controller('exampleCtrl', function ($scope)
    {
        $scope.submit = function ()
        {
            alert('Form submitted');
        };
    });
