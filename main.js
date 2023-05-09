let tasks = [{
    tarea: 'tarea',
    descripcion: 'descripcion',
}
];

const inputTarea = document.getElementById('tarea');
const inputDescripcion = document.getElementById('descripcion');
const formularioTareas = document.getElementById('formularioTareas');
const TareasPorRealizar = document.getElementById('TareasPorRealizar');

function mostrarTareas() {
    let infoDelHTML = '';
    tasks.forEach(function (task) {
        infoDelHTML += `
            <li>
                <label>${task.tarea}</label>
                <br>
                <label>${task.descripcion}</label>
                <button>editar</button>
                <button>eliminar</button>
            </li>
            <br>
            `;
    });
    TareasPorRealizar.innerHTML = infoDelHTML;
}  

function guardarTarea(tarea, descripcion) {
    tasks.push({
        tarea,
        descripcion,
    });
    guardarTarea(tasks);
    mostrarTareas();
}

function obtenerDatosForm(event) {
    event.preventDefault();
    const tarea = inputTarea.value;
    const descripcion = inputDescripcion.value;
    guardarTarea(tarea, descripcion);
    event.target.reset();
}

formularioTareas.addEventListener('submit', obtenerDatosForm);


function guardarTarea(arrayDeTasks) {
    const listaDeTareasConvertidoAString = JSON.stringify(arrayDeTasks);
    localStorage.setItem('tasks', listaDeTareasConvertidoAString);
}

function obtenerTareasGuardadas() {
    const listaDeTareasEnString = localStorage.getItem('tasks') || '[]';
    const listaDeTareasYaConvertidaEnUnArray = JSON.parse(
        listaDeTareasEnString
    );
    contactos = [...listaDeTareasYaConvertidaEnUnArray];
}

obtenerTareasGuardadas();
mostrarTareas();

