import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Dashboard() {
  const [clientes, setClientes] = useState(0);
  const [proyectos, setProyectos] = useState(0);
  const [pagos, setPagos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [pagosPersonal, setPagosPersonal] = useState(0);
  const [servicios, setServicios] = useState(0);

  const [bancos, setBancos] = useState(0);
  const [tareas, setTareas] = useState(0);
  const [agenda, setAgenda] = useState(0);
  const [deudaPendiente, setDeudaPendiente] =
    useState(0);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const { count: totalClientes } =
      await supabase
        .from("clientes")
        .select("*", {
          count: "exact",
          head: true,
        });

    const { count: totalProyectos } =
      await supabase
        .from("proyectos")
        .select("*", {
          count: "exact",
          head: true,
        });

    const { count: totalBancos } =
      await supabase
        .from("bancos")
        .select("*", {
          count: "exact",
          head: true,
        });

    const { count: totalTareas } =
      await supabase
        .from("tareas")
        .select("*", {
          count: "exact",
          head: true,
        });

    const { count: totalAgenda } =
      await supabase
        .from("agenda")
        .select("*", {
          count: "exact",
          head: true,
        });

    const { data: pagosData } =
      await supabase
        .from("pagos")
        .select("monto");

    const { data: gastosData } =
      await supabase
        .from("gastos")
        .select("monto");

    const { data: personalData } =
      await supabase
        .from("pagos_personal")
        .select("monto");

    const { data: serviciosData } =
      await supabase
        .from("servicios")
        .select("*");

    const { data: financiamientosData } =
      await supabase
        .from("financiamientos")
        .select(
          "monto_solicitado, cuota_mensual, cuotas_pagadas"
        );

    const totalPagos =
      pagosData?.reduce(
        (acc, item) =>
          acc + Number(item.monto),
        0
      ) || 0;

    const totalGastos =
      gastosData?.reduce(
        (acc, item) =>
          acc + Number(item.monto),
        0
      ) || 0;

    const totalPersonal =
      personalData?.reduce(
        (acc, item) =>
          acc + Number(item.monto),
        0
      ) || 0;

    const totalServicios =
  serviciosData
    ?.filter(
      (item) =>
        item.estado === "Pagado"
    )
    .reduce(
      (acc, item) =>
        acc + Number(item.monto),
      0
    ) || 0;


    const deuda =
      financiamientosData?.reduce(
        (acc, item) =>
          acc +
          (
            Number(item.monto_solicitado) -
            Number(item.cuotas_pagadas) *
              Number(item.cuota_mensual)
          ),
        0
      ) || 0;

    setClientes(totalClientes || 0);
    setProyectos(totalProyectos || 0);

    setPagos(totalPagos);
    setGastos(totalGastos);
    setPagosPersonal(totalPersonal);
    setServicios(totalServicios);

    setBancos(totalBancos || 0);
    setTareas(totalTareas || 0);
    setAgenda(totalAgenda || 0);

    setDeudaPendiente(deuda);
  };

  const utilidadReal =
    pagos -
    gastos -
    pagosPersonal -
    servicios;

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
          <h3>💵 Personal</h3>
          <p>S/ {pagosPersonal}</p>
        </div>

        <div className="card">
          <h3>🧾 Gastos fijos</h3>
          <p>S/ {servicios}</p>
        </div>

        <div className="card">
          <h3>📈 Utilidad Real</h3>
          <p>S/ {utilidadReal}</p>
        </div>

        <div className="card">
          <h3>🏦 Bancos</h3>
          <p>{bancos}</p>
        </div>

        <div className="card">
          <h3>✅ Tareas</h3>
          <p>{tareas}</p>
        </div>

        <div className="card">
          <h3>📅 Agenda</h3>
          <p>{agenda}</p>
        </div>

        <div className="card">
          <h3>💳 Deuda Pendiente</h3>
          <p>S/ {deudaPendiente}</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;