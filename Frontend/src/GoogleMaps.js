function	initialize()	{
//Тут починаємо працювати з картою
    varmapProp ={
        center:	new	google.maps.LatLng(50.464379,30.519131),
        zoom:11
    };
    var html_element =	document.getElementById("googleMap");
    varmap	=	new	google.maps.Map(html_element,mapProp);
//Карта створена і показана
}
//Коли сторінка завантажилась
google.maps.event.addDomListener(window,'load',initialize);
exports.initialize = initialize;