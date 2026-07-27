import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Servicios() {
  const [servicio, setServicio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [monto, setMonto] = useState("");
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

   const marcarComoPagado = async (id) => {
  

  const { data, error } = await supabase
    .from("servicios")
    .update({
      estado: "Pagado",
    })
    .eq("id", id)
    .select();


 if (error) {
  alert(error.message);
  return;
}


cargarServicios();
};

  return (
    <div>
    

      <select
  value={servicio}
  onChange={(e) =>
    setServicio(e.target.value)
  }
>
  <option value="">
    Seleccione servicio
  </option>

  <option value="Luz">
    💡 Luz
  </option>

  <option value="Agua">
    🚿 Agua
  </option>

  <option value="Internet">
    🌐 Internet
  </option>

  <option value="Telefonía">
    📱 Telefonía
  </option>

  <option value="Adobe">
    💻 Adobe
  </option>

  <option value="Microsoft 365">
    📊 Microsoft 365
  </option>

  <option value="Envato Elements">
    🖼️ Envato Elements
  </option>

  <option value="Alquiler de oficina">
    🏢 Alquiler de oficina
  </option>

  <option value="Hosting">
    🖥️ Hosting
  </option>

  <option value="Dominio Web">
    🌍 Dominio Web
  </option>

  <option value="Otros">
    📦 Otros
  </option>
</select>

      <br />
      <br />

      <select
  value={categoria}
  onChange={(e) =>
    setCategoria(e.target.value)
  }
>
  <option value="">
    Seleccione categoría
  </option>

  <option value="Servicios Básicos">
    ⚡ Servicios Básicos
  </option>

  <option value="Software">
    💻 Software
  </option>

  <option value="Win">
    🌐 win
  </option>

  <option value="Telefonía">
    📱 Telefonía
  </option>

  <option value="Hosting">
    🖥️ Hosting
  </option>

  <option value="Suscripciones">
    🔄 Suscripciones
  </option>

  <option value="Otros">
    📦 Otros
  </option>
</select>

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
        value={fechaVencimiento}
        onChange={(e) =>
          setFechaVencimiento(e.target.value)
        }
      />

      <br />
      <br />

     <select
  value={estado}
  onChange={(e) =>
    setEstado(e.target.value)
  }
>
  <option value="">
    Seleccione estado
  </option>

  <option value="Pagado">
    ✅ Pagado
  </option>

  <option value="Pendiente">
    🟡 Pendiente
  </option>

  <option value="Vencido">
    🔴 Vencido
  </option>
</select>

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

            let estadoAutomatico;

if (item.estado === "Pagado") {
  estadoAutomatico = "✅ Pagado";
} else {
  estadoAutomatico = "🟢 Al día";

  if (diferenciaDias < 0) {
    estadoAutomatico = "🔴 Vencido";
  } else if (diferenciaDias <= 7) {
    estadoAutomatico = "🟡 Próximo a vencer";
  }
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
  {item.estado !== "Pagado" && (
    <button
      onClick={() =>
        marcarComoPagado(item.id)
      }
      style={{
        marginRight: "5px",
        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      ✅ Pagado
    </button>
  )}

  <button
    onClick={() =>
      eliminarServicio(item.id)
    }
    style={{
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
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