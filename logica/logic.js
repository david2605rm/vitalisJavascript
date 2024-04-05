//constantes

const contenedorProductos = document.getElementById('contenedorCursos')
const contadorProductos = document.getElementById('contadorProd')
const carritoContenedor = document.getElementById('contenedorCarrito')

//traer form de busqueda
const formBusqueda = document.getElementById('formBusqueda');
const inputBusqueda = document.getElementById('inputBusqueda');

//variables

let bolsaCompras = []
let baseCursos = ['../cursos.json']

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

    fetch(baseCursos)
    .then((resp) => resp.json())
    .then((cursos)=>{

        cursos.forEach((curso) => {
            const contcurso = document.createElement('div')
            contcurso.classList.add('contenedorCurso')
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
                    <button class="btn btn-primary botonProductos" id="agregar${curso.id}" type="submit">Añadir</button>
                </div>
            </div>
        `

            contenedorProductos.appendChild(contcurso)

            const botonCart = document.getElementById(`agregar${curso.id}`)
            botonCart.addEventListener('click', () => {

                añadirCarrito(curso.id)
                
            });
        });
    });
    
    cargarLocal();

    // Función para añadir al carrito
    
const añadirCarrito = (prodId) => {
    const agregado = bolsaCompras.some (prod => prod.id === prodId)

        fetch(baseCursos)
        .then((resp) => resp.json())
        .then((cursos)=>{

            if (agregado){
                const prod = bolsaCompras.map (prod => {
                    if(prod.id === prodId){
                        prod.cantidad++
                    }
                })
            }else{
                const items = cursos.find((prod) => prod.id === prodId)
                bolsaCompras.push(items)
                console.log(bolsaCompras)
            }
            guardarEnLocal()
            subirCarrito()
        })

        //Elimina los productos del carrito

        const quitarCurso = (prodId) => {
            const items = bolsaCompras.find((prod) => prod.id === prodId)
            const indice = bolsaCompras.indexOf(items)
            bolsaCompras.splice(indice, 1)

            subirCarrito()    
        }

    const subirCarrito = () => {
            carritoContenedor.innerHTML = ""
                bolsaCompras.forEach((prod) => {
                    const divCarrito = document.createElement('div')
                    divCarrito.className = ('contenedorBolsa')
                    divCarrito.innerHTML = `
                    <div class="card cadaCard" style="width: 18rem;">
                        <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}">
                        <div class="card-body">
                            <h3 class="nombreCursos">${prod.nombre}</h3>
                            <p class="card-text textoDescripcion">${prod.tema}</p>
                            <div class="contPrecio">
                                <p class="card-text">Precio: $${prod.valor}</p>
                                <p class="card-text">Modulos: ${prod.modulos}</p>
                            </div>
                            <div class="contPrecio">
                                <button onClick = "quitarCurso(${prod.id})" class="btn btn-primary botonProductos" id="agregar${prod.id}" type="submit">Eliminar</button>
                            </div>
                        </div>
                    </div>
                    `
                carritoContenedor.appendChild(divCarrito)
            })
        contadorProductos.innerText = bolsaCompras.length
        
    }; 
};

    //filtrar productos
formBusqueda.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const terminoBusqueda = inputBusqueda.value; // Obtiene el valor del input de búsqueda
        const resultadosBusqueda = filtrarCurso(cursos, terminoBusqueda); // Busca los productos que coincidan con el término de búsqueda
    
        contenedorProductos(resultadosBusqueda)
    });

cargarLocal();