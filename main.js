let tasks = [];

const inputTarea = document.getElementById('tarea');
const inputDescripcion = document.getElementById('descripcion');
const formularioTareas = document.getElementById('formularioTareas');
const tareasPorRealizar = document.getElementById('tareasPorRealizar');

function mostrarTareas() {
    tareasPorRealizar.innerHTML = '';
    let infoDelHTML = '';
    tasks.forEach(function (task) {
        infoDelHTML += `
            <li style="box-shadow: 0 0 5px rgba(199, 8, 167, 0.671); 
                padding: 0px 10px 10px 10px; 
                margin-top: 20px; 
                list-style-type: none;">
                <label>${task.tarea}</label>
                <br>
                <label>${task.descripcion}</label>
                <br>
                <button onclick="editarTarea(${task.id})">editar</button>
                <button style="margin-left: 20px" onclick="eliminarTarea(${task.id})">eliminar</button>
            </li>
            <br>
            `;
    });
    tareasPorRealizar.innerHTML = infoDelHTML;
}

function crearId() {
    return Number((Math.random() * 1000).toFixed())
}

function guardarTarea(tarea, descripcion) {
    tasks.push({
        tarea,
        descripcion,
        id: crearId(),
    });
    guardarTareas(tasks);
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


function guardarTareas(arrayDeTasks) {
    const listaDeTareasConvertidoAString = JSON.stringify(arrayDeTasks);
    localStorage.setItem('tasks', listaDeTareasConvertidoAString);
}

function obtenerTareasGuardadas() {
    const listaDeTareasEnString = localStorage.getItem('tasks') || '[]';
    const listaDeTareasYaConvertidaEnUnArray = JSON.parse(
        listaDeTareasEnString
    );
    tasks = [...listaDeTareasYaConvertidaEnUnArray];
}

obtenerTareasGuardadas();
mostrarTareas();

function eliminarTarea(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    })
    guardarTareas(tasks);
    mostrarTareas();
}


function editarTarea(id, nuevosValores) {
    const indiceArrayTareaBuscada = tasks.findIndex(function (task) {
        return task.id === id;
    });
    tasks[indiceArrayTareaBuscada] = {
        ...tasks[indiceArrayTareaBuscada],
        ...nuevosValores,
    };
    guardarTareas(tasks);
    mostrarTareas();
}
