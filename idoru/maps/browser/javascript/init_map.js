/*
    Shows Google Maps div to choose the location
    by bluszcz@bluszcz.net

    Some parts of code have been taken from Google Maps API v3 Documentation.
*/

jQuery(document).ready(function() 
{
    var view_function = 'none';
    if ($('input[name=latitude]').length > 0)
    {
        var view_function = 'edit'; 
    } else if ($('#plone-document-byline').length > 0)
    {
        var view_function = 'view';
    }; 

    alert(view_function);    

    function drawMarker(map, mlocation)
    {
        if (view_function=='edit')
        {        
            $('input[name=longitude]').val(mlocation.lng());
            $('input[name=latitude]').val(mlocation.lat());
        };
        marker = new google.maps.Marker({
            position: mlocation,
            map: map,
            title:""
        });
    };

    function updateMarker(mlocation)
    {
        marker.setPosition(mlocation);
        if (view_function=='edit')
        {
            $('input[name=longitude]').val(mlocation.lng());
            $('input[name=latitude]').val(mlocation.lat());
        }
    };

    if (view_function!='none')
    {
        if (view_function=='edit')
        {
            $('input[name=longitude]').after('<div id="field_map" class="field">');
        } else if  (view_function=='view') 
        {
            $('#plone-document-byline').after('<div id="field_map" class="field">');
        };
            
        $('#field_map').append('<div id="idoru_edit_map_canvas" style="position: relative;  height: 480px" >');
        function initialize() 
        {
    
            var initialLocation;
            var siberia = new google.maps.LatLng(60, 105);
            var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
            var browserSupportFlag =  new Boolean();

            var latlng = new google.maps.LatLng(-34.397, 150.644);
            var myOptions = {
                  zoom: 15,
                  center: latlng,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("idoru_edit_map_canvas"), myOptions);

            if (view_function=='edit') 
            {
                // Try W3C Geolocation (Preferred)
                if(navigator.geolocation) 
                {
                    browserSupportFlag = true;
                    navigator.geolocation.getCurrentPosition(function(position) 
                    {
                        initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                        map.setCenter(initialLocation);
                        drawMarker(map, initialLocation);
                    }, function() 
                    {
                        handleNoGeolocation(browserSupportFlag);
                    });
              // Try Google Gears Geolocation
                } else if (google.gears) 
                {
                    browserSupportFlag = true;
                    var geo = google.gears.factory.create('beta.geolocation');
                    geo.getCurrentPosition(function(position) 
                    {
                        initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
                        map.setCenter(initialLocation);
                    }, function() 
                    {
                        handleNoGeoLocation(browserSupportFlag);
                    });
              // Browser doesn't support Geolocation
                } else 
                {
                    browserSupportFlag = false;
                    handleNoGeolocation(browserSupportFlag);
                }
              
                function handleNoGeolocation(errorFlag) 
                {
                    if (errorFlag == true) 
                    {
                        alert("Geolocation service failed.");
                        initialLocation = newyork;
                    } else 
                    {
                        alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
                        initialLocation = siberia;
                    }
                    map.setCenter(initialLocation);
                };
                google.maps.event.addListener(map, 'click', function(event) 
                {
                    updateMarker(event.latLng);
                });
            };
            
            if (view_function=='view') 
            {
                var initialMarkerLocation = new google.maps.LatLng($('#parent-fieldname-latitude').text(), $('#parent-fieldname-longitude').text());
                drawMarker(map, initialMarkerLocation);
                map.setCenter(initialMarkerLocation);
            };
        }
    initialize();
    };
});
