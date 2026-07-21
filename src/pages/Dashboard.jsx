import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Dashboard() {
  const [clientes, setClientes] = useState(0);
  const [proyectos, setProyectos] = useState(0);
  const [pagos, setPagos] = useState(0);
  const [gastos, setGastos] = useState(0);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const { count: totalClientes } = await supabase
      .from("clientes")
      .select("*", { count: "exact", head: true });

    const { count: totalProyectos } = await supabase
      .from("proyectos")
      .select("*", { count: "exact", head: true });

    const { data: pagosData } = await supabase
      .from("pagos")
      .select("monto");

    const { data: gastosData } = await supabase
      .from("gastos")
      .select("monto");

    const totalPagos =
      pagosData?.reduce(
        (acc, item) => acc + Number(item.monto),
        0
      ) || 0;

    const totalGastos =
      gastosData?.reduce(
        (acc, item) => acc + Number(item.monto),
        0
      ) || 0;

    setClientes(totalClientes || 0);
    setProyectos(totalProyectos || 0);
    setPagos(totalPagos);
    setGastos(totalGastos);
  };

<div className="dashboard-cards">
  <div className="card">
    <h3>👥 Clientes</h3>
    <p>{clientes}</p>
  </div>

  <div className="card">
    <h3>🎬 Proyectos</h3>
    <p>{proyectos}</p>
  </div>

  <div className="card">
    <h3>💰 Ingresos</h3>
    <p>S/ {pagos}</p>
  </div>

  <div className="card">
    <h3>💸 Gastos</h3>
    <p>S/ {gastos}</p>
  </div>

  <div className="card">
    <h3>📈 Utilidad</h3>
    <p>S/ {pagos - gastos}</p>

    
  </div>
</div>

  return (
    <div>
      <h1>📊 Dashboard</h1>

      <div className="dashboard-cards">
  <div className="card">
    <h3>👥 Clientes</h3>
    <p>{clientes}</p>
  </div>

  <div className="card">
    <h3>🎬 Proyectos</h3>
    <p>{proyectos}</p>
  </div>

  <div className="card">
    <h3>💰 Ingresos</h3>
    <p>S/ {pagos}</p>
  </div>

  <div className="card">
    <h3>💸 Gastos</h3>
    <p>S/ {gastos}</p>
  </div>

  <div className="card">
    <h3>📈 Utilidad</h3>
    <p>S/ {pagos - gastos}</p>
  </div>
</div>
    </div>
  );
}

export default Dashboard;