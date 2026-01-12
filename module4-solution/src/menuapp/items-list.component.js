(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/menuapp/templates/items-list.template.html',
  bindings: {
    items: '<'
  }
});

})();
