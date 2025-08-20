/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key).then((res) => res.json());
  return response;
}

export default function StatusPage() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000, // Atualiza a cada 5 segundos
  });

  const getFormattedDate = () => {
    if (!data || !data.updated_at) return null;
    return new Date(data.updated_at).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      dateStyle: "long",
      timeStyle: "medium",
    });
  };

  return (
    <>
      <Head>
        <title>Status</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <main className="main">
          <h1 className="title">Status do Sistema</h1>
          <p className="description">
            Informações sobre os serviços que rodam a aplicação.
          </p>

          <div className="status-card">
            {isLoading && <p>Carregando...</p>}
            {error && <p>Falha ao carregar os dados. Tente novamente.</p>}
            {data && (
              <>
                <p>
                  <strong>Verificado em:</strong> {getFormattedDate()}
                </p>
                <p>
                  <strong>Versão do Banco de Dados:</strong>{" "}
                  {data.dependencies.database.version}
                </p>
                <p>
                  <strong>Conexões Máximas:</strong>{" "}
                  {data.dependencies.database.max_connections}
                </p>
                <p>
                  <strong>Conexões Abertas:</strong>{" "}
                  {data.dependencies.database.opened_connections}
                </p>
              </>
            )}
          </div>
        </main>
      </div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Inter", sans-serif;
          color: #e1e1e6;
          overflow: hidden;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
            -45deg,
            #121214,
            #202024,
            #2c2c31,
            #000000
          );
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          text-align: center;
          padding: 0 2rem;
        }
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
          font-weight: 700;
          color: #e1e1e6;
        }
        .description {
          margin-top: 1rem;
          margin-bottom: 2.5rem;
          line-height: 1.5;
          font-size: 1.5rem;
          color: #a8a8b3;
          max-width: 600px;
        }
        .status-card {
          font-family: "JetBrains Mono", monospace;
          background-color: rgba(0, 0, 0, 0.2);
          border: 1px solid #323238;
          border-radius: 8px;
          padding: 1.5rem 2rem;
          text-align: left;
          min-width: 400px;
        }
        .status-card p {
          margin: 0.5rem 0;
          font-size: 1rem;
          color: #c4c4cc;
        }
        .status-card strong {
          color: #00b37e;
        }
        @media (max-width: 600px) {
          .title {
            font-size: 2.5rem;
          }
          .description {
            font-size: 1.2rem;
          }
          .status-card {
            min-width: 90%;
          }
        }
      `}</style>
    </>
  );
}
