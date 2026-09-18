export function LoadError({ message }: { message: string }) {
  return <div role="alert" className="m-6 p-6 bg-red-50 text-red-900 rounded border border-red-200 space-y-3">
    <h2 className="font-bold">Não foi possível carregar os dados</h2>
    <p>{message}</p>
    <button className="underline" onClick={() => window.location.reload()}>Tentar novamente</button>
  </div>;
}
