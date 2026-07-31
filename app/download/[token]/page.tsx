import { supabase } from "@/app/lib/supabase";

export default async function DownloadPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;

    const { data } = await supabase
        .from("transfers")
        .select("*")
        .eq("public_token", token)
        .single();

    if (!data) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#0000",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                }}
            >
                Transferencia no encontrada
            </div>
        );
    }

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

            <h2
  style={{
    color: "#facc15",
    fontSize: "32px",
    marginBottom: "10px",
  }}
>
  Centro de Descargas
</h2>

<h1
  style={{
    color: "#ffffff",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  }}
>
  {data.title}
</h1>

            <p
                style={{
                    color: "#555",
                    marginBottom: "15px",
                }}
            >
                Compartido con {data.client_name}
            </p>

            <p
                style={{
                    color: "#333",
                    maxWidth: "500px",
                    marginBottom: "25px",
                    lineHeight: "1.6",
                }}
            >
                {data.message}
            </p>

            <p
                style={{
                    color: "#666",
                    marginBottom: "30px",
                }}
            >
                Acceso disponible hasta: {data.expires_at}
            </p>

            <a
                href={data.drive_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: "inline-block",
                    backgroundColor: "#facc15",
                    color: "#000",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "bold",
                }}
            >
                DESCARGAR ARCHIVOS
            </a>

 </div>
);
}