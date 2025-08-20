/* eslint-disable @next/next/no-page-custom-font */
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [subtitle, setSubtitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const fullSubtitle =
    "Um lugar para o conteúdo que importa no mundo da programação.";

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setSubtitle((currentSubtitle) => {
        if (currentSubtitle.length === fullSubtitle.length) {
          clearInterval(typingInterval);
          return currentSubtitle;
        }
        return fullSubtitle.slice(0, currentSubtitle.length + 1);
      });
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <>
      <Head>
        <title>Em Construção</title>
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
          <div className="icon-container">
            <span className="code-symbol">&lt;/&gt;</span>
            <span className="blinking-cursor-icon"></span>
          </div>
          <h1 className="title">Estamos construindo algo novo.</h1>
          <p className="description">
            {subtitle}
            <span
              className={
                showCursor && subtitle.length === fullSubtitle.length
                  ? "blinking-cursor-text"
                  : "hidden"
              }
            >
              |
            </span>
          </p>
        </main>
      </div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
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

        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 4rem;
          color: #00b37e;
        }

        .blinking-cursor-icon {
          display: inline-block;
          width: 10px;
          height: 4rem;
          background-color: #00b37e;
          animation: blink 1s step-start infinite;
          margin-left: 0.5rem;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
          font-weight: 700;
          color: #e1e1e6;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          font-family: "JetBrains Mono", monospace;
          color: #a8a8b3;
          height: 60px;
          max-width: 600px;
        }

        .blinking-cursor-text {
          animation: blink 1s step-start infinite;
          font-weight: bold;
          color: #a8a8b3;
        }

        .hidden {
          visibility: hidden;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        @media (max-width: 600px) {
          .title {
            font-size: 2.5rem;
          }
          .description {
            font-size: 1.2rem;
          }
          .icon-container {
            font-size: 3rem;
          }
          .blinking-cursor-icon {
            height: 3rem;
          }
        }
      `}</style>
    </>
  );
}
