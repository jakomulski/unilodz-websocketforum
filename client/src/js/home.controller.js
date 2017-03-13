angular
    .module('app')
    .controller('HomeController', ['$scope', function ($scope) {
        $scope.images = [];
        for(var i=0; i<10; ++i){
        $scope.images.push({ src:'http://www.karenbrown.com/wp-content/uploads/2015/05/CIMG_384_MAIN_Photo2.jpg', opacity: Math.random()});
        $scope.images.push({src:'http://www.karenbrown.com/wp-content/uploads/2015/05/CIMG_384_MAIN_Photo3.jpg', opacity: Math.random()});
        $scope.images.push({src:'http://www.karenbrown.com/wp-content/uploads/2015/05/CIMG_384_MAIN_Photo4.jpg', opacity: Math.random()});
        $scope.images.push({src:'http://www.karenbrown.com/wp-content/uploads/2015/02/NE-cover2BANNER1-150x150.jpg', opacity: Math.random()});
        $scope.images.push({src:'http://www.karenbrown.com/wp-content/uploads/2015/03/banner-FR-provence-poppie-fields-photo-Vincent-Brassinne-150x150.jpg', opacity: Math.random()});
        $scope.images.push({src:'http://www.karenbrown.com/wp-content/uploads/2015/01/banner-FR-Languedoc-Roussillon-photo-ricko800-150x150.jpg', opacity: Math.random()});
        }
    }]);