const body = document.querySelector("body")
const resultado = document.querySelector(".cajaBusqueda");
const form = document.querySelector("#formulario");

//Eventos
window.addEventListener("load", () => {
    form.addEventListener("submit", buscarClima)
})


//Funciones
function buscarClima (event){
    event.preventDefault();
    
    //Validamos formulario
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if(ciudad === "" || pais === "") {
        mostrarError("Ambos campos son obligatorios");
        return
    }

    //Consultamos a la API
    consultarApi(ciudad,pais)
}


//Funcion para mostrar el error
function mostrarError(mensaje){
    const alertaMostrada = document.querySelector(".alerta");

    if(!alertaMostrada) {
         //Creamos un alerta
        const alerta = document.createElement("div");
        alerta.classList.add("alerta")

        alerta.innerHTML = `
          <strong><h3>ERROR</h3></strong> 
          <p>${mensaje}</p>
         `;

    body.appendChild(alerta)


    //Eliminamos alerta despues de 5 segundos
     setTimeout( () => {
        alerta.remove();
     }, 5000)
    }
}

function consultarApi(ciudad, pais) {

    const appID = `730cd48c34ae12bfae2230ea9c252e17`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    fetch(url)
    .then(respuesta => respuesta.json()) 
    .then(datos => {

        limpiarHTML(); //Limpiamos El HTML previo
        if(datos.cod === "404"){
           mostrarError("Ciudad No encontrada");
           return
        }

        //Imprimimos la respuesta en el html
        mostrarClima(datos);

    })
}

//Funcion que toma los datos como parametro y muestra el clima en html
function mostrarClima(datos){
    const {main : { temp, temp_max, temp_min}} = datos;

    const centigrados = kelvinACentigrados(temp);

    console.log(centigrados);

    const actual = document.createElement("h2");
    actual.innerHTML= `${centigrados} &#8451;`;
    actual.classList.add("actualidad");


    resultado.appendChild(actual);
}

//Funcion para pasar los numeros de kelvin a centigrados sin coma ni punto.
function kelvinACentigrados(grados){
    return parseInt(grados - 273.15)

}

//Funcion para limpiar el html
function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
   