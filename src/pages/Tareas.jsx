import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Tareas() {
  const [proyectos, setProyectos] = useState([]);
  const [tareas, setTareas] = useState([]);

  const [proyectoId, setProyectoId] = useState("");
  const [tarea, setTarea] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [estado, setEstado] = useState("");

  const [prioridad, setPrioridad] = useState("");
  const [observaciones, setObservaciones] = useState("");


  const guardarTarea = async () => {
  const { error } = await supabase
    .from("tareas")
    .insert([
      {
        proyecto_id: proyectoId,
        titulo: tarea,
        prioridad,
        estado,
        fecha_limite: fechaLimite,
        observaciones,
      },
    ]);

  if (error) {
  console.log(
    "ERROR TAREA:",
    JSON.stringify(error, null, 2)
  );

  alert("Error al guardar tarea");
  return;
  }


  alert("Tarea guardada correctamente");

  cargarTareas();

  setProyectoId("");
  setTarea("");
  setPrioridad("");
  setResponsable("");
  setFechaLimite("");
  setEstado("");
  setObservaciones("");
};

const eliminarTarea = async (id) => {
  const confirmar = window.confirm(
    "¿Deseas eliminar esta tarea?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("tareas")
    .delete()
    .eq("id", id);

 if (error) {
  console.log(
    "ERROR ELIMINAR:",
    JSON.stringify(error, null, 2)
  );

  alert("Error al eliminar tarea");
  return;
}

  cargarTareas();
};

  const cargarProyectos = async () => {
    const { data } = await supabase
      .from("proyectos")
      .select("*")
      .order("nombre");

    setProyectos(data || []);
  };

  useEffect(() => {
  cargarProyectos();
  cargarTareas();
}, []);

const cargarTareas = async () => {
  const { data } = await supabase
    .from("tareas")
    .select("*")
    .order("id", { ascending: false });

  setTareas(data || []);
};

  return (
    <div>
   <h1>✅ Tareas</h1>

<br />

<select
  value={proyectoId}
  onChange={(e) => setProyectoId(e.target.value)}
>
  <option value="">
    Seleccione un proyecto
  </option>

  {proyectos.map((proyecto) => (
    <option
      key={proyecto.id}
      value={proyecto.id}
    >
      {proyecto.nombre}
    </option>
  ))}
</select>

<br />
<br />

<input
  type="text"
  placeholder="Tarea"
  value={tarea}
  onChange={(e) => setTarea(e.target.value)}
/>

 <br />
<br />

<input
  type="text"
  placeholder="Prioridad"
  value={prioridad}
  onChange={(e) => setPrioridad(e.target.value)}
/>

<br />
<br />

<textarea
  placeholder="Observaciones"
  value={observaciones}
  onChange={(e) => setObservaciones(e.target.value)}
/>

<br />
<br />

<input
  type="text"
  placeholder="Responsable"
  value={responsable}
  onChange={(e) => setResponsable(e.target.value)}
/>

<br />
<br />

<input
  type="date"
  value={fechaLimite}
  onChange={(e) => setFechaLimite(e.target.value)}
/>

<br />
<br />

<input
  type="text"
  placeholder="Estado"
  value={estado}
  onChange={(e) => setEstado(e.target.value)}
/>

<br />
<br />

<button onClick={guardarTarea}>
  Guardar Tarea
</button>

<hr />

<h2>Tareas Registradas</h2>

<table>
  <thead>
    <tr>
      <th>Proyecto</th>
      <th>Tarea</th>
      <th>Prioridad</th>
      <th>Estado</th>
      <th>Fecha Límite</th>


      <th>Acciones</th>
    </tr>
  </thead>

  <tbody>
    {tareas.map((item) => (
      <tr key={item.id}>
        <td>
          {
            proyectos.find(
              (proyecto) =>
                proyecto.id === item.proyecto_id
            )?.nombre || "-"
          }
        </td>

        <td>{item.titulo}</td>
        <td>{item.prioridad}</td>
        <td>{item.estado}</td>
        <td>{item.fecha_limite}</td>

 <td>
  <button
    onClick={() => {
      console.log("CLICK BOTON", item.id);
      eliminarTarea(item.id);
    }}
  >
    🗑️
  </button>
</td>
      </tr>
    ))}
  </tbody>
</table>


    </div>
  );
}

export default Tareas;