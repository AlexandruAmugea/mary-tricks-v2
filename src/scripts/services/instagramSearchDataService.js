function instagramSearchDataService() {
    this.getApiBaseUrl = function (_params) {
        return "https://api.instagram.com/v1/";
    };

    this.fillDataInObjectByList = function(_object, _params, _list) {

        angular.forEach(_list, function (value, key) {
            if(angular.isDefined(_params[value])) {
                _object.object[value] = _params[value];
            }
        });

        return _object;
    };

    this.getNew = function (_type, _params) {

        var instagramSearchData = {
            object: {
                access_token: _params.access_token,
                callback: "JSON_CALLBACK"
            },
            url: "",
        };

        if(angular.isDefined(_params.count)) {
            instagramSearchData.object.count = _params.count;
        }

        switch (_type) {
            case "userById":
                instagramSearchData.object.count = undefined;
                instagramSearchData.url = this.getApiBaseUrl()+"users/" + _params.userId;
                break;

            case "mediaFromUserById":
                instagramSearchData = this.fillDataInObjectByList(instagramSearchData, _params, [
                    'max_id', 'min_id', 'min_timestamp', 'max_timestamp'
                ]);
                instagramSearchData.url = this.getApiBaseUrl()+"users/" + _params.userId + "/media/recent";
                break;

            case "mediaByTag":
                instagramSearchData = this.fillDataInObjectByList(instagramSearchData, _params, [
                    'max_tag_id', 'min_tag_id', 'min_timestamp', 'max_timestamp'
                ]);
                instagramSearchData.url = this.getApiBaseUrl()+"tags/" + _params.tag + "/media/recent";
                break;

            case "mediaFromLocationById":
                instagramSearchData = this.fillDataInObjectByList(instagramSearchData, _params, [
                    'max_id', 'min_id', 'min_timestamp', 'max_timestamp'
                ]);
                instagramSearchData.url = this.getApiBaseUrl()+"locations/" + _params.locationId + "/media/recent";
                break;

            case "mediaByCoordinates":
                instagramSearchData = this.fillDataInObjectByList(instagramSearchData, _params, [
                    'lat', 'lng', 'distance', 'min_timestamp', 'max_timestamp'
                ]);
                instagramSearchData.url = this.getApiBaseUrl()+"media/search";
                break;
        }
        return instagramSearchData;
    };
};

export default instagramSearchDataService;