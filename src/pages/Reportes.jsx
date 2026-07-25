import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Reportes() {
  const [proyectos, setProyectos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [pagosPersonal, setPagosPersonal] =
    useState([]);

  useEffect(() => {
    cargarReportes();
    cargarPagos();
    cargarGastos();
    cargarPagosPersonal();
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

  const cargarPagosPersonal = async () => {
    const { data } = await supabase
      .from("pagos_personal")
      .select("*");

    setPagosPersonal(data || []);
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
            <th>Personal</th>
            <th>Utilidad</th>
          </tr>
        </thead>

        <tbody>
          {proyectos.map((proyecto) => {
            const ingresos = pagos
              .filter(
                (pago) =>
                  pago.proyecto_id ===
                  proyecto.id
              )
              .reduce(
                (acc, pago) =>
                  acc +
                  Number(pago.monto),
                0
              );

            const gastosProyecto =
              gastos
                .filter(
                  (gasto) =>
                    gasto.proyecto_id ===
                    proyecto.id
                )
                .reduce(
                  (acc, gasto) =>
                    acc +
                    Number(gasto.monto),
                  0
                );

            const gastosPersonal =
              pagosPersonal
                .filter(
                  (pagoPersonal) =>
                    pagoPersonal.proyecto_id ===
                    proyecto.id
                )
                .reduce(
                  (
                    acc,
                    pagoPersonal
                  ) =>
                    acc +
                    Number(
                      pagoPersonal.monto
                    ),
                  0
                );

            const utilidad =
              ingresos -
              gastosProyecto -
              gastosPersonal;

            return (
              <tr key={proyecto.id}>
                <td>
                  {proyecto.nombre}
                </td>

                <td>
                  S/ {ingresos}
                </td>

                <td>
                  S/ {gastosProyecto}
                </td>

                <td>
                  S/ {gastosPersonal}
                </td>

                <td
                  style={{
                    color:
                      utilidad >= 0
                        ? "#22c55e"
                        : "#ef4444",
                  }}
                >
                  S/ {utilidad}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Reportes;