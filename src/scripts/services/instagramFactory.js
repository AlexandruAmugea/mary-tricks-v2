instagramService.$inject = ['$http', 'instagramSearchDataService'];
function instagramService($http, instagramSearchDataService) {

    var instagramFactory = {};

    instagramFactory.getUserById = function (_params) {

        var instagramSearchData = instagramSearchDataService.getNew("userById", _params);

        return $http.jsonp(
            instagramSearchData.url,
            {
                method: 'GET',
                params: instagramSearchData.object,
            }
        );
    };

    instagramFactory.getMediaFromUserById = function (_params) {

        var instagramSearchData = instagramSearchDataService.getNew("mediaFromUserById", _params);

        return $http.jsonp(
            instagramSearchData.url,
            {
                method: 'GET',
                params: instagramSearchData.object,
            }
        );
    };

    instagramFactory.getMediaByTag = function (_params) {

        var instagramSearchData = instagramSearchDataService.getNew("mediaByTag", _params);

        return $http.jsonp(
            instagramSearchData.url,
            {
                method: 'GET',
                params: instagramSearchData.object,
            }
        );
    };

    instagramFactory.getMediaFromLocationById = function (_params) {

        var instagramSearchData = instagramSearchDataService.getNew("mediaFromLocationById", _params);

        return $http.jsonp(
            instagramSearchData.url,
            {
                method: 'GET',
                params: instagramSearchData.object,
            }
        );
    };

    instagramFactory.getMediaByCoordinates= function (_params) {

        var instagramSearchData = instagramSearchDataService.getNew("mediaByCoordinates", _params);

        return $http.jsonp(
            instagramSearchData.url,
            {
                method: 'GET',
                params: instagramSearchData.object,
            }
        );
    };

    return instagramFactory;
};

export default instagramService;