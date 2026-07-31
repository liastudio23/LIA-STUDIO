"use client";

import { useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
    const [title, setTitle] = useState("");
    const [clientName, setClientName] = useState("");
    const [message, setMessage] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [driveLink, setDriveLink] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [referenceCode, setReferenceCode] = useState("");

    const generarEnlace = async () => {
        const token = crypto.randomUUID();
        const shortCode =
            "LIA-" +
            crypto.randomUUID()
                .replace(/-/g, "")
                .slice(0, 8)
                .toUpperCase();

        const { error } = await supabase
            .from("transfers")
            .insert([
                {
                    title,
                    client_name: clientName,
                    message,
                    public_token: token,
                    expires_at: expiresAt || null,
                    drive_link: driveLink,
                },
            ]);

        if (error) {
            console.error(error);
            alert("Error al crear la entrega");
            return;
        }

        const link = `${window.location.origin}/download/${token}`;
        setGeneratedLink(link);
        setReferenceCode(shortCode);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#000",
                textAlign: "center",
                paddingTop: "40px",
            }}
        >
            <img
                src="/logo-lia.png"
                alt="LIA Studio"
                style={{
                    width: "320px",
                    display: "block",
                    margin: "0 auto 20px auto",
                    
                }}
            ></img>

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
                    color: "#ffffff",
                    marginBottom: "20px",
                }}
            >
                Acceso seguro a archivos y entregables
            </p>

            <div
                style={{
                    backgroundColor: "#ffffff",
                    maxWidth: "600px",
                    margin: "0 auto",
                    padding: "30px",
                    borderRadius: "12px",
                }}
            >
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        color: "#000",
                        backgroundColor: "#fff",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        outline: "none",
                    }}
                />

                <input
                    type="text"
                    placeholder="Cliente"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    style={{
                        width: "100%",
                        minHeight: "50px",
                        padding: "12px",
                        marginBottom: "15px",
                        color: "#000",
                        backgroundColor: "#fff",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        resize: "vertical",
                    }}
                />

                <textarea
                    placeholder="Mensaje"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                        width: "100%",
                        minHeight: "50px",
                        padding: "12px",
                        marginBottom: "15px",
                        color: "#000",
                        backgroundColor: "#fff",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        resize: "vertical",
                    }}
                />

                <input
                    type="date"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    style={{
                        width: "100%",
                        minHeight: "50px",
                        padding: "12px",
                        marginBottom: "15px",
                        color: "#000",
                        backgroundColor: "#fff",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        resize: "vertical",
                    }}
                />

                <input
                    type="text"
                    placeholder="Enlace Google Drive"
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    style={{
                        width: "100%",
                        minHeight: "50px",
                        padding: "12px",
                        marginBottom: "10px",
                        color: "#000",
                        backgroundColor: "#fff",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        resize: "vertical",
                    }}
                />

                <button
                    onClick={generarEnlace}
                    style={{
                        width: "100%",
                        minHeight: "50px",
                        padding: "12px",
                        marginBottom: "15px",
                        color: "#000",
                        backgroundColor: "#fff",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        resize: "vertical",
                    }}
                >
                    Generar Enlace
                </button>

                {generatedLink && (
                    <div
                        style={{
                            marginTop: "20px",
                            backgroundColor: "#111827",
                            padding: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        <p
                            style={{
                                color: "#facc15",
                                fontWeight: "bold",
                            }}
                        >
                            ✅ Enlace generado
                        </p>

                        <div
                            style={{
                                color: "#ffffff",
                                marginTop: "10px",
                                fontSize: "20px",
                                fontWeight: "bold",
                                letterSpacing: "1px",
                            }}
                        >
                            {referenceCode}
                        </div>
                        <div
  style={{
    marginTop: "15px",
  }}
>
  <button
    onClick={() =>
      navigator.clipboard.writeText(generatedLink)
    }
    style={{
      backgroundColor: "#facc15",
      color: "#000",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      marginRight: "10px",
    }}
  >
    Copiar enlace
  </button>

  <button
    onClick={() => window.open(generatedLink, "_blank")}
    style={{
      backgroundColor: "#ffffff",
      color: "#000",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Ver entrega
  </button>
</div>
                    </div>
                )}
            </div>
        </div>
    );
}