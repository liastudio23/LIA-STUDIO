import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function ControlHoras() {
  const [proyectos, setProyectos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [registros, setRegistros] = useState([]);

  const [proyectoId, setProyectoId] = useState("");
  const [tareaId, setTareaId] = useState("");
  const [personalId, setPersonalId] = useState("");
  const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [observacion, setObservacion] = useState("");

  const cargarDatos = async () => {
    const { data: proyectosData } = await supabase
      .from("proyectos")
      .select("*")
      .order("id", { ascending: false });

    const { data: tareasData } = await supabase
      .from("tareas")
      .select("*")
      .order("id", { ascending: false });

    const { data: personalData } = await supabase
      .from("personal")
      .select("*")
      .order("nombre");

    const { data: horasData } = await supabase
      .from("control_horas")
      .select("*")
      .order("id", { ascending: false });

    setProyectos(proyectosData || []);
    setTareas(tareasData || []);
    setPersonal(personalData || []);
    setRegistros(horasData || []);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const formatearHora = (fechaHora) => {
    if (!fechaHora) return "-";

    return new Date(fechaHora).toLocaleTimeString("es-PE", {
      timeZone: "America/Lima",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatearDuracion = (registro) => {
    let minutos = Number(registro.minutos_acumulados || 0);

    if (
      minutos === 0 &&
      registro.hora_inicio &&
      registro.hora_fin
    ) {
      const inicio = new Date(registro.hora_inicio);
      const fin = new Date(registro.hora_fin);

      minutos = Math.max(
        0,
        (fin - inicio) / 1000 / 60
      );
    }

    const horas = Math.floor(minutos / 60);
    const minutosRestantes = Math.round(minutos % 60);

    return `${horas} h ${minutosRestantes} min`;
  };

  const tareasFiltradas = proyectoId
    ? tareas.filter(
        (tarea) =>
          String(tarea.proyecto_id) === String(proyectoId)
      )
    : tareas;

  const obtenerNombreProyecto = (id) => {
    const proyecto = proyectos.find(
      (item) => String(item.id) === String(id)
    );

    return (
      proyecto?.nombre ||
      proyecto?.nombre_proyecto ||
      proyecto?.proyecto ||
      `Proyecto ${id}`
    );
  };

  const obtenerNombreTarea = (id) => {
    const tarea = tareas.find(
      (item) => String(item.id) === String(id)
    );

    return (
      tarea?.titulo ||
      tarea?.tarea ||
      tarea?.nombre ||
      `Tarea ${id}`
    );
  };

  const obtenerNombrePersonal = (id) => {
    const persona = personal.find(
      (item) => String(item.id) === String(id)
    );

    return persona?.nombre || `Personal ${id}`;
  };

  const registrarControl = async () => {
    if (!proyectoId || !tareaId || !personalId || !fecha) {
      alert("Completa proyecto, tarea, personal y fecha");
      return;
    }

    const { error } = await supabase
      .from("control_horas")
      .insert([
        {
          proyecto_id: Number(proyectoId),
          tarea_id: Number(tareaId),
          personal_id: Number(personalId),
          fecha,
          hora_inicio: null,
          hora_fin: null,
          horas_trabajadas: 0,
          minutos_acumulados: 0,
          ultima_reanudacion: null,
          estado: "Pendiente",
          observacion,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setProyectoId("");
    setTareaId("");
    setPersonalId("");
    setFecha(new Date().toISOString().split("T")[0]);
    setObservacion("");

    cargarDatos();
  };

  const iniciarTrabajo = async (registro) => {
    const ahora = new Date().toISOString();

    const { error } = await supabase
      .from("control_horas")
      .update({
        estado: "En curso",
        hora_inicio: registro.hora_inicio || ahora,
        ultima_reanudacion: ahora,
      })
      .eq("id", registro.id);

    if (error) {
      alert(error.message);
      return;
    }

    cargarDatos();
  };

  const pausarTrabajo = async (registro) => {
    if (!registro.ultima_reanudacion) {
      alert("No hay hora de reanudación registrada");
      return;
    }

    const ahora = new Date();

    const ultimaReanudacion = new Date(
      registro.ultima_reanudacion
    );

    const minutosSesion = Math.max(
      0,
      (ahora - ultimaReanudacion) / 1000 / 60
    );

    const minutosTotales =
      Number(registro.minutos_acumulados || 0) +
      minutosSesion;

    const horasTrabajadas = minutosTotales / 60;

    const { error } = await supabase
      .from("control_horas")
      .update({
        estado: "Pausado",
        minutos_acumulados: minutosTotales,
        horas_trabajadas: horasTrabajadas,
        ultima_reanudacion: null,
      })
      .eq("id", registro.id);

    if (error) {
      alert(error.message);
      return;
    }

    cargarDatos();
  };

  const reanudarTrabajo = async (registro) => {
    const ahora = new Date().toISOString();

    const { error } = await supabase
      .from("control_horas")
      .update({
        estado: "En curso",
        ultima_reanudacion: ahora,
      })
      .eq("id", registro.id);

    if (error) {
      alert(error.message);
      return;
    }

    cargarDatos();
  };

  const finalizarTrabajo = async (registro) => {
    const ahora = new Date();

    let minutosTotales = Number(
      registro.minutos_acumulados || 0
    );

    if (
      registro.estado === "En curso" &&
      registro.ultima_reanudacion
    ) {
      const ultimaReanudacion = new Date(
        registro.ultima_reanudacion
      );

      const minutosSesion = Math.max(
        0,
        (ahora - ultimaReanudacion) / 1000 / 60
      );

      minutosTotales += minutosSesion;
    }

    const horasTrabajadas = minutosTotales / 60;

    const { error } = await supabase
      .from("control_horas")
      .update({
        estado: "Finalizado",
        hora_fin: ahora.toISOString(),
        minutos_acumulados: minutosTotales,
        horas_trabajadas: horasTrabajadas,
        ultima_reanudacion: null,
      })
      .eq("id", registro.id);

    if (error) {
      alert(error.message);
      return;
    }

    cargarDatos();
  };

  const eliminarRegistro = async (id) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar este registro de horas?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("control_horas")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    cargarDatos();
  };

  const totalMinutos = registros.reduce(
    (acc, item) =>
      acc + Number(item.minutos_acumulados || 0),
    0
  );

  const totalHoras = totalMinutos / 60;

  return (
    <div>
      <h1>⏱️ Control de Horas</h1>

      <p>
        Registra el tiempo trabajado por proyecto, tarea y personal.
      </p>

      <hr />

      <h2>Nuevo registro</h2>

      <select
        value={proyectoId}
        onChange={(e) => {
          setProyectoId(e.target.value);
          setTareaId("");
        }}
      >
        <option value="">Seleccione proyecto</option>

        {proyectos.map((proyecto) => (
          <option key={proyecto.id} value={proyecto.id}>
            {proyecto.nombre ||
              proyecto.nombre_proyecto ||
              proyecto.proyecto ||
              `Proyecto ${proyecto.id}`}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select
        value={tareaId}
        onChange={(e) => setTareaId(e.target.value)}
      >
        <option value="">Seleccione tarea</option>

        {tareasFiltradas.map((tarea) => (
          <option key={tarea.id} value={tarea.id}>
            {tarea.titulo ||
              tarea.tarea ||
              tarea.nombre ||
              `Tarea ${tarea.id}`}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select
        value={personalId}
        onChange={(e) => setPersonalId(e.target.value)}
      >
        <option value="">Seleccione personal</option>

        {personal.map((persona) => (
          <option key={persona.id} value={persona.id}>
            {persona.nombre}
          </option>
        ))}
      </select>

      <br />
      <br />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
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

      <button onClick={registrarControl}>
        💾 Registrar Horas
      </button>

      <hr />

      <h2>Resumen</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div className="card">
          <h3>⏱️ Horas Totales</h3>
          <p>{totalHoras.toFixed(2)} h</p>
        </div>

        <div className="card">
          <h3>📋 Registros</h3>
          <p>{registros.length}</p>
        </div>
      </div>

      <hr />

      <h2>Registros de horas</h2>

      <table>
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Tarea</th>
            <th>Personal</th>
            <th>Fecha</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Tiempo</th>
            <th>Estado</th>
            <th>Observación</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id}>
              <td>
                {obtenerNombreProyecto(
                  registro.proyecto_id
                )}
              </td>

              <td>
                {obtenerNombreTarea(
                  registro.tarea_id
                )}
              </td>

              <td>
                {obtenerNombrePersonal(
                  registro.personal_id
                )}
              </td>

              <td>{registro.fecha}</td>

              <td>{formatearHora(registro.hora_inicio)}</td>

              <td>{formatearHora(registro.hora_fin)}</td>

              <td>{formatearDuracion(registro)}</td>

              <td>
                {registro.estado === "Pendiente" &&
                  "🟡 Pendiente"}

                {registro.estado === "En curso" &&
                  "🔵 En curso"}

                {registro.estado === "Pausado" &&
                  "⏸️ Pausado"}

                {registro.estado === "Finalizado" &&
                  "✅ Finalizado"}
              </td>

              <td>{registro.observacion}</td>

              <td>
                {registro.estado === "Pendiente" && (
                  <button
                    onClick={() =>
                      iniciarTrabajo(registro)
                    }
                    style={{ marginRight: "5px" }}
                  >
                    ▶️
                  </button>
                )}

                {registro.estado === "En curso" && (
                  <>
                    <button
                      onClick={() =>
                        pausarTrabajo(registro)
                      }
                      style={{ marginRight: "5px" }}
                    >
                      ⏸️
                    </button>

                    <button
                      onClick={() =>
                        finalizarTrabajo(registro)
                      }
                      style={{ marginRight: "5px" }}
                    >
                      ⏹️
                    </button>
                  </>
                )}

                {registro.estado === "Pausado" && (
                  <>
                    <button
                      onClick={() =>
                        reanudarTrabajo(registro)
                      }
                      style={{ marginRight: "5px" }}
                    >
                      ▶️
                    </button>

                    <button
                      onClick={() =>
                        finalizarTrabajo(registro)
                      }
                      style={{ marginRight: "5px" }}
                    >
                      ⏹️
                    </button>
                  </>
                )}

                <button
                  onClick={() =>
                    eliminarRegistro(registro.id)
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

export default ControlHoras;