angular.module('module_gallery', ['ionic','ion-gallery'])

app.config(function($ionGalleryConfigProvider) {
  $ionGalleryConfigProvider.setGalleryConfig({
                          action_label: 'Fechar',
                          toggle: false,
                          row_size: 3,
                          fixed_row_size: true
  });
});