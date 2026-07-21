import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Pagos() {
  const [proyectos, setProyectos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [proyectoId, setProyectoId] = useState("");

  const [monto, setMonto] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState("");
  const [numeroOperacion, setNumeroOperacion] = useState("");
  const [observacion, setObservacion] = useState("");
  

  const cargarProyectos = async () => {
  const { data } = await supabase
    .from("proyectos")
    .select("*")
    .order("nombre");

  setProyectos(data || []);
};



  const cargarPagos = async () => {
  const { data } = await supabase
    .from("pagos")
    .select("*")
    .order("id", { ascending: false });

  setPagos(data || []);
};

useEffect(() => {
  cargarProyectos();
  cargarPagos();
}, []);

const guardarPago = async () => {
  if (!proyectoId || !monto) {
    alert("Proyecto y monto son obligatorios");
    return;
  }

  const { error } = await supabase
    .from("pagos")
    .insert([
      {
        proyecto_id: proyectoId,
        monto,
        fecha_pago: fechaPago,
        tipo_operacion: tipoOperacion,
        numero_operacion: numeroOperacion,
        observacion: observacion,
      },
    ]);

  if (error) {
    alert("Error al guardar pago");
    console.log(error);
    return;
  }

  alert("Pago guardado correctamente");

  cargarPagos();

  setProyectoId("");
  setMonto("");
  setFechaPago("");
  setTipoOperacion("");
  setNumeroOperacion("");
  setObservacion("");
};



const eliminarPago = async (id) => {
  const confirmar = window.confirm(
    "¿Deseas eliminar este pago?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("pagos")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Error al eliminar pago");
    return;
  }

  cargarPagos();
};  


  return (
    <div>
  <h1>💰 Pagos</h1>

  <br />

  <label>Proyecto</label>

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
  type="number"
  placeholder="Monto"
  value={monto}
  onChange={(e) => setMonto(e.target.value)}
/>

<br />
<br />

<input
  type="date"
  value={fechaPago}
  onChange={(e) => setFechaPago(e.target.value)}
/>

<br />
<br />

<input
  type="text"
  placeholder="Tipo de operación"
  value={tipoOperacion}
  onChange={(e) => setTipoOperacion(e.target.value)}
/>

<br />
<br />

<input
  type="text"
  placeholder="Número de operación"
  value={numeroOperacion}
  onChange={(e) => setNumeroOperacion(e.target.value)}
/>

<br />
<br />

<textarea
  placeholder="Observación"
  value={observacion}
  onChange={(e) => setObservacion(e.target.value)}
/>

<br />
<br />

<button onClick={guardarPago}>
  Guardar Pago
</button>

<hr />

<h2>Pagos Registrados</h2>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Proyecto</th>
      <th>Monto</th>
      <th>Fecha</th>
      <th>Tipo</th> 
      <th>Acciones</th>

    </tr>
  </thead>

  <tbody>
    {pagos.map((pago) => (
      <tr key={pago.id}>
        <td>{pago.id}</td>
        <td>
  {
    proyectos.find(
      (proyecto) => proyecto.id === pago.proyecto_id
    )?.nombre || "-"
  }
</td>
        <td>{pago.monto}</td>
        <td>{pago.fecha_pago}</td>
        <td>{pago.tipo_operacion}</td>
        
        <td>
  <button
    onClick={() => eliminarPago(pago.id)}
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

export default Pagos;
