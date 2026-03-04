export default function Loading() {
  return (
    <div className="container">
      <div className="skeleton" style={{ width: '250px', height: '40px', marginBottom: '2rem' }}></div>
      <div className="grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton" style={{ height: '200px' }}></div>
        ))}
      </div>
    </div>
  );
}
