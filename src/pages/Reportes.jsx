import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Reportes() {
  const [proyectos, setProyectos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
  cargarReportes();
  cargarPagos();
  cargarGastos();
}, []);

  

 const cargarReportes = async () => {
  const { data } = await supabase
    .from("proyectos")
    .select("*")
    .order("nombre");

  setProyectos(data || []);
};

const cargarPagos = async () => {
  const { data } = await supabase
    .from("pagos")
    .select("*");

  setPagos(data || []);
};

const cargarGastos = async () => {
  const { data } = await supabase
    .from("gastos")
    .select("*");

  setGastos(data || []);
};


  return (
    <div>
      <h1>📄 Reportes</h1>
    <hr />

<table>
  <thead>
    <tr>
    <th>Proyecto</th>
    <th>Ingresos</th>
    <th>Gastos</th>
    <th>Utilidad</th>

    </tr>
  </thead>

  <tbody>
    {proyectos.map((proyecto) => (
      <tr key={proyecto.id}>
       <td>{proyecto.nombre}</td>

<td>
  S/ {pagos
    .filter(
      (pago) =>
        pago.proyecto_id === proyecto.id
    )
    .reduce(
      (acc, pago) =>
        acc + Number(pago.monto),
      0
    )}
</td>

<td>
  S/ {gastos
    .filter(
      (gasto) =>
        gasto.proyecto_id === proyecto.id
    )
    .reduce(
      (acc, gasto) =>
        acc + Number(gasto.monto),
      0
    )}
</td>

<td
  style={{
    color:
      (
        pagos
          .filter(
            (pago) =>
              pago.proyecto_id === proyecto.id
          )
          .reduce(
            (acc, pago) =>
              acc + Number(pago.monto),
            0
          )
        -
        gastos
          .filter(
            (gasto) =>
              gasto.proyecto_id === proyecto.id
          )
          .reduce(
            (acc, gasto) =>
              acc + Number(gasto.monto),
            0
          )
      ) >= 0
        ? "#22c55e"
        : "#ef4444",
  }}
>
  S/ {
    pagos
      .filter(
        (pago) =>
          pago.proyecto_id === proyecto.id
      )
      .reduce(
        (acc, pago) =>
          acc + Number(pago.monto),
        0
      )
    -
    gastos
      .filter(
        (gasto) =>
          gasto.proyecto_id === proyecto.id
      )
      .reduce(
        (acc, gasto) =>
          acc + Number(gasto.monto),
        0
      )
  }
</td>
      </tr>
    ))}
  </tbody>
</table>
      
    </div>
  );
}

export default Reportes;