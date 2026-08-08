import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Archivos() {
  const [proyectos, setProyectos] = useState([]);
  const [archivos, setArchivos] = useState([]);

  const [proyectoId, setProyectoId] = useState("");
  const [disco, setDisco] = useState("");
  const [carpeta, setCarpeta] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [respaldo, setRespaldo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const cargarProyectos = async () => {
    const { data } = await supabase
      .from("proyectos")
      .select("*")
      .order("nombre");

    setProyectos(data || []);
  };

  const cargarArchivos = async () => {
    const { data } = await supabase
      .from("archivos")
      .select("*")
      .order("id", { ascending: false });

    setArchivos(data || []);
  };

  useEffect(() => {
    cargarProyectos();
    cargarArchivos();
  }, []);

  const guardarArchivo = async () => {
    const { error } = await supabase
      .from("archivos")
      .insert([
        {
          proyecto_id: proyectoId,
          disco,
          carpeta,
          estado,
          respaldo,
          observaciones,
        }
      ]);

    if (error) {
      console.log(error);
      alert("Error al guardar archivo");
      return;
    }

    alert("Archivo guardado correctamente");

    cargarArchivos();

    setProyectoId("");
    setDisco("");
    setRutaRaw("");
    setRutaEdicion("");
    setRutaExportacion("");
    setRutaMaster("");
    setRespaldo("");
    setObservaciones("");
  };

  const eliminarArchivo = async (id) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar este registro?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("archivos")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Error al eliminar");
      return;
    }

    cargarArchivos();
  };

  return (
    <div>
      <h1>📁 Archivos</h1>

      <br />

      <select
        value={proyectoId}
        onChange={(e) =>
          setProyectoId(e.target.value)
        }
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
        placeholder="Disco"
        value={disco}
        onChange={(e) =>
          setDisco(e.target.value)
        }
      />
      <input
        type="text"
        placeholder="Carpeta"
        value={carpeta}
        onChange={(e) =>
          setCarpeta(e.target.value)
        }
      />
      <select
        value={estado}
        onChange={(e) =>
          setEstado(e.target.value)
        }
      >
        <option value="Activo">Activo</option>
        <option value="Finalizado">Finalizado</option>
        <option value="Archivado">Archivado</option>
      </select>

      <br />
      <br />

      <input
        type="text"
        placeholder="Respaldo"
        value={respaldo}
        onChange={(e) =>
          setRespaldo(e.target.value)
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

      <button onClick={guardarArchivo}>
        Guardar Archivo
      </button>

      <hr />

      <h2>Archivos Registrados</h2>

      <table>
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Disco</th>
            <th>Carpeta</th>
            <th>Estado</th>
            <th>Respaldo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {archivos.map((archivo) => (
            <tr key={archivo.id}>
              <td>
                {
                  proyectos.find(
                    (proyecto) =>
                      proyecto.id ===
                      archivo.proyecto_id
                  )?.nombre || "-"
                }
              </td>

              <td>{archivo.disco}</td>
              <td>{archivo.carpeta}</td>
              <td>{archivo.estado}</td>
              <td>{archivo.respaldo}</td>

              <td>
                <button
                  onClick={() =>
                    eliminarArchivo(
                      archivo.id
                    )
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

export default Archivos;