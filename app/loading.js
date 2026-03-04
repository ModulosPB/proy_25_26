export default function Loading() {
  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="skeleton" style={{ height: '100px' }}></div>
        <div className="skeleton" style={{ height: '300px' }}></div>
        <div className="skeleton" style={{ height: '200px' }}></div>
      </div>
    </div>
  );
}
