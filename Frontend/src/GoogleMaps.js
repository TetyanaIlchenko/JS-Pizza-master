
var $input_adress = $('#adress');
var $time_order = $('#time');
var $adress_order = $('#adress-order');

function	initialize()	{
//Тут починаємо працювати з картою
    var mapProp ={
        center:	new	google.maps.LatLng(50.464379,30.519131),
        zoom:11
    };
    var html_element = document.getElementById("map");
    var map	= new google.maps.Map(html_element,mapProp);
    //Карта створена і показана

    var directionService =	new	google.maps.DirectionsService();
   // var directionDisplay = new google.maps.DirectionRenderer(map);
    var point =	new	google.maps.LatLng(50.464379,30.519131);
    var marker = new google.maps.Marker({
        position:	point,
        map:map,
        icon:"assets/images/map-icon.png"
});

    var building = new google.maps.Marker ({
        map:null,
        position:null,
        image:"assets/images/home-icon.png"
    });
    $input_adress.bind('input propertychange',function(){
        var adress = $input_adress.val();
        $adress_order.text(adress);
        geocodeAddress(adress,function(err,coordinates){
            if(!err){
                putMarker(coordinates,building,map);
                calculateRoute(directionService,point,coordinates,time)
            }
        });

    });

    function time (err,res){
        if(err)
            $time_order.text("невідомий");
        else{
            var computedTime = res.response.routes[0].legs[0].duration.text;
            $time_order.text(computedTime);
        }
    }

    // google.maps.event.addListener(map,'click',function(me){
    //         var coordinates	=	me.latLng;
    //     //coordinates	- такий самий об’єкт як створений new
    //      //   google.maps.LatLng(...)
    //     });

    function putMarker(coordinates,building,map){
        building.setPosition(coordinates);
        building.setMap(map);
    }


    google.maps.event.addListener(map, 'click',function(me){
            var coordinates	= me.latLng;
            putMarker(coordinates,building,map);
            geocodeLatLng(coordinates,function(err,adress){
                if(!err){
                   $input_adress.val(adress);
                    $adress_order.text(adress);
                   // console.log(adress);
                }	else{
                    $input_adress.val(err.message);
                    console.log("Немає адреси")
                }
            })
        calculateRoute(directionService,point,coordinates,time);
        });
}

    function geocodeAddress(adress,callback)	{
        var geocoder =	new	google.maps.Geocoder();
        geocoder.geocode({
            'address':adress},function(results,status)	{
            if	(status	===	google.maps.GeocoderStatus.OK&&	results[0])	{
                var coordinates	= results[0].geometry.location;
                callback(null,coordinates);
            }	else	{
                callback(new Error("Can	not	find the adress"));
            }
        });
    }

    function	geocodeLatLng(latlng,callback){
    //Модуль за роботу з адресою
        var geocoder =	new	google.maps.Geocoder();
        geocoder.geocode({'location':latlng},function(results,status)	{
            if	(status	===	google.maps.GeocoderStatus.OK&&	results[1])	{
                var adress = results[1].formatted_address;
                callback(null,adress);
            }	else {
                callback(new Error("Can't find	adress"));
            }
        });
    }

    function calculateRoute(directionService ,A_latlng, B_latlng,callback)	{

        directionService.route({
            origin:	A_latlng,
            destination:B_latlng,
            travelMode:	google.maps.TravelMode["DRIVING"]
        },	function(response,status)	{
            if	(status	==	google.maps.DirectionsStatus.OK )	{
                var leg = response.routes[0].legs[0];
                callback(null,{
                    duration:leg.duration
                });
            }	else{
                callback(new Error("Can'not	find direction"));
            }
        });
    }





//Коли сторінка завантажилась
google.maps.event.addDomListener(window,'load',initialize);

exports.initialize = initialize;