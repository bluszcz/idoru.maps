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
        var elem = '#plone-document-byline';
    } else if ($('#parent-fieldname-title').length >0)
    {
        var view_function = 'view';
        var elem = '#parent-fieldname-title';
    };  

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
            $(elem).after('<div id="field_map" class="field">');
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
                if (($('input[name=longitude]').val()=='') && ($('input[name=latitude]').val()==''))
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
                } else 
                {
                    var currentLocation = new google.maps.LatLng($('input[name=latitude]').val(),$('input[name=longitude]').val());
                    drawMarker(map, currentLocation);
                    map.setCenter(currentLocation);
                    
                };
                google.maps.event.addListener(map, 'click', function(event) 
                {
                    updateMarker(event.latLng);
                });
            };
            
            if (view_function=='view') 
            {
                var ll = $("meta[name=geo.position]").attr('content').split(';')

                var initialMarkerLocation = new google.maps.LatLng(ll[0],ll[1] );
                drawMarker(map, initialMarkerLocation);
                map.setCenter(initialMarkerLocation);
            };
        }
    initialize();
    };
});
