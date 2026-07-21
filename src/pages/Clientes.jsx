import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Clientes() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [clientes, setClientes] = useState([]);

  const guardarCliente = async () => {
     if (!nombre || !telefono) {
        alert("Nombre y teléfono son obligatorios");
        return;
     }
  const { error } = await supabase
    .from("clientes")
    .insert([
      {
        nombre,
        telefono,
        observaciones,
      },
    ]);

  if (error) {
    alert("Error al guardar cliente");
    console.log(error);
    return;
  }

  alert("Cliente guardado correctamente");

  cargarClientes();

  setNombre("");
  setTelefono("");
  setObservaciones("");
};
  const cargarClientes = async () => {
  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .order("id", { ascending: false });

  if (!error) {
    setClientes(data);
  }
};
  const eliminarCliente = async (id) => {
  const confirmar = window.confirm(
    "¿Deseas eliminar este cliente?"
  );

  if (!confirmar) return;

  console.log("ID A ELIMINAR:", id);

  const { data, error } = await supabase
    .from("clientes")
    .delete()
    .eq("id", id)
    .select();

    console.log("ID A ELIMINAR:", id);
    console.log("DATA:", data);
    console.log("ERROR:", error);

  if (error) {
    alert("Error al eliminar cliente");
    return;
  }

  cargarClientes();
}
   useEffect(() => {
  cargarClientes();
}, []);

  return (
    <div>
      <h1>👥 Clientes</h1>

      <br />

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
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

      <button onClick={guardarCliente}>
      Guardar Cliente
      </button>
      <hr />

<h2>Clientes Registrados</h2>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Teléfono</th>
      <th>Observaciones</th>
      <th>Acciones</th>
    </tr>
  </thead>

  <tbody>
    {clientes.map((cliente) => (
      <tr key={cliente.id}>
      <td>{cliente.id}</td>
      <td>{cliente.nombre}</td>
      <td>{cliente.telefono}</td>
      <td>{cliente.observaciones}</td>

    <td>
    <button
      onClick={() => eliminarCliente(cliente.id)}
    >
      🗑️
    </button>
  </td>
</tr>
    ))}
  </tbody>
</table>

    <hr />
</div>
);
}

export default Clientes;