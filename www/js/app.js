angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'MenuCtrl'
    })

    .state('menu.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })    

    .state('menu.sobre', {
      url: '/sobre',
      views: {
        'menuContent': {
          templateUrl: 'templates/sobre.html'
        }
      }
    })

    .state('menu.servicos', {
      url: '/servicos',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicos.html',
          controller: 'ListServicosCtrl'
        }
      }
    })

    .state('menu.servico', {
      url: '/servicos/:servico',
      views: {
        'menuContent': {
          templateUrl: 'templates/servico.html',
          controller: 'ServicosCtrl'
        }
      }
    })
    
    .state('menu.portifolios', {
      url: '/portifolios',
      views: {
        'menuContent': {
          templateUrl: 'templates/portifolios.html',
          controller: 'ListPortifolioCtrl'
        }
      }
    })

    .state('menu.portifolio', {
      url: '/portifolios/:portifolio',
      views: {
        'menuContent': {
          templateUrl: 'templates/portifolio.html',
          controller: 'PortifoliosCtrl'
        }
      }
    })

    .state('menu.opinioes', {
      url: '/opinioes',
      views: {
        'menuContent': {
          templateUrl: 'templates/opinioes_clientes.html',
          controller: 'OpinioesCtrl'
        }
      }
    })

    .state('menu.orcamentos', {
      url: '/orcamentos',
      views: {
        'menuContent': {
          templateUrl: 'templates/orcamentos.html'
        }
      }
    })

    .state('menu.contatos', {
      url: '/contatos',
      views: {
        'menuContent': {
          templateUrl: 'templates/contatos.html',
          controller: 'ContatosCtrl'
        }
      }
    })
    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});

angular.module('module_contatos', ['ionic', 'uiGmapgoogle-maps']);
