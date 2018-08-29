import KEYS from '../const/const';
const viewSliderInstaFeed = require('raw-loader!../views/sliderInstaFeed.html');

directiveFunction.$inject = ['instagramService', '$scope'];
function directiveFunction (instagramService, $scope) {
    instagramService.getMediaFromUserById({
        userId: KEYS.instagramUser,
        access_token: KEYS.instagramToken,
    }).then(function(_data){
        $scope.picturesArray = [];
        _data.data.data.forEach(function(elem){
            $scope.picturesArray.push(elem);
        });
        $scope.pictures = $scope.picturesArray.slice(0,8);
    });
};

function sliderInstaFeed() {
    return {
        scope: {},
        restrict: "AE",
        template: viewSliderInstaFeed,
        controller: directiveFunction
    };
};

export default sliderInstaFeed;