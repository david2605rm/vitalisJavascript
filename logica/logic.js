const cursos = [
    {id: 1, nombre:'crisis digestiva', tema: 'salir de crisis digestiva', modulos: 3, profesora: 'Maria Ramirez', valor: 27},
    {id: 2, nombre:'Reset desinflamatorio', tema: 'Detox de tu cuerpo', modulos: 7, profesora: 'Maria Ramirez', valor: 117},
    {id: 3, nombre:'Consulta 1 a 1', tema: 'consulta personalizada para diagnostico', modulos: 5, profesora: 'Maria Ramirez', valor: 97},
]

const listaInteresados = []

function saludoNom(nombre){
    return nombre + " Buen día"
};

function Interesado(nombre, curso, numCuotas, medPago){
    this.nombre = nombre
    this.curso = curso;
    this.numCuotas = numCuotas;
    this.medPago = medPago;

    this.mostrarInteresados = function(){
        return(
            "Nombre interesado: " + this.nombre + "\n"+
            "Curso de interes: " + this.curso + "\n" +
            "Numero de cuotas: " + this.numCuotas + "\n" + 
            "Medio de pago preferido: " + this.medPago + "\n" 
        )
    }
}




let nombre = prompt("Cual es tu nombre");

while (nombre === '') {
    alert("Por favor, Ingrese los Datos solicitados");
    nombre = prompt("Cual es tu nombre");
}

alert(saludoNom(nombre))

let bienvenidaTienda = alert("Bienvenido a Vitalis Academy " + nombre + " a continuacion podras ver nuestro portafolio de cursos");

let productos; 

do {
    productos = prompt("Vitalis Academy te ofrece estas alternativas para sanar tu cuerpo: \n 1) Reset Desinflamatorio \n 2) Consulta Personalizada \n 3) Crisis Digestiva \n 4) No estoy listo/a en este momento \n 5) No quiero informacion/ya finalice ");
    
    switch (productos) {
        case "1": 
            alert("Has seleccionado el Reset desinflamatorio");
            let nuevoInteresado = new Interesado(
                    nombre,
                    prompt("Confirmanos en que curso estas interesado"),
                    parseInt(prompt("Cuantas cuotas estan bien para ti?")),
                    prompt("que medio de pago deseas aplicar"),
                    );
                    listaInteresados.push(nuevoInteresado);
                    alert(nuevoInteresado.mostrarInteresados())
            break;

        case "2": 
            alert("Has seleccionado la consulta personalizada");
            let nuevoInteresado2 = new Interesado(
                nombre,
                prompt("Confirmanos en que curso estas interesado"),
                parseInt(prompt("Cuantas cuotas estan bien para ti?")),
                prompt("que medio de pago deseas aplicar"),
                );
                listaInteresados.push(nuevoInteresado2);
                alert(nuevoInteresado2.mostrarInteresados())    
            break;

        case "3": 
            alert("Has seleccionado Crisis Digestiva");
            let nuevoInteresado3 = new Interesado(
                nombre,
                prompt("Confirmanos en que curso estas interesado"),
                parseInt(prompt("Cuantas cuotas estan bien para ti?")),
                prompt("que medio de pago deseas aplicar"),
                );
                listaInteresados.push(nuevoInteresado3);
                alert(nuevoInteresado3.mostrarInteresados())    
            break;

        case "4": alert("Entiendo, Quieres que te contactemos despues?");
                let contacto = prompt(" \n Si \n No")
                if (contacto == "Si") {
                    alert("Espera nuestro mensaje")
                } else {
                    alert("Te esperamos con nosotros pronto, un abrazo")
                }
            break;

        default: 
            alert("Selecciona una opcion correcta")
            break;
    } 
}while (productos != "5")  

alert('Gracias ' + nombre + ' por creer en vitalis academy')

for (const elemento of listaInteresados){
    console.log("Medios de pago mas solicitados: " + elemento.medPago)
}

// esto son ejemplos de metodos que me gustaria usar cuando pinte en el html, este con una lupa en el nav
let buscarCurso = prompt("Que curso te interesa mas")

const buscar = cursos.find((curso) =>{
    return curso.nombre
})

console.log(listaInteresados);