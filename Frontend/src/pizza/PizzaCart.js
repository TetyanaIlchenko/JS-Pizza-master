/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('../../www/Storage');
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

// var $empty = $(empty_html);
//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML елемент куди будуть додаватися піци
var $cart = $("#cart");

var empty_cart = $(".empty-in-fridge").html();

function addToCart(pizza, size) {

    //Додавання однієї піци в кошик покупок
    var i = findPizza(pizza,size);
    if(i!==-1){
        Cart[i].quantity+=1;
    }
    else {
        //Приклад реалізації, можна робити будь-яким іншим способом
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1

        });

    }
    //Оновити вміст кошика на сторінці
    updateCart();
}
function clear(){
    Cart=[];
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    var i = findPizza(cart_item.pizza,cart_item.size);
    if(i !== -1){
        Cart.splice(i,1);

    }
    //Після видалення оновити відображення
    updateCart();
}


function findPizza(pizza,size) {
    var i ;
    for (i=0; i < Cart.length; i++) {
        if (JSON.stringify(Cart[i].pizza) == JSON.stringify(pizza) && size == Cart[i].size)
            return i;
    }
    return -1;
}

function initialiseCart() {
    //Фукнція віпрацьовуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
     $(".clear-order").click(function(){
         clear();
     });


    var PizzaCart = Storage.get('cart');
    if(PizzaCart) {
        Cart = PizzaCart;
    }
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
     var total = 0 ;

    var count=0;

    if(Cart.length === 0){
        $cart.append(empty_cart);
    }

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        // $empty.hide();
        // var x = document.getElementById("empty");
        // x.style.display = "block";
        // if (count==0) {
        //
        // } else {
        //
        // }
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        // $(".empty").hide();

    count +=1;
    // if(count>0) {
    //     x.style.display = "none";
    // }
        // console.log();
        // console.log();


        total += cart_item.quantity * cart_item.pizza[cart_item.size].price;
        var $node = $(html_code);

        $node.find(".plus").click(function(){


            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;


            //Оновлюємо відображення
            updateCart();


        });

        $node.find(".minus").click(function() {
            //Збільшуємо кількість замовлених піц
            if (cart_item.quantity > 0) {

            cart_item.quantity -= 1;

            //Оновлюємо відображення
            updateCart();
        }
        if(cart_item.quantity==0){
                removeFromCart(cart_item);
            updateCart();
        }
        });

        $node.find(".clear-order").click(function(){

           Cart=0;
            // x.style.display = "block";
           // $(".empty").html().show();
            // $(".empty").append("Пусто");
        });
        $node.find(".glyphicon-remove").click(function(){
            // x.style.display = "block";
            removeFromCart(cart_item);
        });
        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    Storage.set('cart',Cart);
     $(".order-sum-title").text(total);
     $(".order-quantity").text(count);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;