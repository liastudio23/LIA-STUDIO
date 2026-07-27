import { useState } from "react";

function CostosProduccion() {
  const [tipoProduccion, setTipoProduccion] =
    useState("");

  // PERSONAL
  const [cargoPersonal, setCargoPersonal] =
    useState("");

  const [tarifaHora, setTarifaHora] =
    useState("");

  const [horasPersonal, setHorasPersonal] =
    useState("");

  const [personalItems, setPersonalItems] =
    useState([]);

  // OPERATIVOS
  const [conceptoOperativo, setConceptoOperativo] =
    useState("");

  const [montoOperativo, setMontoOperativo] =
    useState("");

  const [operativoItems, setOperativoItems] =
    useState([]);

  // TECNICOS
  const [conceptoTecnico, setConceptoTecnico] =
    useState("");

  const [montoTecnico, setMontoTecnico] =
    useState("");

  const [tecnicoItems, setTecnicoItems] =
    useState([]);

  const [margen, setMargen] =
    useState(20);

  // PERSONAL

  const agregarPersonal = () => {
    if (
      !cargoPersonal ||
      !tarifaHora ||
      !horasPersonal
    )
      return;

    const total =
      Number(tarifaHora) *
      Number(horasPersonal);

    setPersonalItems([
      ...personalItems,
      {
        cargo: cargoPersonal,
        tarifa: Number(tarifaHora),
        horas: Number(horasPersonal),
        total,
      },
    ]);

    setCargoPersonal("");
    setTarifaHora("");
    setHorasPersonal("");
  };

  const eliminarPersonal = (index) => {
    setPersonalItems(
      personalItems.filter(
        (_, i) => i !== index
      )
    );
  };

  // OPERATIVOS

  const agregarOperativo = () => {
    if (
      !conceptoOperativo ||
      !montoOperativo
    )
      return;

    setOperativoItems([
      ...operativoItems,
      {
        concepto:
          conceptoOperativo,
        monto: Number(
          montoOperativo
        ),
      },
    ]);

    setConceptoOperativo("");
    setMontoOperativo("");
  };

  const eliminarOperativo = (
    index
  ) => {
    setOperativoItems(
      operativoItems.filter(
        (_, i) => i !== index
      )
    );
  };

  // TECNICOS

  const agregarTecnico = () => {
    if (
      !conceptoTecnico ||
      !montoTecnico
    )
      return;

    setTecnicoItems([
      ...tecnicoItems,
      {
        concepto:
          conceptoTecnico,
        monto: Number(
          montoTecnico
        ),
      },
    ]);

    setConceptoTecnico("");
    setMontoTecnico("");
  };

  const eliminarTecnico = (
    index
  ) => {
    setTecnicoItems(
      tecnicoItems.filter(
        (_, i) => i !== index
      )
    );
  };

  // LIMPIAR

  const limpiarFormulario = () => {
    setTipoProduccion("");
    setCargoPersonal("");
    setTarifaHora("");
    setHorasPersonal("");
    setPersonalItems([]);

    setConceptoOperativo("");
    setMontoOperativo("");
    setOperativoItems([]);

    setConceptoTecnico("");
    setMontoTecnico("");
    setTecnicoItems([]);

    setMargen(20);
  };

  // CALCULOS

  const costoPersonal =
    personalItems.reduce(
      (acc, item) =>
        acc + item.total,
      0
    );

  const costoOperativo =
    operativoItems.reduce(
      (acc, item) =>
        acc + item.monto,
      0
    );

  const costoTecnico =
    tecnicoItems.reduce(
      (acc, item) =>
        acc + item.monto,
      0
    );

  const costoTotal =
    costoPersonal +
    costoOperativo +
    costoTecnico;

  const precioSugerido =
    costoTotal *
    (1 + margen / 100);

  const utilidad =
    precioSugerido -
    costoTotal;

  const imprimirPresupuesto = () => {
    window.print();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        🎥 Costos de Producción
      </h1>

      <hr />

      <h2>
        📋 Tipo de Producción
      </h2>

      <select
        value={tipoProduccion}
        onChange={(e) =>
          setTipoProduccion(
            e.target.value
          )
        }
      >
        <option value="">
          Seleccione tipo
        </option>
        <option value="Videoclip">
          🎬 Videoclip
        </option>
        <option value="Evento Social">
          💍 Evento Social
        </option>
        <option value="Diseño">
          🎨 Diseño
        </option>
        <option value="Publicidad">
          📢 Publicidad
        </option>
        <option value="Streaming">
          🎥 Streaming
        </option>
      </select>

      <hr />

      <h2>👥 Personal</h2>

      <select
        value={cargoPersonal}
        onChange={(e) =>
          setCargoPersonal(
            e.target.value
          )
        }
      >
        <option value="">
          Seleccione cargo
        </option>

        <option value="Director">
          🎬 Director
        </option>

        <option value="Productor">
          📋 Productor
        </option>

        <option value="Camarógrafo">
          📹 Camarógrafo
        </option>

        <option value="Fotógrafo">
          📸 Fotógrafo
        </option>

        <option value="Dronero">
          🚁 Dronero
        </option>

        <option value="Editor">
          ✂️ Editor
        </option>

        <option value="Sonidista">
          🎤 Sonidista
        </option>

        <option value="Diseñador">
          🎨 Diseñador
        </option>

        <option value="Iluminador">
          💡 Iluminador
        </option>

        <option value="Operador Cámara">
          🎥 Operador Cámara
        </option>

        <option value="Asistente Producción">
          🎬 Asistente Producción
        </option>

        <option value="Community Manager">
          📱 Community Manager
        </option>

        <option value="Locutor">
          🎙️ Locutor
        </option>

        <option value="Musicalizador">
          🎼 Musicalizador
        </option>
      </select>

      <input
        type="number"
        placeholder="S/Hora"
        value={tarifaHora}
        onChange={(e) =>
          setTarifaHora(
            e.target.value
          )
        }
      />

      <input
        type="number"
        placeholder="Horas"
        value={horasPersonal}
        onChange={(e) =>
          setHorasPersonal(
            e.target.value
          )
        }
      />

      <button onClick={agregarPersonal}>
        ➕ Agregar
      </button>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Cargo</th>
            <th>S/Hora</th>
            <th>Horas</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {personalItems.map(
            (item, index) => (
              <tr key={index}>
                <td>{item.cargo}</td>
                <td>S/ {item.tarifa}</td>
                <td>{item.horas}</td>
                <td>S/ {item.total}</td>
                <td>
                  <button
                    onClick={() =>
                      eliminarPersonal(
                        index
                      )
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <h3>
        👥 Subtotal Personal:
        S/ {costoPersonal.toFixed(2)}
      </h3>

      <hr />

      <h2>🚗 Operativos</h2>

      <select
        value={conceptoOperativo}
        onChange={(e) =>
          setConceptoOperativo(
            e.target.value
          )
        }
      >
        <option value="">
          Seleccione concepto
        </option>

        <option value="Movilidad">
          🚐 Movilidad
        </option>

        <option value="Alimentación">
          🍽️ Alimentación
        </option>

        <option value="Hospedaje">
          🏨 Hospedaje
        </option>

        <option value="Combustible">
          ⛽ Combustible
        </option>

        <option value="Peajes">
          🛣️ Peajes
        </option>

        <option value="Locación">
          🏢 Locación
        </option>

        <option value="Permisos">
          📄 Permisos
        </option>

        <option value="Transporte Equipos">
          🚚 Transporte Equipos
        </option>

        <option value="Envíos">
          📦 Envíos
        </option>

        <option value="Otros">
          📦 Otros
        </option>
      </select>

      <input
        type="number"
        placeholder="Monto"
        value={montoOperativo}
        onChange={(e) =>
          setMontoOperativo(
            e.target.value
          )
        }
      />

      <button onClick={agregarOperativo}>
        ➕ Agregar
      </button>

      <table border="1" width="100%">
        <tbody>
          {operativoItems.map(
            (item, index) => (
              <tr key={index}>
                <td>{item.concepto}</td>
                <td>S/ {item.monto}</td>
                <td>
                  <button
                    onClick={() =>
                      eliminarOperativo(
                        index
                      )
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <h3>
        🚗 Subtotal Operativo:
        S/ {costoOperativo.toFixed(2)}
      </h3>

      <hr />

      <h2>🛠 Técnicos</h2>

      <select
        value={conceptoTecnico}
        onChange={(e) =>
          setConceptoTecnico(
            e.target.value
          )
        }
      >
        <option value="">
          Seleccione concepto
        </option>

        <option value="Alquiler Equipos">
          🎥 Alquiler Equipos
        </option>

        <option value="Adobe">
          💻 Adobe
        </option>

        <option value="Internet">
          🌐 Internet
        </option>

        <option value="Licencias">
          📄 Licencias
        </option>

        <option value="Disco Duro">
          💾 Disco Duro
        </option>

        <option value="USB">
          🔌 USB
        </option>

        <option value="Baterías">
          🔋 Baterías
        </option>

        <option value="Iluminación">
          💡 Iluminación
        </option>

        <option value="Audio">
          🎤 Audio
        </option>

        <option value="Accesorios Cámara">
          📷 Accesorios Cámara
        </option>

        <option value="Otros">
          📦 Otros
        </option>
      </select>

      <input
        type="number"
        placeholder="Monto"
        value={montoTecnico}
        onChange={(e) =>
          setMontoTecnico(
            e.target.value
          )
        }
      />

      <button onClick={agregarTecnico}>
        ➕ Agregar
      </button>

      <table border="1" width="100%">
        <tbody>
          {tecnicoItems.map(
            (item, index) => (
              <tr key={index}>
                <td>{item.concepto}</td>
                <td>S/ {item.monto}</td>
                <td>
                  <button
                    onClick={() =>
                      eliminarTecnico(
                        index
                      )
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <h3>
        🛠 Subtotal Técnico:
        S/ {costoTecnico.toFixed(2)}
      </h3>

      <hr />

      <h2>📈 Margen (%)</h2>

      <input
        type="number"
        value={margen}
        onChange={(e) =>
          setMargen(
            Number(
              e.target.value
            )
          )
        }
      />

      <hr />

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            padding: "20px",
            border:
              "1px solid #555",
            borderRadius: "10px",
          }}
        >
          <h3>💰 Costo Total</h3>
          <h2>
            S/
            {costoTotal.toFixed(2)}
          </h2>
        </div>

        <div
          style={{
            padding: "20px",
            border:
              "1px solid #22c55e",
            borderRadius: "10px",
          }}
        >
          <h3>
            📈 Precio Sugerido
          </h3>
          <h2>
            S/
            {precioSugerido.toFixed(
              2
            )}
          </h2>
        </div>

        <div
          style={{
            padding: "20px",
            border:
              "1px solid #facc15",
            borderRadius: "10px",
          }}
        >
          <h3>🏆 Utilidad</h3>
          <h2>
            S/
            {utilidad.toFixed(2)}
          </h2>
        </div>
      </div>

      <br />

      <button
        onClick={
          imprimirPresupuesto
        }
      >
        🖨️ Imprimir
      </button>

      <button
        onClick={
          limpiarFormulario
        }
        style={{
          marginLeft: "10px",
        }}
      >
        🧹 Limpiar
      </button>
    </div>
  );
}

export default CostosProduccion;