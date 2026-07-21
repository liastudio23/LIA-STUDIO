import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Proyectos() {
  const [nombre, setNombre] = useState("");
  const [servicio, setServicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [proyectos, setProyectos] = useState([]);

  const cargarClientes = async () => {
  const { data } = await supabase
    .from("clientes")
    .select("*")
    .order("nombre");

  setClientes(data || []);
};

  const cargarProyectos = async () => {
  const { data, error } = await supabase
  .from("proyectos")
  .select("*")
  .order("id", { ascending: false });;

  setProyectos(data || []);
};

useEffect(() => {
  cargarClientes();
  cargarProyectos();
}, []);

const guardarProyecto = async () => {
  if (!clienteId || !nombre) {
    alert("Seleccione un cliente y escriba un nombre para el proyecto");
    return;
  }

  const { error } = await supabase
    .from("proyectos")
    .insert([
      {
        cliente_id: clienteId,
        nombre,
        servicio,
        descripcion,
        precio,
        estado,
        fecha_entrega: fechaEntrega,
      },
    ]);

  if (error) {
    alert("Error al guardar proyecto");
    console.log(error);
    return;
  }

  alert("Proyecto guardado correctamente");

  cargarProyectos();

  setClienteId("");
  setNombre("");
  setServicio("");
  setDescripcion("");
  setPrecio("");
  setEstado("");
  setFechaEntrega("");
};

  const eliminarProyecto = async (id) => {
  const confirmar = window.confirm(
    "¿Deseas eliminar este proyecto?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("proyectos")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Error al eliminar proyecto");
    console.log(error);
    return;
  }

  cargarProyectos();
};

return (

    <div>
      <h1>🎬 Proyectos</h1>

      <br />
      <label>Cliente</label>

<br />

<select
  value={clienteId}
  onChange={(e) => setClienteId(e.target.value)}
>
  <option value="">Seleccione un cliente</option>

  {clientes.map((cliente) => (
    <option key={cliente.id} value={cliente.id}>
      {cliente.nombre}
    </option>
  ))}
</select>

<br />

      <input
        type="text"
        placeholder="Nombre del proyecto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Servicio"
        value={servicio}
        onChange={(e) => setServicio(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={fechaEntrega}
        onChange={(e) => setFechaEntrega(e.target.value)}
      />

      <br /><br />

      <button onClick={guardarProyecto}>
      Guardar Proyecto
      </button>

      <hr />

<h2>Proyectos Registrados</h2>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Cliente</th>
      <th>Proyecto</th>
      <th>Servicio</th>
      <th>Precio</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>

  <tbody>
    {proyectos.map((proyecto) => (
      <tr key={proyecto.id}>
        <td>{proyecto.id}</td>
       
       <td>
  {
    clientes.find(
      (cliente) => cliente.id === proyecto.cliente_id
    )?.nombre || "-"
  }
</td>

        <td>{proyecto.nombre}</td>
        <td>{proyecto.servicio}</td>
        <td>{proyecto.precio}</td>
        <td>{proyecto.estado}</td>

        <td>
  <button
  onClick={() => eliminarProyecto(proyecto.id)}
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

export default Proyectos;