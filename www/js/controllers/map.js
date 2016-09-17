/**********************************
 * [CONTROLLER] MAP
 *********************************/

app.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  $scope.located = false;
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
 
    // Position coordinates
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    // Define options
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    // Create the map
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.located = true;

    // Adding marker current position
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
    });
  }, function(error){
    alert("Could not get location");
  });
});