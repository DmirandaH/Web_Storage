// Variables

const formulario = document.querySelector('#formulario');
const listaTasks = document.querySelector('#lista-tasks');
let tasks = [];


// Event Listeners

eventListeners();

function eventListeners () {
    formulario.addEventListener('submit', agregarTasks);
}



// Funciones
function agregarTasks(e) {
    e.preventDefault();

  /// Textarea donde el usurio escribe

  const task = document.querySelector('#task').value;

// validación del formulario
if(task === '') {
    mostrarError ('Un nuevo mensaje no puede ir vacio');

    return; // evita que se ejecuten más lineas de código
}

const taskObj = {
    id: Date.now(),
    task:task
}

// Añadir al arreglo las tasks

tasks=[...tasks, taskObj];

// Una vez agregado vamos a crear el HTML
crearHTML();

// Reiniciar el formulario();
formulario.reset();


}

// Mostrar Mensaje de error,es una función que se puede reeutilizar en otro proyecto.

function mostrarError (error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar mensaje de error en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);


    // Eliminamos la alerta despúes de 3 segundos
    setTimeout(() => {
        mensajeError.remove();

    }, 3000);

}

// Muestra un listado de las Tasks

function crearHTML() {

    LimpiarHTML();

    if(tasks.length > 0) {
        tasks.forEach(task => {
            // Crear el HTML
            
            const li = document.createElement('li');

            //añadir el texto
            li.innerText = task.task;

            // insertarlo en el html
            listaTasks.appendChild(li); // Mientras exista un appendChild no se elimina el código previo.

        });

    }
}


// Limpiar el HTML
function LimpiarHTML() {
    while(listaTasks.firstChild) {
        listaTasks.removeChild(listaTasks.firstChild);
    }
}

