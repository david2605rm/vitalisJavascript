//constantes

const contenedorProductos = document.getElementById('contenedorCursos')
const contadorProductos = document.getElementById('contadorProd')
const carritoContenedor = document.getElementById('contenedorCarrito')
const vaciarCart = document.getElementById('vaciar-carrito')

//traer form de busqueda
const formBusqueda = document.getElementById('formBusqueda');
const inputBusqueda = document.getElementById('inputBusqueda');

//variables

let bolsaCompras = [];
let cursos = [];

const baseCursos = '../cursos.json';

//funciones

    //guardar en local storage

    function guardarEnLocal(){
        localStorage.setItem('bolsaCompras', JSON.stringify(bolsaCompras));
    }

    //traer local 

    function cargarLocal(){
        //si el carrito no esta cargado en storage
        if(localStorage.getItem("bolsaCompras") !== null){
                //y si lo esta
            bolsaCompras = JSON.parse(localStorage.getItem("bolsaCompras"));
        }
    }

    //funcion buscadora

    function filtrarCurso(arr, filtro){
        const filtrado = arr.filter((el) =>{
            return el.nombre.includes(filtro);
        });
        return filtrado;
    }

        
    //funcion para pintar los articulos html

    function pintarCursos(cursos) {
        cursos.forEach(curso => {
            const contcurso = document.createElement('div');
            contcurso.classList.add('contenedorCurso');
            contcurso.innerHTML = `
                <div class="card cadaCard" style="width: 18rem;">
                    <img src="${curso.img}" class="card-img-top" alt="${curso.nombre}">
                    <div class="card-body">
                        <h3 class="nombreCursos">${curso.nombre}</h3>
                        <p class="card-text textoDescripcion">${curso.tema}</p>
                        <div class="contPrecio">
                            <p class="card-text">Precio: $${curso.valor}</p>
                            <p class="card-text">Modulos: ${curso.modulos}</p>
                        </div>
                    </div>
                    <div class="contBotonProds">
                        <button class="btn btn-primary botonProductos agregar" data-id="${curso.id}" type="submit">Añadir</button>
                    </div>
                </div>
            `;
    
            contenedorProductos.appendChild(contcurso);
    
            // Agregar listener de evento para añadir al carrito
            const botonesAgregar = document.querySelectorAll('.agregar');
            botonesAgregar.forEach(boton => {
                boton.addEventListener('click', event => {
                    const prodId = event.target.getAttribute('data-id');
                    añadirCarrito(prodId);
                });
            });
        });
    };

    //fetch de los cursos

    fetch(baseCursos)
        .then((resp) => resp.json())
        .then((data) => {
            cursos = data
            pintarCursos(cursos);
        })

    //filtrar productos
formBusqueda.addEventListener('submit', event => {
    event.preventDefault(); 
    const terminoBusqueda = inputBusqueda.value; // Obtiene el valor del input de búsqueda
    const resultadosBusqueda = filtrarCurso(cursos, terminoBusqueda); // Busca los productos que coincidan con el término de búsqueda
    contenedorProductos.innerHTML = '';
    pintarCursos(resultadosBusqueda);
});

    // Función para añadir al carrito
    
    function añadirCarrito(prodId){
        const agregado = bolsaCompras.some (prod => prod.id === prodId);

        if (agregado){
            const prod = bolsaCompras.map (prod => {
                if (prod.id === prodId){
                    prod.cantidad++
                }
            })
        }else{
            const item = cursos.find((prod) => prod.id === prodId);
            bolsaCompras.push(item);
        }

        guardarEnLocal();
        subirCarrito();
    };

    //Elimina los productos del carrito

    function quitarCurso(prodId) {
        const index = bolsaCompras.findIndex(prod => prod.id === prodId);
        bolsaCompras.splice(index, 1);
        subirCarrito();
    };   
        

    const subirCarrito = () => {
        carritoContenedor.innerHTML = ""
            bolsaCompras.forEach(prod => {
                const div = document.createElement('div')
                div.className = ('productoCarrito')
                div.innerHTML = `
                <p>${prod.nombre}</p>
                <p>precio: ${prod.valor}</p>
                <p>modulos: ${prod.modulos}</p>
                <button onclick="quitarProducto(${prod.id})" class="botonProducto">quitar</button>
                `
                carritoContenedor.appendChild(div)
            })
            contadorProductos.innerText = bolsaCompras.length
    };
    
    // eliminar productos
    vaciarCart.addEventListener('click', () => {
        bolsaCompras = []
        guardarEnLocal();
        subirCarrito()
    })


// Cargar del local storage al iniciar
cargarLocal();
subirCarrito(); // Renderizar el carrito al iniciar