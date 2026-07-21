function Navbar({ setPagina }) {
  return (
    <div className="sidebar">
      <h2>🎬 Estudio Lia</h2>

      <ul>
        <li onClick={() => setPagina("dashboard")}>📊 Dashboard</li>

        <li onClick={() => setPagina("agenda")}>📅 Agenda</li>
        <li onClick={() => setPagina("clientes")}>👥 Clientes</li>
        <li onClick={() => setPagina("proyectos")}>🎬 Proyectos</li>
        <li onClick={() => setPagina("tareas")}>✅ Tareas</li>
        <li onClick={() => setPagina("archivos")}>🎥 Archivos</li>

        <li onClick={() => setPagina("pagos")}>💰 Pagos</li>
        <li onClick={() => setPagina("gastos")}>💸 Gastos</li>
        <li onClick={() => setPagina("pagosPersonal")}>💵 Pagos Personal</li>
        <li onClick={() => setPagina("bancos")}>🏦 Bancos</li>
        <li onClick={() => setPagina("financiamientos")}>💳 Financiamientos</li>

        <li onClick={() => setPagina("reportes")}>📄 Reportes</li>
      </ul>
    </div>
  );
}

export default Navbar;