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
    .state('main', {
      url: '/main',
      controller: 'MainCtrl'
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
          templateUrl: 'templates/servicos.html'
        }
      }
    })

    .state('menu.sites', {
      url: '/servicos/sites',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicos/sites.html'
        }
      }
    })

    .state('menu.hospedagem', {
      url: '/servicos/hospedagem',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicos/hospedagem.html'
        }
      }
    })

    .state('menu.mobile', {
      url: '/servicos/mobile',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicos/sites_mobile.html'
        }
      }
    })

    .state('menu.logos', {
      url: '/servicos/logos',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicos/logos.html'
        }
      }
    })

    .state('menu.design', {
      url: '/servicos/design',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicos/design_grafico.html'
        }
      }
    })

    .state('menu.assessoria', {
      url: '/servicos/assessoria',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicos/assessoria_mensal.html'
        }
      }
    })

    .state('menu.fotografias', {
      url: '/servicos/fotografias',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicos/fotografias.html'
        }
      }
    })

    .state('menu.marketing', {
      url: '/servicos/marketing',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicos/marketing_digital.html'
        }
      }
    })

    .state('menu.videos', {
      url: '/servicos/videos',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicos/producao_videos.html'
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
    $urlRouterProvider.otherwise('/main');
});