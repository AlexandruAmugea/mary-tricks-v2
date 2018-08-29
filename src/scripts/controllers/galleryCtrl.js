import KEYS from '../const/const';
const viewSliderInstaFeed = require('raw-loader!../views/sliderInstaFeed.html');

galleryCtrl.$inject = ['instagramService', '$scope', 'galleryFiltersService'];
function galleryCtrl(instagramService, $scope, galleryFiltersService) {

    $scope.options = {
        pages: null,
        activePage: null,
        numberOfPreviewImages: 8,
        loading: true
    };
    $scope.pictures         = [];
    $scope.allPictures      = [];
    $scope.selectedImage    = [];

    $scope.getAll           = ()=>{
        galleryFiltersService.reset();
        $scope.init();
    };

    $scope.init = ()=>{
        $scope.filters          = galleryFiltersService.getFilter();
        $scope.options.loading  = true;
        instagramService.getMediaFromUserById({
            userId: KEYS.instagramUser,
            access_token: KEYS.instagramToken,
        }).then(function(_data){
            $scope.picturesArray = [];
            if($scope.filters) {
                _data.data.data.forEach(function(elem){
                    for(var i = 0; i < elem.tags.length; i++) {
                        if(elem.tags[i] === $scope.filters) {
                            $scope.picturesArray.push(elem);
                        }
                    };
                });
                createDataForPages($scope.picturesArray);
                $scope.options.loading = false;
            } else {
                _data.data.data.forEach(function(elem){
                    $scope.picturesArray.push(elem);
                });
                createDataForPages($scope.picturesArray);
                $scope.options.loading = false;
            }
        });
    };

    $scope.nextPage = function(){
        $scope.options.activePage += 1;
        $scope.pictures = $scope.allPictures[$scope.options.activePage -1];
        $scope.picturesUpFirst = $scope.pictures.slice(0,2);
        $scope.picturesUpSecond = $scope.pictures.slice(2,4);
        $scope.picturesDown  = $scope.pictures.slice(4,8);
    };

    $scope.prevPage = function(){
        $scope.options.activePage -= 1;
        $scope.pictures = $scope.allPictures[$scope.options.activePage - 1];
        $scope.picturesUpFirst = $scope.pictures.slice(0,2);
        $scope.picturesUpSecond = $scope.pictures.slice(2,4);
        $scope.picturesDown  = $scope.pictures.slice(4,8);
    };
    
    var createDataForPages = function(data){
        $scope.options.pages = Math.round(data.length / $scope.options.numberOfPreviewImages);
        $scope.options.activePage = 1;
        for(var i = 0; i < $scope.options.pages; i++) {
            $scope.allPictures.push(data.slice(0,8));
            data.splice(0,8);
        };
        $scope.pictures = $scope.allPictures[$scope.options.activePage - 1];
        $scope.picturesUpFirst = $scope.pictures.slice(0,2);
        $scope.picturesUpSecond = $scope.pictures.slice(2,4);
        $scope.picturesDown  = $scope.pictures.slice(4,8);
        $scope.selectedImage = $scope.pictures[0];
    };

    $scope.changePreview = function(image){
        $scope.selectedImage = image;
    };

    $scope.init();
        
}

export default galleryCtrl;