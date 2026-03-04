import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--text-muted)' }}>404</h1>
      <h2>Página no encontrada</h2>
      <p style={{ margin: '1rem 0 2rem' }}>
        Lo sentimos, el recurso que estás buscando no existe o ha sido movido.
      </p>
      <Link href="/" className="btn btn-primary">
        Volver al Dashboard
      </Link>
    </div>
  );
}
