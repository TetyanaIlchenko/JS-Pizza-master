/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var API = require('../API');
// var Pizza_List = require('../Pizza_List');
var Pizza_List = [];
//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");


function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }


    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    var pizza_shown = [];


    Pizza_List.forEach(function(pizza){
        var total = 0;
        if(filter === "all-pizzas"){
            pizza_shown.push(pizza);
            $(".count-title").text("Усі піци");
            $(".pizza-count").text("8");
        }

        else  if(filter === "meat") {
            if (pizza.content.meat || pizza.content.chicken) {
                pizza_shown.push(pizza);
                $(".count-title").text("М’ясні піци");
                $(".pizza-count").text("5");
            }
        }
        else  if(filter === "pineapple"){
            if(pizza.content.pineapple){
                pizza_shown.push(pizza);
                $(".count-title").text("Піци з ананасами");
                $(".pizza-count").text("3");

            }
        }
        else   if(filter === "mushroom"){
            if(pizza.content.mushroom){
                pizza_shown.push(pizza);
                $(".count-title").text("Піци з грибами");
                $(".pizza-count").text("3");

            }
        }
        else   if(filter === "ocean"){
            if(pizza.content.ocean){
                pizza_shown.push(pizza);
                $(".count-title").text("Піци з морепродуктами");
                $(".pizza-count").text("2");

            }
        }
        else if(filter === "vega"){
            if(pizza.type === "Вега піца"){
                pizza_shown.push(pizza);
                $(".count-title").text("Вегетаріанські піци");
                $(".pizza-count").text("1");

            }
        }
    });
    showPizzaList(pizza_shown);
}

function initializeFilters(){

    $('#filter-button-all-pizza').click(function(){
        filterPizza("all-pizzas");

        // showPizzaList(pizza_shown);
    });
    $('#filter-button-meat').click(function(){

        filterPizza("meat");


    });
    $('#filter-button-pineapples').click(function(){
        filterPizza("pineapple");
    });
    $('#filter-button-mushrooms').click(function(){
        filterPizza("mushroom");
    });
    $('#filter-button-ocean').click(function(){
        filterPizza("ocean");
    });
    $('#filter-button-tomato').click(function(){
        filterPizza("vega");
    });

}

function initialiseMenu() {
    //Показуємо усі піци
    API.getPizzaList(function(err,list){
        if(err){
            alert(err.message);
        }
        else{
            Pizza_List=list;
            showPizzaList(Pizza_List);
            initializeFilters();
        }
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;