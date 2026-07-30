export default function Home() {
    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#000",
                textAlign: "center",
                paddingTop: "60px",
            }}
        >
            <img
                src="/logo-lia.png"
                alt="LIA Studios"
                style={{
                    width: "250px",
                    display: "block",
                    margin: "0 auto 20px auto",
                }}
            />

            <h1
                style={{
                    color: "#facc15",
                    fontSize: "48px",
                    fontWeight: "bold",
                }}
            >

                LIA Client Portal
            </h1>

            <p
                style={{
                    color: "white",
                    fontSize: "18px",
                }}
            >
                Acceso seguro a archivos, entregables y documentación.
            </p>

            <div
  style={{
    backgroundColor: "white",
    maxWidth: "600px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "10px",
  }}
>
  <h2
  style={{
    color: "#000",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  }}
>
  Crear Nueva Entrega
</h2>

  <input
    type="text"
    placeholder="Título"
    style={{
  width: "100%",
  padding: "14px",
  marginBottom: "10px",
  color: "#000",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
}}
  />

  <input
    type="text"
    placeholder="Cliente"
    style={{
  width: "100%",
  padding: "14px",
  marginBottom: "10px",
  color: "#000",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
}}
  />

  <input
    type="email"
    placeholder="Correo"
    style={{
  width: "100%",
  padding: "14px",
  marginBottom: "10px",
  color: "#000",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
}}
  />
  <textarea
  placeholder="Mensaje"
  style={{
    width: "100%",
    padding: "14px",
    marginBottom: "10px",
    color: "#000",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    minHeight: "100px",
  }}
/>
<input
  type="date"
  style={{
    width: "100%",
    padding: "14px",
    marginBottom: "10px",
    color: "#000",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
  }}
/>
  

  <button
    style={{
      backgroundColor: "#facc15",
      border: "none",
      padding: "12px 20px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Crear Transferencia
  </button>
</div>
        </div>
    );
}