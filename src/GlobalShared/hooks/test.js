const cart = {};

let obj = {
    "_id": "61b5684398356e543122d6d3",
    "product_code": "101",
    "bar_code": "",
    "discount": 0,
    "name": "101",
    "sell_price": 690,
    "slug": "1-101",
    "thumbnail": "uploads/product/254670108_596195764913495_591271565788917829_n_product_thumb_thumbnails_841.jpeg"
}

let obj2 = {
    "_id": "61b5684398356e543122d6d",
    "product_code": "101",
    "bar_code": "",
    "discount": 0,
    "name": "101",
    "sell_price": 690,
    "slug": "1-101",
    "thumbnail": "uploads/product/254670108_596195764913495_591271565788917829_n_product_thumb_thumbnails_841.jpeg"
}

function addToDB(product){
    if (product._id in cart){
        cart[product._id].quantity += 1
    }else{
        product.quantity = 1
        cart[product._id] = product
    }
}

addToDB(obj)
addToDB(obj)
addToDB(obj2)

let cartArray = Object.values(cart)

console.log(cart);
console.log(cartArray);
