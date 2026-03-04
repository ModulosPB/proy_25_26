export default function Loading() {
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div className="skeleton" style={{ width: '200px', height: '40px' }}></div>
        <div className="skeleton" style={{ width: '150px', height: '40px' }}></div>
      </div>
      <div className="skeleton" style={{ height: '400px' }}></div>
    </div>
  );
}
