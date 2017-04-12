var app = angular.module('app', ['ionic', 'main']);

angular.module('main', ['ionic', 'controllers'])

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
    .state('splash', {
      url: '/splash',
      templateUrl: 'templates/splash.html',
      controller: 'SplashCtrl'
    })

    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu.html'
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
          templateUrl: 'templates/sobre.html',
          controller: 'SobreCtrl'
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
          templateUrl: 'templates/orcamentos.html',
          controller: 'OrcamentoCtrl'
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

    .state('menu.sugestoes', {
      url: '/sugestoes',
      views: {
        'menuContent': {
          templateUrl: 'templates/sugestoes.html',
          controller: 'SugestoesCtrl'
        }
      }
    })

    .state('menu.helpdesk', {
      url: '/helpdesk',
      views: {
        'menuContent': {
          templateUrl: 'templates/help_desk.html',
          controller: 'HelpDeskCtrl'
        }
      }
    })
    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/splash');
});