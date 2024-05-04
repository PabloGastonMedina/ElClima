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
     }, 4000)
    }
}

function consultarApi(ciudad, pais) {

    const appID = `730cd48c34ae12bfae2230ea9c252e17`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    //Mostramos el spinner de carga
    Spinner();


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
    const {name, main : { temp, temp_max, temp_min}} = datos;

    const centigrados = kelvinACentigrados(temp);
    const min = kelvinACentigrados(temp_min);
    const max = kelvinACentigrados(temp_max);

    console.log(centigrados);

    const nombreCiudad = document.createElement("h3");
    nombreCiudad.textContent=  "Clima en: " + name;
    nombreCiudad.classList.add("actualidad")
    console.log(nombreCiudad)

    const actual = document.createElement("p");
    actual.innerHTML= `${centigrados} &#8451;`;
    actual.classList.add("actualidad");

    const actualMin = document.createElement("h2");
    actualMin.innerHTML= `Min: ${min} &#8451;`;
    actualMin.classList.add("actualidad");
    
    const actualMax = document.createElement("h2");
    actualMax.innerHTML= `Max: ${max} &#8451;`;
    actualMax.classList.add("actualidad");  
    
    const restultadoDiv = document.createElement("div");
    restultadoDiv.appendChild(nombreCiudad)
    restultadoDiv.appendChild(actual);
    restultadoDiv.appendChild(actualMin);
    restultadoDiv.appendChild(actualMax);

    resultado.appendChild(restultadoDiv);
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

//Funcion para crear el elemento spinner

function Spinner() {

  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;
  resultado.appendChild(divSpinner);
}
   