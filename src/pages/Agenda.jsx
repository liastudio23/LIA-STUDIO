import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Agenda() {
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");


  const [tipoEvento, setTipoEvento] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estado, setEstado] = useState("");

  const [eventos, setEventos] = useState([]);

  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState("");

  const cargarClientes = async () => {
  const { data } = await supabase
    .from("clientes")
    .select("*")
    .order("nombre");

  setClientes(data || []);
};

useEffect(() => {
  cargarClientes();
  cargarEventos();
}, []);


const cargarEventos = async () => {
  const { data } = await supabase
    .from("agenda")
    .select("*")
    .order("fecha", { ascending: false });

  setEventos(data || []);
};

  const guardarEvento = async () => {
  console.log("CLIENTE ID ANTES:", clienteId);
  const { error } = await supabase
    .from("agenda")
    .insert([
      {
        cliente_id: clienteId,
        titulo,
        tipo_evento: tipoEvento,
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        ubicacion,
        estado,
      },
    ]);

  if (error) {
  console.log("CLIENTE ID:", clienteId);
  console.log(
    "ERROR AGENDA:",
    JSON.stringify(error, null, 2)
  );

  alert("Error al guardar evento");
  return;
}

  alert("Evento guardado correctamente");
  cargarEventos();

  setTitulo("");
  setTipoEvento("");
  setFecha("");
  setHoraInicio("");
  setHoraFin("");
  setUbicacion("");
  setDescripcion("");
  setEstado("");
};


  return (
    <div>
      <h1>📅 Agenda</h1>

  <br />

<select
  value={clienteId}
  onChange={(e) => setClienteId(e.target.value)}
>
  <option value="">
    Seleccione un cliente
  </option>

  {clientes.map((cliente) => (
    <option
      key={cliente.id}
      value={cliente.id}
    >
      {cliente.nombre}
    </option>
  ))}
</select>

<br />
<br />

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
     <input
        type="text"
        placeholder="Tipo de Evento"
        value={tipoEvento}
        onChange={(e) => setTipoEvento(e.target.value)}
     />
      <br />
      <br />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <br />
      <br />

     <input
  type="time"
  value={horaInicio}
  onChange={(e) => setHoraInicio(e.target.value)}
/>

<br />
<br />

<input
  type="time"
  value={horaFin}
  onChange={(e) => setHoraFin(e.target.value)}
/>

    <br />
<br />

<input
  type="text"
  placeholder="Ubicación"
  value={ubicacion}
  onChange={(e) => setUbicacion(e.target.value)}
/>

<br />
<br />

<textarea
  placeholder="Descripción"
  value={descripcion}
  onChange={(e) => setDescripcion(e.target.value)}
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

      <button onClick={guardarEvento}>
      Guardar Evento
      </button>

      <hr />

<h2>Eventos Registrados</h2>

<table>
  <thead>
    <tr>
      <th>Cliente</th>
      <th>Título</th>
      <th>Tipo Evento</th>
      <th>Fecha</th>
      <th>Hora Inicio</th>
      <th>Hora Fin</th>
      <th>Estado</th>
    </tr>
  </thead>

  <tbody>
    {eventos.map((evento) => (
      <tr key={evento.id}>
        <td>
          {
            clientes.find(
              (cliente) =>
                cliente.id === evento.cliente_id
            )?.nombre || "-"
          }
        </td>

        <td>{evento.titulo}</td>
        <td>{evento.tipo_evento}</td>
        <td>{evento.fecha}</td>
        <td>{evento.hora_inicio}</td>
        <td>{evento.hora_fin}</td>
        <td>{evento.estado}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Agenda;