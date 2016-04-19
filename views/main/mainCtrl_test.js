'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('labIS'));

    var scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        $controller('MainCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('should attach a list of degrees to the scope', function () {
        expect(scope.titulaciones.length).toBe(3);
    });

    it('should have "nombre" defined', function () {
        expect(scope.titulaciones[1].nombre).toBeDefined();
    });
    
    // Este test falla
    it('should fail', function () {
        expect(scope.fail).toBeDefined();
    });
    it('should invert order value', function () {
       var ant = scope.invertido;
       scope.invertir(); 
        expect(ant ^ scope.invertido).toBeTruthy();
    });
});