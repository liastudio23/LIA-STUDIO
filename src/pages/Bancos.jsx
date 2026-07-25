import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Bancos() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [saldoActual, setSaldoActual] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [bancos, setBancos] = useState([]);

  const cargarBancos = async () => {
    const { data } = await supabase
      .from("bancos")
      .select("*")
      .order("id", { ascending: false });

    setBancos(data || []);
  };

  useEffect(() => {
    cargarBancos();
  }, []);

  const guardarBanco = async () => {
    const { error } = await supabase
      .from("bancos")
      .insert([
        {
          nombre,
          tipo,
          saldo_actual: saldoActual,
          observaciones,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Error al guardar banco");
      return;
    }

    alert("Banco guardado correctamente");

    cargarBancos();

    setNombre("");
    setTipo("");
    setSaldoActual("");
    setObservaciones("");
  };

  const eliminarBanco = async (id) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar este banco?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("bancos")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Error al eliminar banco");
      return;
    }

    cargarBancos();
  };

  return (
    <div>
      <h1>🏦 Bancos</h1>

      <br />

      <input
        type="text"
        placeholder="Nombre del Banco"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Saldo Actual"
        value={saldoActual}
        onChange={(e) => setSaldoActual(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
      />

      <br />
      <br />

      <button onClick={guardarBanco}>
        Guardar Banco
      </button>

      <hr />

      <h2>Bancos Registrados</h2>

      <table>
        <thead>
          <tr>
            <th>Banco</th>
            <th>Tipo</th>
            <th>Saldo</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {bancos.map((banco) => (
            <tr key={banco.id}>
              <td>{banco.nombre}</td>
              <td>{banco.tipo}</td>
              <td>S/ {banco.saldo_actual}</td>
              <td>{banco.observaciones}</td>

              <td>
                <button
                  onClick={() =>
                    eliminarBanco(banco.id)
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

export default Bancos;