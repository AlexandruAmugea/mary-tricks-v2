mainCtrl.$inject = ['$scope', 'galleryFiltersService'];
function mainCtrl($scope, galleryFiltersService) {
  $scope.$on('$routeChangeStart', function(next, current) { 
      var path = current.$$route.originalPath;
      if(path === '/contact') {
          document.getElementsByTagName('body')[0].classList.add('contact');
      } else {
          document.getElementsByTagName('body')[0].classList.remove('contact');
      }

      var menuItems = document.querySelectorAll('.desktop-nav ul li a');

      function removeClasses(elements) {
          elements.forEach(function(elem) {
              elem.classList.remove('active');
          });
      };
      
      if(path === '/') {
          removeClasses(menuItems);
          menuItems[0].classList.add('active');
      } else if(path === '/portfolio') {
          removeClasses(menuItems);
          menuItems[1].classList.add('active');
      } else if(path === '/contact'){
          removeClasses(menuItems);
          menuItems[2].classList.add('active');
      }

      $scope.openMenu = function(){
        document.getElementsByClassName('desktop-nav')[0].classList.add('active');
        document.getElementById('background-wrapper').classList.add('opened');
      };

      $scope.closeMenu = function(e){
        e.stopPropagation();
        e.preventDefault();
        document.getElementsByClassName('desktop-nav')[0].classList.remove('active');
        document.getElementById('background-wrapper').classList.remove('opened');
      };

    });
}

export default mainCtrl;