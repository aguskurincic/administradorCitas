import Citas from './Clases/Citas.js';
import UI from './Clases/UI.js';

import {
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario
} from './selectores.js';

const admCitas = new Citas();
const ui = new UI(admCitas);

let editando = false;

//Obj de cita
const citaObj = {
    nombre: '',                     //Definido el 'name' en el html
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Agrega datos al obj
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;      //Me trae lo que escribo en el input
}

//Valida y agrega nueva cita
export function nuevaCita(e) {
    e.preventDefault();

    //Extraer la info del obj de Cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
    }

    if(editando) {
        ui.imprimirAlerta('Editado correctamente');

        //Pasar el obj de edición
        admCitas.editarCita({...citaObj});

        //Restaurar estado de botón
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        //Quitar modo edición
        editando = false;
    } else {
        //Generar un id único
        citaObj.id = Date.now();

        //Creando una nueva cita
        admCitas.agregarCita({...citaObj});     //Para pasar una copia del obj

        //Mensaje correcto
        ui.imprimirAlerta('Se agregó correctamente')
    }

    //Reiniciar obj
    reiniciarObj();

    //Reiniciar el formulario
    formulario.reset();

    //Mostrar html de la cita
    ui.imprimirCitas(admCitas);
}

export function reiniciarObj() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    //Elimina cita
    admCitas.eliminarCita(id);
    //Muestra mensaje
    ui.imprimirAlerta('Se eliminó correctamente');
    //Refresh citas
    ui.imprimirCitas(admCitas);
}

export function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    //Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el obj
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}