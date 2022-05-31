let mcd = [];
let Food = function (name,image) {
    if(name =='' || image == '') return;
    this.id = mcd.length;
    this.name = name;
    this.image = image;
    mcd.push(this);
    localStorage.setItem('mcd', JSON.stringify(mcd));
}
new Food('Spicy Crispy Chicken Sandwich','https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-spicy-crispy-chicken-sandwich:1-4-product-tile-desktop');
new Food('Big Mac', 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Big-Mac-1:1-4-product-tile-desktop');
new Food('Chicken McNuggets','https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Chicken-McNuggets-4pc-1:1-4-product-tile-desktop');
new Food('World Famous Fries','https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-fries-small:1-4-product-tile-desktop');
new Food('Egg McMuffin', 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Egg-McMuffin-1:1-4-product-tile-desktop');
new Food('Sausage Burrito', 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-Burrito-1:1-4-product-tile-desktop');
new Food('Iced Coffee','https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Premium-Roast-Iced-Coffee-Medium:1-4-product-tile-desktop')

mcd.forEach(function (el) {
    // console.log(el);
    let productsDiv = document.getElementById('productsDiv');
    let col = document.createElement('div')
    col.classList = 'col m-1 mx-auto d-flex';
    let div = document.createElement('div');
    div.classList = 'btn-group mx-auto align-items-center';
    div.setAttribute('role','group');
    let input = document.createElement('input');
    input.classList='btn-check';
    input.type = 'checkbox';
    input.id = el.id;
    let label = document.createElement('label');
    label.setAttribute('for',el.id);
    label.classList= 'btn btn-outline-primary'
    label.innerText = el.name;
    div.append(input,label);
    col.append(div);
    productsDiv.append(col);
});

let order = document.getElementById('order');
order.addEventListener('click', function () {
    placeOrder();
});

function placeOrder() {
    let orderArr = [];
    mcd.forEach(function (el) {
        let item = document.getElementById(el.id);
        // console.log(item.checked);
        if(item.checked) {
            orderArr.push(el);
        }
    });
    if(orderArr.length > 0) {
        let myPromise = new Promise (function (resolve, rejecr) {
            let completed = completeOrder();
            if(completed) {
                let orderImages = document.getElementById('orderImages');
                orderImages.innerHTML = null;
                let col = document.createElement('div');
                col.classList = 'col-3 mx-auto d-flex flex-column';
                let img = document.createElement('img');
                img.classList = 'w-50 mx-auto';
                img.src = 'https://i.giphy.com/media/l3nWhI38IWDofyDrW/200w.webp';
                let p = document.createElement('p');
                p.classList = 'text-center mx-auto';
                p.innerText = `We're preparing your order!`;
                col.append(img,p);
                orderImages.append(col);
                let time = Math.random() * 10000;
                setTimeout(function () {
                    resolve('Order Ready');
                }, time);
            }
            else {
                rejecr('Some error occured');
            }
        });
        myPromise.then(function() {
            let orderNumber = document.getElementById('orderNumber');
            let prevOrder = JSON.parse(localStorage.getItem('orderNumber')) || {orderNumber:0};
            prevOrder.orderNumber++;
            let currentOrder = prevOrder;
            localStorage.setItem('orderNumber',JSON.stringify(currentOrder));
            orderNumber.innerText = `Order Number : ${currentOrder.orderNumber}`;

            let orderImages = document.getElementById('orderImages');
            orderImages.innerHTML = null;
            orderArr.forEach(function (el) {
                let col = document.createElement('div');
                col.classList = 'col-3 mx-auto d-flex flex-column';
                let img = document.createElement('img');
                img.classList = 'w-50 mx-auto';
                img.src = el.image;
                let p = document.createElement('p');
                p.classList = 'text-center mx-auto';
                p.innerText = el.name;
                col.append(img,p);
                orderImages.append(col);
            });
        })
    }
    else {
        alert('Please select at least 1 item');
    }
}
function completeOrder() {
    return true;
}