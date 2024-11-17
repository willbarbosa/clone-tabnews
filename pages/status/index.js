function Capslock(propriedades) {
  const textoEmCapsLock = propriedades.texto.toUpperCase();

  return textoEmCapsLock;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <Capslock texto="teste de texto" />
    </>
  );
}
