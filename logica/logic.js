
//constantes
const cursos = [
    {   id: 1, 
        nombre: "crisis digestiva", 
        tema: "salir de crisis digestiva", 
        modulos: 3,
        img: "../imagenes/imagenes-cursos/port-crisis.svg",
        profesora: "Maria Ramirez",
        valor: 27
    },
    {   
        id: 2, 
        nombre: "Reset desinflamatorio", 
        tema: "Detox de tu cuerpo", 
        modulos: 7,
        img: "../imagenes/imagenes-cursos/port-reset.svg",
        profesora: "Maria Ramirez",
        valor: 117
    },
    {   
        id: 3, 
        nombre: "Consulta 1 a 1", 
        tema: "consulta personalizada para diagnostico", 
        modulos: 5,
        img: "../imagenes/imagenes-cursos/port-consulta.svg",
        profesora: "Maria Ramirez",
        valor: 97
    },
    {   
        id: 4, 
        nombre: "Peso estancado", 
        tema: "Salir del peso estancado", 
        modulos: 6,
        img: "../imagenes/imagenes-cursos/port-peso.svg",
        profesora: "Maria Ramirez",
        valor: 77
    },
    {   
        id: 5, 
        nombre: "Revive tu microbiota", 
        tema: "Reconstruir tu microbiota", 
        modulos: 4,
        img: "../imagenes/imagenes-cursos/port-microbiota.svg",
        profesora: "Maria Ramirez",
        valor: 57
    },
    {   
        id: 6, 
        nombre: "Programa vip", 
        tema: "Principales cursos de Vitalis Academy", 
        modulos: 16,
        img: "../imagenes/imagenes-cursos/port-vip.svg",
        profesora: "Maria Ramirez",
        valor: 227
    }
]

const contenedorProductos = document.getElementById('contenedorCursos')

const contadorProductos = document.getElementById('contadorProd')

const carritoContenedor = document.getElementById('contenedorCarrito')

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

    // funcion para añadir al carrito

    const añadirCarrito = (prodId) => {

        /* parte para subir al carrito */

        const subirCarrito = () =>{
            carritoContenedor.innerHTML = ""
                bolsaCompras.forEach((prod) => {
                    const divCarrito = document.createElement('div')
                    divCarrito.className = ('contenedorBolsa')
                    divCarrito.innerHTML = `
                    <div class="card cadaCard" style="width: 18rem;">
                        <img src="${elem.img}" class="card-img-top" alt="${elem.nombre}">
                        <div class="card-body">
                            <h3 class="nombreCursos">${elem.nombre}</h3>
                            <p class="card-text textoDescripcion">${elem.tema}</p>
                            <div class="contPrecio">
                                <p class="card-text">Precio: $${elem.valor}</p>
                                <p class="card-text">Modulos: ${elem.modulos}</p>
                            </div>
                        
                        </div>
                    </div>
                    `
                    carritoContenedor.appendChild(divCarrito)
                })
            contadorProductos.innerText = bolsaCompras.length
        }



        /* parte para validar si esta en el carrito */
        const agregado = bolsaCompras.some (prod => prod.id === prodId)

            if (agregado){
                bolsaCompras.forEach(prod => {
                    if (prod.id === prodId) {
                        prod.cantidad++;
                    }
                });
            } else {
                const item = cursos.find(prod => prod.id === prodId);
                bolsaCompras.push(item);
                console.log(bolsaCompras)
            }
            guardarEnLocal();
            subirCarrito();

    }


    // funcion de crear productos en el html

    function pintarHtml(arr){
        contenedorProductos.innerHTML = "";

        let html = "";
        for (const elem of arr){
            html = `
                <div class="card cadaCard" style="width: 18rem;">
                    <img src="${elem.img}" class="card-img-top" alt="${elem.nombre}">
                    <div class="card-body">
                        <h3 class="nombreCursos">${elem.nombre}</h3>
                        <p class="card-text textoDescripcion">${elem.tema}</p>
                        <div class="contPrecio">
                            <p class="card-text">Precio: $${elem.valor}</p>
                            <p class="card-text">Modulos: ${elem.modulos}</p>
                        </div>
                        
                    </div>
                    <div class="contBotonProds">
                        <button class="btn btn-primary botonProductos" id="agregar${elem.id}" type="submit">Añadir</button>
                    </div>
                </div>
            `;
        contenedorProductos.innerHTML = contenedorProductos.innerHTML + html

            const boton = document.getElementById(`agregar${elem.id}`)
            boton.addEventListener('click', () => {
                añadirCarrito(elem.id)
            })
        }
    }

//agregar productos al html

pintarHtml(cursos);

cargarLocal();



