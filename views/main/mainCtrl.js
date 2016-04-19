
angular.module('labIS')
.controller('MainCtrl', function ($scope,$http) {
	
    $scope.carrito = [];

	$scope.agregar = function (p,tipo) {
        var itemActual;
    p.Tipo = p.clase;          

        for (var i = 0; i < $scope.carrito.length; i++) {
            if ($scope.carrito[i].Producto.nombre == p.nombre & $scope.carrito[i].Producto.Tipo == p.clase) {
                itemActual = $scope.carrito[i];
            }
        }

        if (!itemActual) {
            $scope.carrito.push({
                Producto: p,
                CantidadP: 0,
                CantidadM: 0,
                CantidadF: 0
            });
        } else {
            itemActual.Cantidad++;
            if(p.clase == "Pequeña"){
                itemActual.CantidadP++;
            } else if(p.clase == "Mediana"){
                itemActual.CantidadM++;
            }else{
                itemActual.CantidadF++;
            }
        }

        console.log(itemActual);
    }
    
    $scope.eliminar = function (p) {
        var itemActual;

        for (var i = 0; i < $scope.carrito.length; i++) {
            if ($scope.carrito[i].Producto.nombre == p.nombre) {
                itemActual = $scope.carrito[i];
                $scope.carrito.splice(i,1);
            }
        }



        
    }
    
    $scope.borrar = function (p) {
        var itemActual;

        for (var i = 0; i < $scope.carrito.length; i++) {
            if ($scope.carrito[i].Producto.nombre == p.nombre) {
                itemActual = $scope.carrito[i];
                if(itemActual.CantidadP != 0 & p.clase == "Pequeña"){
                	itemActual.CantidadP--;
                }else if(itemActual.CantidadM != 0 & p.clase == "Mediana"){
                    itemActual.CantidadM--;
                } else if(itemActual.CantidadF != 0 & p.clase == "Familiar"){
                    itemActual.CantidadF--;
                }
                if(itemActual.CantidadP == 0 & itemActual.CantidadM == 0 & itemActual.CantidadF == 0){
        					$scope.carrito.splice(i,1);
        				}
            }
        }

        
    }


   
    $scope.formatoMoneda = function(valor,tipo){
        var valor = parseFloat(valor,3);
        var clase = tipo;
        if(clase == "Pequeña"){
            return valor * $scope.todos.factorPrecioTam.peq;
        } else if(clase == "Mediana"){
        	return valor * $scope.todos.factorPrecioTam.med;	
        } else {

        	return valor * $scope.todos.factorPrecioTam.fam;
        }
        

    }

    $scope.calculoParcial = function(valorP,valorM,valorF){

        var precioP = valorP * $scope.todos.factorPrecioTam.peq;

        var precioM = valorM * $scope.todos.factorPrecioTam.med;
        var precioF = valorF * $scope.todos.factorPrecioTam.fam;
        return parseFloat(precioP + precioM + precioF,3);
    }

    $scope.calculoTotal = function(){
        var total = 0;
        for (var i = 0; i < $scope.carrito.length; i++) {
                var precioP = $scope.todos.precios[$scope.carrito[i].Producto.precio] * $scope.carrito[i].CantidadP * $scope.todos.factorPrecioTam.peq;
                var precioM = $scope.todos.precios[$scope.carrito[i].Producto.precio] * $scope.carrito[i].CantidadM * $scope.todos.factorPrecioTam.med;
                var precioF = $scope.todos.precios[$scope.carrito[i].Producto.precio] * $scope.carrito[i].CantidadF * $scope.todos.factorPrecioTam.fam;
            	total += parseFloat(precioP + precioM + precioF,3);
        }
        return total;
    }

    $http.get('preciosPizzas.json').then(function(res){
          $scope.todos = res.data;                
        });

  
    

    
});
