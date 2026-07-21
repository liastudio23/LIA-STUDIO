import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Gastos() {
  const [proyectos, setProyectos] = useState([]);
  const [gastos, setGastos] = useState([]);

  const [proyectoId, setProyectoId] = useState("");
  const [concepto, setConcepto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [monto, setMonto] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState("");
  const [fechaGasto, setFechaGasto] = useState("");
  const [observacion, setObservacion] = useState("");

  const cargarProyectos = async () => {
    const { data } = await supabase
      .from("proyectos")
      .select("*")
      .order("nombre");

    setProyectos(data || []);
  };

  const cargarGastos = async () => {
    const { data } = await supabase
      .from("gastos")
      .select("*")
      .order("id", { ascending: false });

    setGastos(data || []);
  };

  useEffect(() => {
    cargarProyectos();
    cargarGastos();
  }, []);

  const guardarGasto = async () => {
  if (!proyectoId || !monto) {
    alert("Proyecto y monto son obligatorios");
    return;
  }

  const { error } = await supabase
    .from("gastos")
    .insert([
      {
        proyecto_id: proyectoId,
        concepto,
        categoria,
        monto,
        tipo_operacion: tipoOperacion,
        fecha_gasto: fechaGasto,
        observacion: observacion,
      },
    ]);

  if (error) {
    alert("Error al guardar gasto");
    console.log(error);
    return;
  }

  alert("Gasto guardado correctamente");

  cargarGastos();

  setProyectoId("");
  setConcepto("");
  setCategoria("");
  setMonto("");
  setTipoOperacion("");
  setFechaGasto("");
  setObservacion("");
}; 

const eliminarGasto = async (id) => {
  const confirmar = window.confirm(
    "¿Deseas eliminar este gasto?"
  );

  if (!confirmar) return;

  console.log("ID A ELIMINAR:", id);

const { data, error } = await supabase
  .from("gastos")
  .delete()
  .eq("id", id);

console.log("DATA:", data);
console.log(
  "ERROR COMPLETO:",
  JSON.stringify(error, null, 2)
);

  if (error) {
    alert("Error al eliminar gasto");
    return;
  }

  cargarGastos();
};

  return (
   <div>
  <h1>💸 Gastos</h1>

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
    type="text"
    placeholder="Concepto"
    value={concepto}
    onChange={(e) => setConcepto(e.target.value)}
  />

  <br />
  <br />

  <input
    type="text"
    placeholder="Categoría"
    value={categoria}
    onChange={(e) => setCategoria(e.target.value)}
  />

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
    type="text"
    placeholder="Tipo de operación"
    value={tipoOperacion}
    onChange={(e) => setTipoOperacion(e.target.value)}
  />

  <br />
  <br />

  <input
    type="date"
    value={fechaGasto}
    onChange={(e) => setFechaGasto(e.target.value)}
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

  <button onClick={guardarGasto}>
  Guardar Gasto
</button>


<hr />

<h2>Gastos Registrados</h2>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Proyecto</th>
      <th>Concepto</th>
      <th>Monto</th>
      <th>Fecha</th>
      <th>Tipo</th>
      <th>Acciones</th>
    </tr>
  </thead>

  <tbody>
    {gastos.map((gasto) => (
      <tr key={gasto.id}>
        <td>{gasto.id}</td>

        <td>
          {
            proyectos.find(
              (proyecto) =>
                proyecto.id === gasto.proyecto_id
            )?.nombre || "-"
          }
        </td>

        <td>{gasto.concepto}</td>
        <td>{gasto.monto}</td>
        <td>{gasto.fecha_gasto}</td>
        <td>{gasto.tipo_operacion}</td>

    <td>
  <button
    onClick={() => eliminarGasto(gasto.id)}
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

export default Gastos;