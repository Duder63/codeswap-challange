(function () {
  'use strict';

  // Shoppinglists controller
  angular
    .module('shoppinglists')

    .controller('ShoppinglistsController', ShoppinglistsController);

  ShoppinglistsController.$inject = ['$scope', '$sce', '$state', '$window', '$filter', 'Authentication', 'shoppinglistResolve'];

  function ShoppinglistsController ($scope, $sce, $state, $window, $filter, Authentication, shoppinglist) {
    var vm = this;

    vm.authentication = Authentication;
    vm.shoppinglist = shoppinglist;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.contentList = [];
    vm.addContent = addContent;
    vm.deleteSelectedContent = deleteSelectedContent;
    vm.deleteContent = deleteContent;

    var filterFilter = $filter('filter');

    $scope.find = function(content, search) {
      if(!content || !search) return false;
      // console.log(content);
      return content.toLowerCase().indexOf(search.toLowerCase()) >= 0;

    };
  
    $scope.findViaFilter = function(content, search) {
      if(!content || !search) return false;
      return filterFilter([content], search).length > 0;
    };    

    //Search highlight text filter
    // $filter('highlight', function($sce){
    //   return function(text, phrase) {
    //     if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
    //       '<span class="highlightedText">$1</span>');
    //       console.log(text);
    //     return $sce.trustAsHtml(text);
    //     };

    //   });


    // Remove existing Shoppinglist
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.shoppinglist.$remove($state.go('shoppinglists.list'));
      }
    }

    // Add content to list array
    function addContent(isValid) {
      vm.contentList = vm.shoppinglist.contents;

      vm.contentList.push({
        content: vm.shoppinglist.content, 
        priority: vm.shoppinglist.priority,
        notes: vm.shoppinglist.notes,
        isChecked: vm.shoppinglist.isChecked
      });

      vm.shoppinglist.content = '';
      vm.shoppinglist.priority = '';
      vm.shoppinglist.notes = '';
      vm.shoppinglist.isChecked = false;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.shoppinglistcontentForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.shoppinglist._id) {
         // vm.shoppinglist.contents = vm.contentList;
        vm.shoppinglist.$update(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('shoppinglists.view', {
          shoppinglistId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

    }

    function deleteContent(content) {
      vm.contentList = vm.shoppinglist.contents;
      var contenttodelete = vm.contentList.indexOf(content);
      vm.shoppinglist.contents.splice(contenttodelete, 1);
      vm.shoppinglist.contents = vm.contentList;       
      if (vm.shoppinglist._id) {
         // vm.shoppinglist.contents = vm.contentList;
        vm.shoppinglist.$update(successCallback, errorCallback);
      }
      function successCallback(res) {
        $state.go('shoppinglists.view', {
          shoppinglistId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }


    function deleteSelectedContent() {
      vm.contentList = vm.shoppinglist.contents;
      for(var i=(vm.shoppinglist.contents.length -1); i > -1; i--) {
        if(vm.shoppinglist.contents[i].isChecked) {
          vm.shoppinglist.contents.splice(i, 1); 
           vm.shoppinglist.contents = vm.contentList;
        }
       
      }  
        // vm.shoppinglist.contents = vm.contentList;
        if (vm.shoppinglist._id) {
         // vm.shoppinglist.contents = vm.contentList;
        vm.shoppinglist.$update(successCallback, errorCallback);
        }
      function successCallback(res) {
        $state.go('shoppinglists.view', {
          shoppinglistId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
      

    // Save Shoppinglist
    function save(isValid) {
      // vm.shoppinglist.contents = vm.contentList;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.shoppinglistForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.shoppinglist._id) {
         // vm.shoppinglist.contents = vm.contentList;
        vm.shoppinglist.$update(successCallback, errorCallback);
      } else {
        vm.shoppinglist.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('shoppinglists.view', {
          shoppinglistId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
