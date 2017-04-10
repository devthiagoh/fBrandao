angular.module('starter.controllers', ['ionic', 'module_gallery', 'uiGmapgoogle-maps'])

.controller('SplashCtrl', function($scope, $ionicModal, $state, $timeout) {
  
  $ionicModal.fromTemplateUrl('templates/splash.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // $scope.signIn = function(user) {
  //   console.log('Fazendo login...', user);
  //   $state.go('menu.home');
  // };

  $timeout(function() {
      $state.go('menu.home');
  }, 3000); 
 
})

.controller('MenuCtrl', function($scope) {

})

.controller('HomeCtrl', function($scope) {
  $scope.options = {
    autoplay: 2500,
    loop: false,
    speed: 1000,
    slidesPerView: 1,
    centeredSlides: true
  } 

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  }); 
})

.controller('ListServicosCtrl', function($scope) {
  $scope.servicos = [
    { title: 'Sites', id: 1 },
    { title: 'Hospedagem', id: 2 },
    { title: 'Sites Mobile', id: 3 },
    { title: 'Logos', id: 4 },
    { title: 'Design Gráfico', id: 5 },
    { title: 'Assessoria Mensal', id: 6 },
    { title: 'Fotografias', id: 7 },
    { title: 'Marketing Digital', id: 8 },
    { title: 'Produção de Vídeos', id: 9 }
  ];
})

.controller('ServicosCtrl', function($scope, $stateParams) {

    $scope.servicoSelecionado = angular.fromJson($stateParams.servico);

    var opcao = $scope.servicoSelecionado;

    if(opcao.id == 1){
      $scope.sites = true;
    }
    if(opcao.id == 2){
      $scope.hospedagens = true;
    }
    if(opcao.id == 3){
      $scope.mobiles = true;
    }
    if(opcao.id == 4){
      $scope.logos = true;
    }
    if(opcao.id == 5){
      $scope.designs = true;
    }
    if(opcao.id == 6){
      $scope.assessorias = true;
    }
    if(opcao.id == 7){
      $scope.fotografias = true;
    }
    if(opcao.id == 8){
      $scope.marketing = true;
    }
    if(opcao.id == 9){
      $scope.videos = true;
    }

})

.controller('ListPortifolioCtrl', function($scope) {
  $scope.portifolios = [
    { title: 'Sites', id: 1 },
    { title: 'Logos', id: 2 },
    { title: 'Artes Gráficas', id: 3 },
    { title: 'Fotografias', id: 4 },
    { title: 'Fanpages', id: 5 }
  ];
})

.controller('PortifoliosCtrl', function($scope, $stateParams) {

    $scope.portifolioSelecionado = angular.fromJson($stateParams.portifolio);

    var opcao = $scope.portifolioSelecionado;

    if(opcao.id == 1){
      $scope.sites = true;
    }
    if(opcao.id == 2){
      $scope.logos = true;
    }
    if(opcao.id == 3){
      $scope.artes = true;
    }
    if(opcao.id == 4){
      $scope.fotografias = true;
    }
    if(opcao.id == 5){
      $scope.fanpages = true;
    }
})

.controller('OpinioesCtrl', function($scope) {
  $scope.options = {
    autoplay: 2500,
    loop: false,
    speed: 1000,
    slidesPerView: 1,
    centeredSlides: true
  } 

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  }); 
})

.controller('ContatosCtrl', function($scope, $log, $timeout) {

  var lat = -20.3079033;
  var lng = -40.2961303;
  var zoomMap = 16;
  
  // $scope.map = { 
  //               center: 
  //                 { 
  //                   latitude: lat, 
  //                   longitude: lng 
  //                 }, 
  //                 zoom: zoomMap
  //             };

  $scope.map = {center: {latitude: lat, longitude: lng }, zoom: zoomMap };
    $scope.map = {center: {latitude: lat, longitude: lng }, zoom: zoomMap };
    $scope.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
      id: 0,
      coords: {
        latitude: lat,
        longitude: lng
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };
    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
      if (_.isEqual(newVal, oldVal))
        return;
      $scope.coordsUpdates++;
    });
    $timeout(function () {
      $scope.marker.coords = {
        latitude: lat,
        longitude: lng
      };
      $scope.dynamicMoveCtr++;
      $timeout(function () {
        $scope.marker.coords = {
          latitude: lat,
          longitude: lng
        };
        $scope.dynamicMoveCtr++;
      }, 2000);
    }, 1000);
})

// .directive('map', function() {
//   return {
//         restrict: 'A',
//         link:function(scope, element, attrs){

//           var zValue = scope.$eval(attrs.zoom);
//           var lat = scope.$eval(attrs.lat);
//           var lng = scope.$eval(attrs.lng);


//           var myLatlng = new google.maps.LatLng(lat,lng),
//           mapOptions = {
//                 zoom: zValue,
//                 center: myLatlng
//             },
//               map = new google.maps.Map(element[0],mapOptions);


//         }
//     };
// })

.controller('SobreCtrl', function($scope) {
  $scope.items = [{src:'img/foto_01.jpg'}, {src:'img/foto_02.jpg'}, {src:'img/foto_03.jpg'},
                  {src:'img/foto_04.jpg'}, {src:'img/foto_05.jpg'}, {src:'img/foto_06.jpg'}]
})

;