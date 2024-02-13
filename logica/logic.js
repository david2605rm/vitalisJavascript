let nombre = prompt("Cual es tu nombre");

while (nombre === '') {
    alert("Por favor, Ingrese los Datos solicitados");
    nombre = prompt("Cual es tu nombre");
}

function saludoNom(nom){
    return nom + " Buen día"
};

saludoNom(nombre);

let bienvenidaTienda = alert("Bienvenido a Vitalis Academy " + nombre + " a continuacion podras ver nuestro portafolio de cursos");

let productos = prompt("Vitalis Academy te ofrece estas alternativas para sanar tu cuerpo: \n 1) Reset Desinflamatorio \n 2) Consulta Personalizada \n 3) Crisis Digestiva \n 4) No estoy listo/a en este momento \n 5) No quiero informacion ");



while (productos != "5") {
    
    switch (productos) {
        case "1": alert("Has seleccionado el Reset desinflamatorio");
                    alert("Nos pondremos en contacto contigo")
            break;

        case "2": alert("Has seleccionado la consulta personalizada");
                    alert("Nos pondremos en contacto contigo")
            break;

        case "3": alert("Has seleccionado Crisis Digestiva");
                    alert("Nos pondremos en contacto contigo")
            break;

        case "4": alert("Entiendo, Quieres que te contactemos despues?");
                let contacto = alert(" \n Si \n No")
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
    productos = prompt("Vitalis Academy te ofrece estas alternativas para sanar tu cuerpo: \n 1) Reset Desinflamatorio \n 2) Consulta Personalizada \n 3) Crisis Digestiva \n 4) No estoy listo/a ");
}

alert('Gracias ' + nombre + ' por creer en vitalis academy')