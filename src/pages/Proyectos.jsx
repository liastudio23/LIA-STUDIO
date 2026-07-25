import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Proyectos() {
  const [idEditando, setIdEditando] = useState(null);

  const [nombre, setNombre] = useState("");
  const [servicio, setServicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");

  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [proyectos, setProyectos] = useState([]);

  const cargarClientes = async () => {
    const { data } = await supabase
      .from("clientes")
      .select("*")
      .order("nombre");

    setClientes(data || []);
  };

  const cargarProyectos = async () => {
    const { data } = await supabase
      .from("proyectos")
      .select("*")
      .order("id", { ascending: false });

    setProyectos(data || []);
  };

  useEffect(() => {
    cargarClientes();
    cargarProyectos();
  }, []);

  const limpiarFormulario = () => {
    setIdEditando(null);
    setClienteId("");
    setNombre("");
    setServicio("");
    setDescripcion("");
    setPrecio("");
    setEstado("");
    setFechaEntrega("");
  };

  const guardarProyecto = async () => {
    if (!clienteId || !nombre) {
      alert(
        "Seleccione un cliente y escriba un nombre para el proyecto"
      );
      return;
    }

    if (idEditando) {
      const { error } = await supabase
        .from("proyectos")
        .update({
          cliente_id: clienteId,
          nombre,
          servicio,
          descripcion,
          precio,
          estado,
          fecha_entrega: fechaEntrega,
        })
        .eq("id", idEditando);

      if (error) {
        console.log(error);
        alert("Error al actualizar proyecto");
        return;
      }

      alert("Proyecto actualizado correctamente");
    } else {
      const { error } = await supabase
        .from("proyectos")
        .insert([
          {
            cliente_id: clienteId,
            nombre,
            servicio,
            descripcion,
            precio,
            estado,
            fecha_entrega: fechaEntrega,
          },
        ]);

      if (error) {
        console.log(error);
        alert("Error al guardar proyecto");
        return;
      }

      alert("Proyecto guardado correctamente");
    }

    limpiarFormulario();
    cargarProyectos();
  };

  const editarProyecto = (proyecto) => {
    setIdEditando(proyecto.id);

    setClienteId(proyecto.cliente_id);
    setNombre(proyecto.nombre || "");
    setServicio(proyecto.servicio || "");
    setDescripcion(proyecto.descripcion || "");
    setPrecio(proyecto.precio || "");
    setEstado(proyecto.estado || "");
    setFechaEntrega(
      proyecto.fecha_entrega || ""
    );
  };

  const eliminarProyecto = async (id) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar este proyecto?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("proyectos")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Error al eliminar proyecto");
      return;
    }

    cargarProyectos();
  };

  return (
    <div>
      <h1>🎬 Proyectos</h1>

      <br />

      <label>Cliente</label>

      <br />

      <select
        value={clienteId}
        onChange={(e) =>
          setClienteId(e.target.value)
        }
      >
        <option value="">
          Seleccione un cliente
        </option>

        {clientes.map((cliente) => (
          <option
            key={cliente.id}
            value={cliente.id}
          >
            {cliente.nombre}
          </option>
        ))}
      </select>

      <br />
      <br />

      <input
        type="text"
        placeholder="Nombre del proyecto"
        value={nombre}
        onChange={(e) =>
          setNombre(e.target.value)
        }
      />

      <br />
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

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) =>
          setDescripcion(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) =>
          setPrecio(e.target.value)
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

        <option value="🟡 Pendiente">
          🟡 Pendiente
        </option>

        <option value="🔵 Preproducción">
          🔵 Preproducción
        </option>

        <option value="🎥 Producción">
          🎥 Producción
        </option>

        <option value="📂 Ingesta y Respaldo">
          📂 Ingesta y Respaldo
        </option>

        <option value="✂️ Edición">
          ✂️ Edición
        </option>

        <option value="🎨 Color y Audio">
          🎨 Color y Audio
        </option>

        <option value="👀 Revisión Cliente">
          👀 Revisión Cliente
        </option>

        <option value="🔄 Correcciones">
          🔄 Correcciones
        </option>

        <option value="✅ Entregado">
          ✅ Entregado
        </option>

        <option value="🏁 Finalizado">
          🏁 Finalizado
        </option>

        <option value="🔴 Cancelado">
          🔴 Cancelado
        </option>
      </select>

      <br />
      <br />

      <input
        type="date"
        value={fechaEntrega}
        onChange={(e) =>
          setFechaEntrega(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={guardarProyecto}>
        {idEditando
          ? "Actualizar Proyecto"
          : "Guardar Proyecto"}
      </button>

      {idEditando && (
        <button
          onClick={limpiarFormulario}
          style={{ marginLeft: "10px" }}
        >
          Cancelar
        </button>
      )}

      <hr />

      <h2>Proyectos Registrados</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Proyecto</th>
            <th>Servicio</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {proyectos.map((proyecto) => (
            <tr key={proyecto.id}>
              <td>{proyecto.id}</td>

              <td>
                {
                  clientes.find(
                    (cliente) =>
                      cliente.id ===
                      proyecto.cliente_id
                  )?.nombre || "-"
                }
              </td>

              <td>{proyecto.nombre}</td>
              <td>{proyecto.servicio}</td>
              <td>S/ {proyecto.precio}</td>
              <td>{proyecto.estado}</td>

              <td>
                <button
                  onClick={() =>
                    editarProyecto(proyecto)
                  }
                >
                  ✏️
                </button>

                <button
                  onClick={() =>
                    eliminarProyecto(
                      proyecto.id
                    )
                  }
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

export default Proyectos;