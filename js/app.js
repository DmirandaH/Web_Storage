// Variables

const formulario = document.querySelector('#formulario');
const listaTasks = document.querySelector('#lista-tasks');
const tasks = [];


// Event Listeners

eventListeners();

function eventListeners () {
    formulario.addEventListener('submit', agregarTasks);
}



// Funciones
function agregarTasks(e) {
    e.preventDefault();

    console.log('agregando Tasks............')
}
