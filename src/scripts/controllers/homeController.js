homeCtrl.$inject = ['$scope', 'galleryFiltersService', '$location'];
function homeCtrl($scope, galleryFiltersService, $location) {
    $scope.goToGallery = (filter) => {
        galleryFiltersService.setFilter(filter);
        $location.path('/portfolio');
    };
}

export default homeCtrl;