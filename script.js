let cart = [];

// отображение продуктов
for (let item of shopItems) {
    makeCard(item);
}

// создание карты продукта
function makeCard(object) {
    let card = document.createElement('div');
    card.classList.add('card');
    let img = document.createElement('img');
    img.src = object.img;
    card.append(img);

    let cardBottom = document.createElement('div');
    cardBottom.classList.add('card-bottom');

    let title = document.createElement('div');
    title.classList.add('title');

    let p = document.createElement('p');
    p.innerText = object.name;
    let span = document.createElement('span');
    span.innerText = object.cost + ' $'

    let button = document.createElement('button');
    button.innerText = 'Добавить в корзину';
    button.addEventListener('click', function() {
        addToCart(object);
    });

    title.append(p);
    title.append(span);
    cardBottom.append(title);
    cardBottom.append(button);
    card.append(cardBottom);

    document.querySelector('.products').append(card);
}


function addToCart(object) {
    let item = cart.find(value => {return value.id == object.id});
    if ( item ) {
        item.quantity += 1;
    } else {
        let cartItem = {
            id: object.id,
            quantity: 1
        }
        cart.push(cartItem);
    }
    renderCart();
}

function removeFromCart(id) {
    let cartItem = cart.filter(value => value.id == id)[0];
    if (cartItem.quantity == 1) {
        let index = cart.indexOf(cartItem);
        cart.splice(index, 1);
    } else {
        cartItem.quantity -= 1;
    }
    renderCart();
}

// обновление корзины
function renderCart() {
    let items = document.querySelector('.items');
    items.innerHTML = '';
    for (let elem of cart) {
        let cartItem = shopItems.find(
            value => {return value.id == elem.id}
        ); // по id элемента корзины ищем товар в базе

        let item = document.createElement('div'); //создаем элементы корзины
        item.classList.add('item');

        let remove = document.createElement('button');
        remove.classList.add('remove');
        remove.innerHTML = '&mdash;';
        remove.addEventListener('click', function() {
            removeFromCart(elem.id);
        });
        item.append(remove);

        let img = document.createElement('img');
        img.src = cartItem.img;
        item.append(img);

        let itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');

        let p = document.createElement('p');
        p.innerText = cartItem.name;
        let span = document.createElement('span');
        span.innerText = cartItem.cost + ' $';

        itemInfo.append(p);
        itemInfo.append(span);
        item.append(itemInfo);

        span = document.createElement('span');
        span.innerText = 'x' + elem.quantity;
        item.append(span);

        items.append(item);
    }
    //обновление общей стоимости корзины
    let price = document.querySelector('.summary');
    let total = 0;
    for (let i of cart) {
        let shopItem = shopItems.find(
            value => {return value.id == i.id}
        );
        total += i.quantity * shopItem.cost;
    }
    price.innerText = total + ' $';
}
