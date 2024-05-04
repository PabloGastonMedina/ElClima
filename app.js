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
}

function mostrarError(mensaje){
    console.log(mensaje)

    //Creamos un alerta
    const alerta = document.createElement("div");
    alerta.classList.add("alerta")

    alerta.innerHTML = `
       <strong><h3>ERROR</h3></strong> 
       <p>${mensaje}</p>
    `;

    body.appendChild(alerta)
}