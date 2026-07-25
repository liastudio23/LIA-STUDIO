import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Servicios() {
  const [servicio, setServicio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [monto, setMonto] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [fechaVencimiento, setFechaVencimiento] =
    useState("");
  const [estado, setEstado] = useState("");
  const [observaciones, setObservaciones] =
    useState("");

  const [servicios, setServicios] = useState([]);

  const cargarServicios = async () => {
    const { data } = await supabase
      .from("servicios")
      .select("*")
      .order("id", { ascending: false });

    setServicios(data || []);
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  const guardarServicio = async () => {
    const { error } = await supabase
      .from("servicios")
      .insert([
        {
          servicio,
          categoria,
          monto,
          fecha_pago: fechaPago,
          fecha_vencimiento: fechaVencimiento,
          estado,
          observaciones,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Error al guardar servicio");
      return;
    }

    alert("Servicio guardado correctamente");

    cargarServicios();

    setServicio("");
    setCategoria("");
    setMonto("");
    setFechaPago("");
    setFechaVencimiento("");
    setEstado("");
    setObservaciones("");
  };

  const eliminarServicio = async (id) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar este servicio?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("servicios")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error al eliminar servicio");
      return;
    }

    cargarServicios();
  };

  return (
    <div>
      <h1>🧾 Servicios</h1>

      <br />

      <input
        type="text"
        placeholder="Servicio"
        value={servicio}
        onChange={(e) =>
          setServicio(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Categoría"
        value={categoria}
        onChange={(e) =>
          setCategoria(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) =>
          setMonto(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={fechaPago}
        onChange={(e) =>
          setFechaPago(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={fechaVencimiento}
        onChange={(e) =>
          setFechaVencimiento(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Estado"
        value={estado}
        onChange={(e) =>
          setEstado(e.target.value)
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

      <button onClick={guardarServicio}>
        Guardar Servicio
      </button>

      <hr />

      <h2>Servicios Registrados</h2>

      <table>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Categoría</th>
            <th>Monto</th>
            <th>Vencimiento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {servicios.map((item) => {
            const hoy = new Date();

            const fecha = new Date(
              item.fecha_vencimiento
            );

            const diferenciaDias =
              Math.ceil(
                (fecha - hoy) /
                  (1000 *
                    60 *
                    60 *
                    24)
              );

            let estadoAutomatico =
              "🟢 Al día";

            if (diferenciaDias < 0) {
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
                <td>{item.servicio}</td>

                <td>{item.categoria}</td>

                <td>
                  S/ {item.monto}
                </td>

                <td>
                  {
                    item.fecha_vencimiento
                  }
                </td>

                <td>
                  {estadoAutomatico}
                </td>

                <td>
                  <button
                    onClick={() =>
                      eliminarServicio(
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

export default Servicios;