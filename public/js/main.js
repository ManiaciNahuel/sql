let socket = io.connect();

socket.on('productos', function(data) {
    console.log(data);
    render_products(data);
});

socket.on('messages', function(data) {
    console.log(data);
    render_messages(data);
});

function render_products(data) {
    console.log("We trying");
    let html = data.map(function(product, index) {
        return (`<div>
            <article style="margin-bottom: 40px">
                    <img style="width: 90px; " src=${product.imagen} />
                    <h3>
                        ${product.title}
                    </h3>
                    <p>$
                        ${product.price}
                    </p>
                </article>
                <br>
            `)
    }).join(" ");
    document.getElementById('product_container').innerHTML = html;
}

function render_messages(data) {
    let html = data.map(function(elem, index) {
        return (`<div>
            <strong style="color:blue">${elem.author}</strong>
            <span style="color:brown">${elem.time}:</span> 
            <em style="color:green">${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages_container').innerHTML = html;
}


function addMessage(today) {
    const now = today.toLocaleString()
    let mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        time: now
    };
    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
}

function addProduct() {
    let product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        imagen: document.getElementById('imagen').value
    };
    console.log(product);
    socket.emit('new-product', product);

    document.getElementById('title').value = ''
    document.getElementById('price').value = ''
    document.getElementById('imagen').value = ''

    return false;
}