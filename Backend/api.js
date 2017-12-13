/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var crypto	=	require('crypto');
exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    var total = totalOrder(order_info.orderList);

    var order = {
        version:3,
        public_key: 'i75728623858',
        action:	"pay",
        amount:	total,
        currency:"UAH",
        description:toString(order_info,total),
        order_id:	Math.random(),
        //!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
        sandbox:1
    };

    var data = new Buffer(JSON.stringify(order)).toString('base64');
    console.log(data);
    var signature =	shal('zpAw782vAo6rOpYZ3mOxBVBh3CpOGELgXxYK2rPn'	+ data	+ 'zpAw782vAo6rOpYZ3mOxBVBh3CpOGELgXxYK2rPn');
    console.log(signature);

    res.send({
        // success: true
        data:data,
        signature:signature
    });
};
function shal(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return	sha1.digest('base64');
}

function toString(order,total){
    //!!!!!Дописати замовлення
    return 'Ім’я: ' + order.name + ' Адреса: '+ order.adress + ' Телефон: ' + order.number +' Замовлення: '+ toStringPizza(order.orderList) + ' Сума:'+ total;
}


function totalOrder(order_list){
    var total = 0;
    order_list.forEach(function(order){
        total+= order.pizza[order.size].price*order.quantity;
    });
    return total;
}

function toStringPizza(order_list) {
    var string = '';
    var size = {
        small_size:'[Мала]',
        big_size:'[Велика]'
    }
    order_list.forEach(function(order){
        string +=order.quantity  + ' шт ' + size[order.size] + order.pizza.title;
    });
    return string;
}