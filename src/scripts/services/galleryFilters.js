galleryFiltersService.$inject = [];
function galleryFiltersService() {
    const galleryFilter = 'galleryFilter';
    const filters = ["brows", "lashextension", "lashbotox", "makeup"];
    var galleryFilters = {};

    galleryFilters.setFilter = function(tagName) {
        sessionStorage.setItem(galleryFilter, tagName);
    };

    galleryFilters.getFilter = function() {
        return sessionStorage.getItem(galleryFilter) !== null ? sessionStorage.getItem(galleryFilter) : false;
    };

    galleryFilters.getAllFilters = function(){
        return filters;
    };

    galleryFilters.reset = function(){
        sessionStorage.removeItem(galleryFilter);
    };

    return galleryFilters;
};

export default galleryFiltersService;