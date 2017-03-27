(function () {
  'use strict';

  angular
    .module('shoppinglists')
    .filter('shoppinglists', shoppinglists);

  shoppinglists.$inject = [/*Example: '$state', '$window' */];

  function shoppinglists(/*Example: $state, $window */) {
    return function (input) {
      // Shoppinglists directive logic
      // ...

      return 'shoppinglists filter: ' + input;
    };
  }
})();
