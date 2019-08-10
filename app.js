class Product {

    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }


}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Producto:</strong> ${product.name}
                <strong>Precio: </strong> ${product.price}
                <strong>Año: </strong> ${product.year}
                <a class="btn btn-danger" name="delete">Del</a>
            </div>
        </div>`;
        productList.appendChild(element);
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Se borró correctamente el producto', 'danger');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass}`;
        div.appendChild(document.createTextNode(message));
        //mostrando en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');

        //insertar contenido de div dentro de container pero antes de app
        container.insertBefore(div, app);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }
}

//DOM events
//con addEventListener podemos capturar muchos eventos del formulario "product-form", en este caso el evento submit
document.getElementById('product-form').addEventListener('submit', function (e) {
    var product = new Product();

    product.name = document.getElementById('name').value;
    product.price = document.getElementById('price').value;
    product.year = document.getElementById('year').value;


    // cancelamos el comportamiento de submit del formulario

    const ui = new UI();

    if (product.name === '' || product.price === '' || product.year === '') {
        ui.showMessage('Complete los campos por favor', 'danger');
    } else {
        ui.addProduct(product);

        ui.resetForm();

        ui.showMessage('Producto agregado correctamente', 'success');
    }



    e.preventDefault();
    // console.log(product);

});

document.getElementById('product-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
});