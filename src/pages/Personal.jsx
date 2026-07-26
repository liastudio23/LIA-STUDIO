import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Personal() {
  const [personal, setPersonal] = useState([]);

  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState("Activo");

  const cargarPersonal = async () => {
    const { data, error } = await supabase
      .from("personal")
      .select("*")
      .order("nombre");

      console.log(data);
      console.log("ERROR:", error);

    if (error) {
      console.log(error);
      return;
    }

    setPersonal(data || []);
  };

  useEffect(() => {
    cargarPersonal();
  }, []);

  const guardarPersonal = async () => {
    const { error } = await supabase
      .from("personal")
      .insert([
        {
          nombre,
          especialidad,
          telefono,
          estado,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Error al guardar personal");
      return;
    }

    alert("Personal registrado");

    setNombre("");
    setEspecialidad("");
    setTelefono("");
    setEstado("Activo");

    cargarPersonal();
  };

  return (
    <div>
      <h1>👥 Personal</h1>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

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

        <option value="Productor General">
          🎬 Productor General
        </option>

        <option value="Camarógrafo">
          📹 Camarógrafo
        </option>

        <option value="Fotógrafo">
          📸 Fotógrafo
        </option>

        <option value="Editor">
          ✂️ Editor
        </option>

        <option value="Drone">
          🚁 Drone
        </option>

        <option value="Sonidista">
          🎤 Sonidista
        </option>
      </select>

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

      <select
        value={estado}
        onChange={(e) =>
          setEstado(e.target.value)
        }
      >
        <option value="Activo">
          ✅ Activo
        </option>

        <option value="Retirado">
          🚪 Retirado
        </option>
      </select>

      <br />
      <br />

      <button onClick={guardarPersonal}>
        Guardar Personal
      </button>

      <hr />

      <h2>Personal Registrado</h2>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
  {personal.map((persona) => (
    <tr key={persona.id}>
      <td>{persona.nombre}</td>

      <td>{persona.especialidad}</td>

      <td>{persona.telefono}</td>

      <td>
        {persona.estado === "Activo" ? (
          <span
            style={{
              color: "#22c55e",
              fontWeight: "bold",
            }}
          >
            ✅ Activo
          </span>
        ) : (
          <span
            style={{
              color: "#ef4444",
              fontWeight: "bold",
            }}
          >
            🚪 Retirado
          </span>
        )}
      </td>

      <td>
        <button>✏️</button>

        <button
          style={{
            marginLeft: "5px",
          }}
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

export default Personal;