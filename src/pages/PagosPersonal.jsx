import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function PagosPersonal() {
  const [proyectos, setProyectos] = useState([]);
  const [pagosPersonal, setPagosPersonal] = useState([]);
  const [personal, setPersonal] =
  useState([]);

  const [proyectoId, setProyectoId] = useState("");
  const [nombrePersonal, setNombrePersonal] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [monto, setMonto] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [estado, setEstado] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const cargarProyectos = async () => {
    const { data } = await supabase
      .from("proyectos")
      .select("*")
      .order("nombre");

    setProyectos(data || []);
  };

  const cargarPersonal = async () =>{
  const { data } = await supabase
    .from("personal")
    .select("*")
    .order("nombre");

  setPersonal(data || []);
};

const cargarPagosPersonal = async () => {
  const { data } = await supabase
   .from("pagos_personal")
    .select("*")
    .order("id", { ascending: false });

  setPagosPersonal(data || []);
};

 useEffect(() => {
  cargarProyectos();
  cargarPersonal();
  cargarPagosPersonal();
}, []);

  const guardarPagoPersonal = async () => {
    const { error } = await supabase
      .from("pagos_personal")
      .insert([
        {
          proyecto_id: proyectoId,
          nombre_personal: nombrePersonal,
          especialidad,
          monto,
          fecha_pago: fechaPago,
          estado,
          observaciones,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Error al guardar pago");
      return;
    }

    alert("Pago guardado correctamente");

    cargarPagosPersonal();

    setProyectoId("");
    setNombrePersonal("");
    setEspecialidad("");
    setMonto("");
    setFechaPago("");
    setEstado("");
    setObservaciones("");
  };

  const eliminarPagoPersonal = async (id) => {
  const confirmar = window.confirm(
    "¿Deseas eliminar este pago?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("pagos_personal")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    alert("Error al eliminar pago");
    return;
  }

  cargarPagosPersonal();
};

const marcarComoPagado = async (id) => {
  const { error } = await supabase
    .from("pagos_personal")
    .update({
      estado: "Pagado",
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  cargarPagosPersonal();
};

  return (
    <div>
      <h1>💵 Pagos de Personal</h1>

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

     <select
  value={nombrePersonal}
  onChange={(e) =>
    setNombrePersonal(e.target.value)
  }
>
  <option value="">
    Seleccione personal
  </option>

  {personal.map((item) => (
    <option
      key={item.id}
      value={item.nombre}
    >
      {item.nombre}
    </option>
  ))}
</select>

      <br />
      <br />

      <select
  value={especialidad}
  onChange={(e) =>
    setEspecialidad(e.target.value)
  }
>
  <option value="">
    Seleccione especialidad
  </option>

  <option value="Editor">
    🎬 Editor
  </option>

  <option value="Camarografo">
    📹 Camarógrafo
  </option>

  <option value="Fotografo">
    📸 Fotógrafo
  </option>

  <option value="Drone">
    🚁 Piloto de Drone
  </option>

  <option value="Sonidista">
    🎤 Sonidista
  </option>

  <option value="Disenador">
    🎨 Diseñador
  </option>

  <option value="Colorista">
    🎞️ Colorista
  </option>

  <option value="Productor">
    📋 Productor
  </option>

  <option value="Asistente">
    👨‍💼 Asistente
  </option>
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
        onChange={(e) =>
          setFechaPago(e.target.value)
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

  <option value="Parcial">
    🔵 Parcial
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

      <button onClick={guardarPagoPersonal}>
        Guardar Pago
      </button>

      <hr />

      <h2>Pagos Registrados</h2>

      <table>
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {pagosPersonal.map((pago) => (
            <tr key={pago.id}>
              <td>
                {
                  proyectos.find(
                    (proyecto) =>
                      proyecto.id === pago.proyecto_id
                  )?.nombre || "-"
                }
              </td>

              <td>{pago.nombre_personal}</td>
              <td>{pago.especialidad}</td>
              <td>S/ {pago.monto}</td>
              <td>{pago.fecha_pago}</td>
              <td>{pago.estado === "Pagado" ? (
              <span
              style={{
              color: "#22c55e",
             fontWeight: "bold",
      }}
    >
      ✅ Pagado
    </span>
  ) : (
    <span
      style={{
        color: "#facc15",
        fontWeight: "bold",
      }}
    >
      🟡 Pendiente
    </span>
  )}
</td>

<td>
  {pago.estado !== "Pagado" && (
    <button
      onClick={() =>
        marcarComoPagado(pago.id)
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
      ✅
    </button>
  )}

  <button
    onClick={() =>
      eliminarPagoPersonal(pago.id)
    }
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

export default PagosPersonal;