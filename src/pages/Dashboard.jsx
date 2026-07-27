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
  const [pendientes, setPendientes] = useState(0);
  const [proceso, setProceso] = useState(0);
  const [terminadas, setTerminadas] = useState(0);
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

    const { data: bancosData } =
      await supabase
        .from("bancos")
        .select("*");

    const { data: tareasData } =
      await supabase
        .from("tareas")
        .select("*");

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
        .select("monto, estado");


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

    console.log("PERSONAL:", personalData);
    console.log(
      "ESTADOS PERSONAL:",
      personalData?.map(
        (item) => item.estado
      )
    );

    const totalPersonal =
      personalData
        ?.filter(
          (item) =>
            item.estado === "Pagado"

        )
        .reduce(
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

    const totalBancos =
      bancosData?.reduce(
        (acc, item) =>
          acc + Number(item.saldo_actual),
        0
      ) || 0;
    const tareasPendientes =
      tareasData?.filter(
        (item) => item.estado === "Pendiente"
      ).length || 0;

    const tareasProceso =
      tareasData?.filter(
        (item) => item.estado === "Proceso"
      ).length || 0;

    const tareasTerminadas =
      tareasData?.filter(
        (item) => item.estado === "Terminado"
      ).length || 0;

      console.log(
  "ESTADOS TAREAS:",
  tareasData?.map(
    (item) => item.estado
  )
);

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
    setPendientes(tareasPendientes);
    setProceso(tareasProceso);
    setTerminadas(tareasTerminadas);
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
          <h3>🏦 Saldo Bancario</h3>
          <p>{bancos}</p>
        </div>

        <div className="card">
          <h3>🟡 Pendientes</h3>
          <p>{pendientes}</p>
        </div>

        <div className="card">
          <h3>🔵 En Proceso</h3>
          <p>{proceso}</p>
        </div>

        <div className="card">
          <h3>✅ Terminadas</h3>
          <p>{terminadas}</p>
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