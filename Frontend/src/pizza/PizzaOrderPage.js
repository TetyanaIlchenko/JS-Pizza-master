var $input_name = $('#name');
var $input_phone = $('#number');
var $input_adress = $('#adress');
var $input_name_warning = $('.name-group');
var $input_phone_warning = $('.number-group');
var $input_adress_warning = $('.adress-group');
var $unvalid_name = $('.unvalid-name');
var $unvalid_phone = $('.unvalid-phone');
var $unvalid_adress= $('.unvalid-adress');
var $button = $('#next');
var Storage = require('../../www/Storage');
var API = require('../API');
var LiqPay  = require('../LiqPay');
var OrderList =  [];
OrderList = Storage.get('cart');

  function check(){
    $input_name.bind('input propertychange',function(){
      var value = $input_name.val().trim();
      console.log(value);
    //|| /[^a-zA-Z]/.test(value) || !value.contains(" ")
      if(value === "" ){
          $input_name_warning.removeClass('has-success');
          $input_name_warning.addClass('has-error');
          $unvalid_name.show();
      }
      else{
          $input_name_warning.removeClass('has-error');
          $input_name_warning.addClass('has-success');
          $unvalid_name.hide();

      }
    });

      $input_phone.bind('input propertychange',function(){
          var value = $input_phone.val().trim();
          console.log(value);
          if(value === "" || isNumber(value) === false){
              $input_phone_warning.removeClass('has-success');
              $input_phone_warning.addClass('has-error');
              $unvalid_phone.show();
          }
          else if(isNumber(value) === true){
              $input_phone_warning.removeClass('has-error');
              $input_phone_warning.addClass('has-success');
              $unvalid_phone.hide();

          }
      });



      $input_adress.bind('input propertychange',function(){
          var value = $input_adress.val().trim();
          console.log(value);
          if(value === ""){
              $input_adress_warning.removeClass('has-success');
              $input_adress_warning.addClass('has-warning');
              $unvalid_adress.show();
          }
          else{
              $input_adress_warning.removeClass('has-warning');
              $input_adress_warning.addClass('has-success');
              $unvalid_adress.hide();

          }
      });

}

function sendInf(){
    var information = {
        name: $input_name.val(),
        number: $input_phone.val(),
        adress: $input_adress.val,
        orderList:OrderList
    };
    API.createOrder(information,function(err,res){
        if(err){
            alert("Order failed");
        }
        else{
            console.log("Your order is successful");
            console.log(res.data);
            console.log(res.signature);
           LiqPay.initLiqPay(res.data,res.signature);
        }
    });
}

function isEverythingValid(){
    var name = $input_name.val();
    var adress = $input_adress.val();
    var phone = $input_phone.val();
    if(name === "")return false;
    if(adress === "" ) return false;
    var check = isNumber($input_phone.val());
    if(phone ==="" ||  check === false)return false;
    else return true;

}

function initializePage(){
  check();
  $button.click(function () {
          if(isEverythingValid())
        sendInf();

      });

}

function isNumber(value){
    // if(value.substring(0,2)!= '+380') return false;
    for (i = 0; i <value.length; i++)
        if ( value.charAt(i) != '0' && value.charAt(i) != '1' && value.charAt(i) != '2' && value.charAt(i) != '3' && value.charAt(i) != '4' && value.charAt(i) != '5' && value.charAt(i) != '6' && value.charAt(i) != '7' && value.charAt(i) != '8' && value.charAt(i) != '9' && value.charAt(i) != '+')
            return false;
    return true;

    //   for(i =0;i<3;i++)


}

exports.initializePage = initializePage;