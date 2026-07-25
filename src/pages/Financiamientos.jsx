import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Financiamientos() {
  const [concepto, setConcepto] = useState("");
  const [entidad, setEntidad] = useState("");
  const [montoSolicitado, setMontoSolicitado] = useState("");
  const [cuotaMensual, setCuotaMensual] = useState("");
  const [totalCuotas, setTotalCuotas] = useState("");
  const [cuotasPagadas, setCuotasPagadas] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaProximoPago, setFechaProximoPago] = useState("");
  const [estado, setEstado] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [financiamientos, setFinanciamientos] = useState([]);

  const cargarFinanciamientos = async () => {
    const { data } = await supabase
      .from("financiamientos")
      .select("*")
      .order("id", { ascending: false });

    setFinanciamientos(data || []);
  };

  useEffect(() => {
    cargarFinanciamientos();
  }, []);

  const guardarFinanciamiento = async () => {
    const { error } = await supabase
      .from("financiamientos")
      .insert([
        {
          concepto,
          entidad,
          monto_solicitado: montoSolicitado,
          cuota_mensual: cuotaMensual,
          total_cuotas: totalCuotas,
          cuotas_pagadas: cuotasPagadas,
          fecha_inicio: fechaInicio,
          fecha_proximo_pago: fechaProximoPago,
          estado,
          observaciones,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Error al guardar financiamiento");
      return;
    }

    alert("Financiamiento guardado correctamente");

    cargarFinanciamientos();

    setConcepto("");
    setEntidad("");
    setMontoSolicitado("");
    setCuotaMensual("");
    setTotalCuotas("");
    setCuotasPagadas("");
    setFechaInicio("");
    setFechaProximoPago("");
    setEstado("");
    setObservaciones("");
  };

  const registrarCuota = async (financiamiento) => {
    const nuevasCuotasPagadas =
      Number(financiamiento.cuotas_pagadas) + 1;

    const fechaActual = new Date(
      financiamiento.fecha_proximo_pago
    );

    fechaActual.setMonth(
      fechaActual.getMonth() + 1
    );

    const nuevaFecha =
      fechaActual.toISOString().split("T")[0];

    const nuevoEstado =
      nuevasCuotasPagadas >=
      Number(financiamiento.total_cuotas)
        ? "Cancelado"
        : "Activo";

    const { error } = await supabase
      .from("financiamientos")
      .update({
        cuotas_pagadas:
          nuevasCuotasPagadas,
        fecha_proximo_pago:
          nuevaFecha,
        estado: nuevoEstado,
      })
      .eq("id", financiamiento.id);

    if (error) {
      console.log(error);
      alert("Error al registrar cuota");
      return;
    }

    cargarFinanciamientos();
  };

  const eliminarFinanciamiento = async (
    id
  ) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar este financiamiento?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("financiamientos")
      .delete()
      .eq("id", id);

    if (error) {
      alert(
        "Error al eliminar financiamiento"
      );
      return;
    }

    cargarFinanciamientos();
  };

  return (
    <div>
      <h1>💳 Financiamientos</h1>

      <br />

      <input
        type="text"
        placeholder="Concepto"
        value={concepto}
        onChange={(e) =>
          setConcepto(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Entidad Financiera"
        value={entidad}
        onChange={(e) =>
          setEntidad(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Monto Solicitado"
        value={montoSolicitado}
        onChange={(e) =>
          setMontoSolicitado(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Cuota Mensual"
        value={cuotaMensual}
        onChange={(e) =>
          setCuotaMensual(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Total Cuotas"
        value={totalCuotas}
        onChange={(e) =>
          setTotalCuotas(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Cuotas Pagadas"
        value={cuotasPagadas}
        onChange={(e) =>
          setCuotasPagadas(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={fechaInicio}
        onChange={(e) =>
          setFechaInicio(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={fechaProximoPago}
        onChange={(e) =>
          setFechaProximoPago(e.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) =>
          setObservaciones(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={guardarFinanciamiento}>
        Guardar Financiamiento
      </button>

      <hr />

      <h2>Financiamientos Registrados</h2>

      <table>
        <thead>
          <tr>
            <th>Entidad</th>
            <th>Monto</th>
            <th>Saldo Pendiente</th>
            <th>Cuotas Faltantes</th>
            <th>Próximo Pago</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {financiamientos.map((item) => {
            const saldoPendiente =
              Number(item.monto_solicitado) -
              Number(item.cuotas_pagadas) *
                Number(item.cuota_mensual);

            const cuotasFaltantes =
              Number(item.total_cuotas) -
              Number(item.cuotas_pagadas);

            const hoy = new Date();
            const fechaPago = new Date(
              item.fecha_proximo_pago
            );

            const diferenciaDias =
              Math.ceil(
                (fechaPago - hoy) /
                  (1000 *
                    60 *
                    60 *
                    24)
              );

            let estadoAutomatico =
              "🟢 Al día";

            if (
              Number(item.cuotas_pagadas) >=
              Number(item.total_cuotas)
            ) {
              estadoAutomatico =
                "✅ Cancelado";
            } else if (
              diferenciaDias < 0
            ) {
              estadoAutomatico =
                "🔴 Vencido";
            } else if (
              diferenciaDias <= 7
            ) {
              estadoAutomatico =
                "🟡 Próximo a vencer";
            }

            return (
              <tr key={item.id}>
                <td>{item.entidad}</td>

                <td>
                  S/ {item.monto_solicitado}
                </td>

                <td>
                  S/ {saldoPendiente}
                </td>

                <td>
                  {cuotasFaltantes}
                </td>

                <td>
                  {item.fecha_proximo_pago}
                </td>

                <td>
                  {estadoAutomatico}
                </td>

                <td>
                  <button
                    onClick={() =>
                      registrarCuota(item)
                    }
                  >
                    💰
                  </button>

                  <button
                    onClick={() =>
                      eliminarFinanciamiento(
                        item.id
                      )
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Financiamientos;