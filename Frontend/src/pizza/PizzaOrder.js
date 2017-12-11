var Templates = require('../Templates');
var Storage = require('../../www/Storage');
var Cart = [];

//HTML елемент куди будуть додаватися піци
var $cart = $("#cart_order");

function initialiseOrderCart() {
    //Фукнція віпрацьовуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    var PizzaCart = Storage.get('cart');
    if(PizzaCart) {
        Cart = PizzaCart;
    }
    updateCart();
}


function getPizzaInCartOrder() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}
function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
     $cart.html("");


    //if (Cart.length === 0) {
      //  $cart.append(empty_cart);
    //}

    //Онволення однієї піци
    function showOnePizzaInCartOrder(cart_item) {

        var html_code = Templates.PizzaCart_OneOrderItem(cart_item);

        var $node = $(html_code);

        $cart.append($node);
    }
    Cart.forEach(showOnePizzaInCartOrder);
     // Storage.set('cart',Cart);
}
// exports.getPizzaInCartOrder = getPizzaInCartOrder;
exports.initialiseOrderCart = initialiseOrderCart;
