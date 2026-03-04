'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2 style={{ color: 'var(--danger)' }}>¡Ups! Algo ha salido mal</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Se ha producido un error al intentar cargar la información.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => reset()}
      >
        Reintentar conexión
      </button>
    </div>
  );
}
