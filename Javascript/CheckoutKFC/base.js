const items = [
    {
        name : 'pizza 001',
        price : 6.91,
        quantity: 2
    },
    {
        name : 'pizza 002',
        price : 7.91,
        quantity:1
    }
]

function add() {
    items.push({
        name : `Pizza ${(Math.random() * 10).toFixed(2)}`,
        price : (Math.random() * 10).toFixed(2),
        quantity :1
    })
    
    render();
}

const btnAdd = document.querySelector('#btn-add');
btnAdd.addEventListener('click' , () => {
    add();
})

function remove(index) {
    items.splice(index , 1);
    render();
}

function updateQuantity (index , quantity) {
    if(quantity < 1) {
        return;
    }

    items[index].quantity = quantity;
    render();
}

const SHIPPING = 2;

function render () {
    let subToTal = 0;

    items.forEach((item) => {
        subToTal += item.quantity * item.price;
    })
    const Total = subToTal + SHIPPING;

    const html = items.map ((item) => `
        <li class="food-item">
        <span class="food--name">${item.name}</span>
        <span class="quantity-span">
            <button id="reduce" class="icon">-</button>
            <p id="Quantity" class="quantity">${item.quantity}</p>
            <button id="add" class="icon" >+</button>
        </span>
        <span class="price-span">
            <p class="price">${item.price}</p>
            <button id="remove" class="icon">X</button>
        </span>
    </li>`
    ).join('');
    document.querySelector('.food').innerHTML = html;

    const deleteButtons = [...document.querySelectorAll('#remove')];
    const reduceButtons = [...document.querySelectorAll('#reduce')];
    const addButtons = [...document.querySelectorAll('#add')];
    for(let i=0;i<deleteButtons.length ; i++) {
        reduceButtons[i].addEventListener('click' , () => {
            updateQuantity(i , items[i].quantity - 1);
        })
        addButtons[i].addEventListener('click' , () => {
            updateQuantity(i , items[i].quantity + 1);
        })
        deleteButtons[i].addEventListener('click' , () => {
            remove(i);
        })
    }

    document.querySelector('#Subtotal').innerText = `$${subToTal.toFixed(2)}`;
    document.querySelector('#shipping').innerText = `$${SHIPPING}`;
    document.querySelector('#Total').innerText = `$${Total.toFixed(2)}`;
}

render();
