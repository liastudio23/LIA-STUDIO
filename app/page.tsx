"use client";

import { useState } from "react";
import { supabase } from "./lib/supabase";
export default function Home() {
    const [title, setTitle] = useState("");
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [message, setMessage] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);

    const crearTransferencia = async () => {
        const token = crypto.randomUUID();
        console.log("Archivos seleccionados:", files);
        alert(`Archivos seleccionados: ${files?.length || 0}`);

        const { error } = await supabase
            .from("transfers")
            .insert([
                {
                    title,
                    client_name: clientName,
                    client_email: clientEmail,
                    message,
                    public_token: token,
                    expires_at: expiresAt,
                },
            ]);

        if (error) {
            console.error(error);
            alert("Error al crear transferencia");
            return;
        }

        alert("Transferencia creada correctamente");

        setTitle("");
        setClientName("");
        setClientEmail("");
        setMessage("");
        setExpiresAt("");
    };
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
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
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
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
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "10px",
                        color: "#000",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                    }}
                />

                <button
                    onClick={crearTransferencia}
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