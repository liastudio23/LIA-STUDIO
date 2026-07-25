import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Archivos() {
  const [proyectos, setProyectos] = useState([]);
  const [archivos, setArchivos] = useState([]);

  const [proyectoId, setProyectoId] = useState("");
  const [disco, setDisco] = useState("");
  const [rutaRaw, setRutaRaw] = useState("");
  const [rutaEdicion, setRutaEdicion] = useState("");
  const [rutaExportacion, setRutaExportacion] = useState("");
  const [rutaMaster, setRutaMaster] = useState("");
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
          ruta_raw: rutaRaw,
          ruta_edicion: rutaEdicion,
          ruta_exportacion: rutaExportacion,
          ruta_master: rutaMaster,
          respaldo,
          observaciones,
        },
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

      <br />
      <br />

      <input
        type="text"
        placeholder="Ruta RAW"
        value={rutaRaw}
        onChange={(e) =>
          setRutaRaw(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Ruta Edición"
        value={rutaEdicion}
        onChange={(e) =>
          setRutaEdicion(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Ruta Exportación"
        value={rutaExportacion}
        onChange={(e) =>
          setRutaExportacion(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Ruta Master"
        value={rutaMaster}
        onChange={(e) =>
          setRutaMaster(e.target.value)
        }
      />

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
            <th>RAW</th>
            <th>Master</th>
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
              <td>{archivo.ruta_raw}</td>
              <td>{archivo.ruta_master}</td>
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