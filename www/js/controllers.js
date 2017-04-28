angular.module('controllers', ['ionic', 'uiGmapgoogle-maps', 'util.gallery', 'ui.mask'])

.controller('MainCtrl', function($state) {
  $state.go('menu.home');
})

.controller('MenuCtrl', function($scope) {
  $scope.openFacebookApp = function() {
    // window.open('facebook://pages/BrandaoAgenciaWeb', '_system', 'location=no')
    window.open('fb://page/BRANDAOAGENCIAWEB', '_system', 'location=no')
  }
})

.controller('HomeCtrl', function($scope) {
  $scope.options = {
    autoplay: 5000,
    loop: false,
    speed: 1000,
    slidesPerView: 1,
    centeredSlides: true,
    autoplayStopOnLast: true,
    effect: 'fade'
  } 
})

.controller('SobreCtrl', function($scope) {
  $scope.items = [{src:'img/foto_01.jpg'}, {src:'img/foto_02.jpg'}, {src:'img/foto_03.jpg'},
                  {src:'img/foto_04.jpg'}, {src:'img/foto_05.jpg'}, {src:'img/foto_06.jpg'}]
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

.controller('OrcamentoCtrl', function($scope, $stateParams, $ionicPopup) {
    
  $scope.cliente = {
    'empresa' : '',
    'nome' : '',
    'cel' : '',
    'fixo' : '',
    'email' : '',
    'resposta' : '',
    'produtos' : {
      'pacote' : false,
      'assessoria' : false,
      'fotografia' : false,
      'facebook' : false,
      'sistema' : false,
      'hospedagem' : false,
      'google' : false,
      'design' : false,
      'outros' : false
    },
    'detalhes' : ''
  };

  $scope.confirmarEnvio = function($stateParams){
     $ionicPopup.alert({
          template: 'Confirmar envio?',
          buttons: [
            { text: 'Cancelar' }, 
            { text: 'Enviar',
              onTap: function(e) {
                $scope.sendEmail($stateParams);  
              } 
            }
          ]
      })
  }

  $scope.sendEmail = function($stateParams) {

      var empresa = $scope.cliente.empresa;
      var nome = $scope.cliente.nome;
      var cel = $scope.cliente.cel;
      var fixo = $scope.cliente.fixo;
      var email = $scope.cliente.email;
      var resposta = $scope.cliente.resposta;
      
      var mensagem = 'Dados do cliente:<br/><br/>';

      if(empresa != '') { 
        mensagem += ' - Empresa: ' + empresa;
      } else {
        mensagem += ' - Empresa: Não informada';
      }

      mensagem += ' <br/>- Nome: ' +nome+
                  ' <br/>- Telefone Celular: ' +cel+
                  ' <br/>- Telefone Fixo: ' +fixo+
                  ' <br/>- e-Mail: ' +email;

      if(resposta != '') {mensagem += '<br/><br/>Como conheceu a FBrandão?<br/>'+ resposta;}

      /* produtos */ 
      var pacote = $scope.cliente.produtos.pacote;
      var assessoria = $scope.cliente.produtos.assessoria;
      var fotografia = $scope.cliente.produtos.fotografia;
      var facebook = $scope.cliente.produtos.facebook;
      var sistema = $scope.cliente.produtos.sistema;
      var hospedagem = $scope.cliente.produtos.hospedagem;
      var google = $scope.cliente.produtos.google;
      var design = $scope.cliente.produtos.design;
      var outros = $scope.cliente.produtos.outros;
      
      var produtos = '';
      if(pacote     == true){produtos += '- Pacote<br/>';}      
      if(assessoria == true){produtos += '- Assessoria<br/>';}      
      if(fotografia == true){produtos += '- Fotografia<br/>';}      
      if(facebook   == true){produtos += '- Facebook<br/>';}      
      if(sistema    == true){produtos += '- Sistema<br/>';}      
      if(hospedagem == true){produtos += '- Hospedagem<br/>';}      
      if(google == true){produtos += '- Google<br/>';}      
      if(design == true){produtos += '- Design<br/>';}      
      if(outros == true){produtos += '- Outros<br/>';}
      
      mensagem += '<br/><br/>Produtos solicitados: <br/>' + produtos;

      var detalhes = $scope.cliente.detalhes;
     
      if(detalhes != ''){mensagem += '<br/><br/>Detalhes:<br/><br/>' +detalhes;}

      // var send_to = "devthiagoh@gmail.com";
      var send_to = "fabiano@fbrandao.com.br";
      var cc = "atendimento@fbrandao.com.br";

      console.log('enviando emaillll...');
      emailjs.send("smtp_fbrandao","template_orcamento_id", 
        {
          send_to: send_to,
          reply_to: "",
          cc: cc, 
          cliente: nome,
          emailCliente: email, 
          mensagem: mensagem
        });

      $ionicPopup.alert({
          template: 'Solicitação de orçamento enviada com sucesso.<br/><br/> Em breve entraremos em contatos com você.<br/><br/> Obrigado !!!',
          buttons: [{ text: 'Fechar' ,
                      onTap: function(e) {
                        $scope.cliente = {
                          'empresa' : '',
                          'nome' : '',
                          'cel' : '',
                          'fixo' : '',
                          'email' : '',
                          'resposta' : '',
                          'produtos' : {
                            'pacote' : false,
                            'assessoria' : false,
                            'fotografia' : false,
                            'facebook' : false,
                            'sistema' : false,
                            'hospedagem' : false,
                            'google' : false,
                            'design' : false,
                            'outros' : false
                          },
                          'detalhes' : ''
                        };  
                      }
                   }]
      })      
  
  }

})

.controller('ContatosCtrl', function($scope, $log, $state, $timeout) {

  var lat = -20.3079033;
  var lng = -40.2961303;
  var zoomMap = 16;

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

  $scope.goToOrcamento = function(){
    $state.go('menu.orcamentos');  
  };  
})

.controller('SugestoesCtrl', function($scope, $stateParams, $ionicPopup) {
    
  $scope.cliente = {
    'empresa' : '',
    'nome' : '',
    'cel' : '',
    'fixo' : '',
    'email' : ''
  };

  $scope.sugestao = {
    'tipos' : {
      'elogio' : false,
      'sugestao' : false,
      'critica' : false,
      'reclamacao' : false
    },
    'detalhes' : ''
  };

  $scope.confirmarEnvio = function($stateParams){
     $ionicPopup.alert({
          template: 'Confirmar envio?',
          buttons: [
            { text: 'Cancelar' }, 
            { text: 'Enviar',
              onTap: function(e) {
                $scope.sendEmail($stateParams);  
              } 
            }
          ]
      })
  }

  $scope.sendEmail = function($stateParams) {

      var empresa = $scope.cliente.empresa;
      var nome = $scope.cliente.nome;
      var cel = $scope.cliente.cel;
      var fixo = $scope.cliente.fixo;
      var email = $scope.cliente.email;
      
      var mensagem = 'Dados do cliente:<br/><br/>';

      if(empresa != '') { 
        mensagem += ' - Empresa: ' + empresa;
      } else {
        mensagem += ' - Empresa: Não informada';
      }

      mensagem += ' <br/>- Nome: ' +nome+
                  ' <br/>- Telefone Celular: ' +cel+
                  ' <br/>- Telefone Fixo: ' +fixo+
                  ' <br/>- e-Mail: ' +email;

      /* tipos */ 
      var elogio = $scope.sugestao.tipos.elogio;
      var sugestao = $scope.sugestao.tipos.sugestao;
      var critica = $scope.sugestao.tipos.critica;
      var reclamacao = $scope.sugestao.tipos.reclamacao;
      
      var tipos = '';
      if(elogio     == true){tipos += '- Elogio<br/>';}      
      if(sugestao   == true){tipos += '- Sugestão<br/>';}      
      if(critica    == true){tipos += '- Crítica<br/>';}      
      if(reclamacao == true){tipos += '- Reclamação<br/>';}
      
      mensagem += '<br/><br/>Tipo solicitação: <br/>' + tipos;

      var detalhes = $scope.sugestao.detalhes;

      if(detalhes != ''){mensagem += '<br/><br/>Detalhes:<br/><br/>' +detalhes;}

      // var send_to = "devthiagoh@gmail.com";
      var send_to = "fabiano@fbrandao.com.br";
      var cc = "atendimento@fbrandao.com.br";

      console.log('enviando emaillll...');
      emailjs.send("smtp_fbrandao","template_sugestao_id", 
        {
          send_to: send_to,
          reply_to: "",
          cc: cc, 
          cliente: nome,
          emailCliente: email, 
          mensagem: mensagem
        });

      $ionicPopup.alert({
          template: 'Solicitação enviada com sucesso.<br/><br/> Obrigado !!!',
          buttons: [{ text: 'Fechar',
                      onTap: function(e) {
                        $scope.cliente = {
                          'empresa' : '',
                          'nome' : '',
                          'cel' : '',
                          'fixo' : '',
                          'email' : ''
                        };

                        $scope.sugestao = {
                          'tipos' : {
                            'elogio' : false,
                            'sugestao' : false,
                            'critica' : false,
                            'reclamacao' : false
                          },
                          'detalhes' : ''
                        };  
                      }
                   }]
      })      
  }
})

.controller('HelpDeskCtrl', function($scope, $stateParams, $ionicPopup) {
       
  $scope.cliente = {
    'empresa' : '',
    'nome' : '',
    'cel' : '',
    'fixo' : '',
    'email' : ''
  };

  $scope.solicitacao = {
    'detalhes' : ''
  }

  $scope.confirmarEnvio = function($stateParams){
     $ionicPopup.alert({
          template: 'Confirmar envio?',
          buttons: [
            { text: 'Cancelar' }, 
            { text: 'Enviar',
              onTap: function(e) {
                $scope.sendEmail($stateParams);  
              } 
            }
          ]
      })
  }

  $scope.sendEmail = function($stateParams) {

      var empresa = $scope.cliente.empresa;
      var nome = $scope.cliente.nome;
      var cel = $scope.cliente.cel;
      var fixo = $scope.cliente.fixo;
      var email = $scope.cliente.email;
      
      var mensagem = 'Dados do cliente:<br/><br/>';

      if(empresa != '') { 
        mensagem += ' - Empresa: ' + empresa;
      } else {
        mensagem += ' - Empresa: Não informada';
      }

      mensagem += ' <br/>- Nome: ' +nome+
                  ' <br/>- Telefone Celular: ' +cel+
                  ' <br/>- Telefone Fixo: ' +fixo+
                  ' <br/>- e-Mail: ' +email;

      var detalhes = $scope.solicitacao.detalhes;

      if(detalhes != ''){mensagem += '<br/><br/>Detalhes:<br/><br/>' +detalhes;}

      // var send_to = "devthiagoh@gmail.com";
      var send_to = "fabiano@fbrandao.com.br";
      var cc = "atendimento@fbrandao.com.br";

      console.log('enviando emaillll...');
      emailjs.send("smtp_fbrandao","template_helpdesk_id", 
        {
          send_to: send_to,
          reply_to: "",
          cc: cc, 
          cliente: nome,
          emailCliente: email, 
          mensagem: mensagem
        });

      $ionicPopup.alert({
          template: 'Solicitação enviada com sucesso.<br/><br/> Obrigado !!!',
          buttons: [{ text: 'Fechar',
                      onTap: function(e) {
                        $scope.cliente = {
                          'empresa' : '',
                          'nome' : '',
                          'cel' : '',
                          'fixo' : '',
                          'email' : ''
                        };

                        $scope.solicitacao = {
                          'detalhes' : ''
                        }
                      } 
                   }]
      })      
  }
})

;

