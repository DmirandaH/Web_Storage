// Variables

const formulario = document.querySelector('#formulario');
const listaTasks = document.querySelector('#lista-tasks');
let tasks = [];


// Event Listeners

eventListeners();

function eventListeners () {
    // Cuando el usuario agrega una nueva Task
    formulario.addEventListener('submit', agregarTasks);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        console.log(tasks);

        crearHTML();

    });

}



// Funciones
function agregarTasks(e) {
    e.preventDefault();
    console.log('submit detectado');

  /// Textarea donde el usurio escribe

  const task = document.querySelector('#task').value.trim();

// validación del formulario
if(task === '') {
    mostrarMensaje ('Una nueva tarea no puede ir vacía', 'error');

    return; // evita que se ejecuten más líneas de código
}

const taskObj = {
    id: Date.now(),
    task:task
}

// Añadir al arreglo las tasks

tasks=[...tasks, taskObj];

mostrarMensaje('Tarea agregada correctamente', 'exito');

// Una vez agregado vamos a crear el HTML
crearHTML();

// Reiniciar el formulario();
formulario.reset();


}

// Mostrar Mensaje de error,es una función que se puede reeutilizar en otro proyecto.

/*
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

}*/


// Mostrar Mensaje de error,es una función que se puede reeutilizar en otro proyecto.
function mostrarError(error) {

    // if evita que cuando el usuario presione varias veces en el botón de agregar se creen multiples alertas.

    //if(document.querySelector('.error')) return;

    const alertaPrevia = document.querySelector('.error');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar dentro del formulario 
    formulario.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


// Funcion que resalta la alerta que se ha creado de forma exitosa
function mostrarMensaje(mensaje, tipo) {

    // Eliminar cualquier alerta existente (error o éxito)
    const alertaPrevia = document.querySelector('.error, .exito');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    const alerta = document.createElement('p');
    alerta.textContent = mensaje;

    if (tipo === 'error') {
        alerta.classList.add('error');     
    } else if (tipo === 'exito') {
        alerta.classList.add('exito');
    }

    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 2000);
}


/*function mostrarMensaje(mensaje, tipo) {
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;

    if (tipo === 'error') {
        alerta.classList.add('error');     
    } else if (tipo === 'exito') {
        alerta.classList.add('exito');
    }

    formulario.appendChild(alerta);
    /*const contenido = document.querySelector('#contenido');
    contenido.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 2000);


}
*/



// Muestra un listado de las Tasks

function crearHTML() {

    LimpiarHTML();

    if(tasks.length > 0) {
        tasks.forEach(task => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-task');
            btnEliminar.innerHTML = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTask(task.id);
            }


            // Crear el HTML
            const li = document.createElement('li');

            //añadir el texto
            li.innerText = task.task;
            

            //Asignar el botón
            li.appendChild(btnEliminar);

            // insertarlo en el html
            listaTasks.appendChild(li); // Mientras exista un appendChild no se elimina el código previo.

        });

    }

    sincronizarStorage();
}

//Agrega las Tasks actuales a LocalStorage

function sincronizarStorage() {
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

// Elimina una tarea
function borrarTask(id) {
    tasks = tasks.filter( task => task.id !== id);

    crearHTML();
}

// Limpiar el HTML
function LimpiarHTML() {
    while(listaTasks.firstChild) {
        listaTasks.removeChild(listaTasks.firstChild);
    }
}

