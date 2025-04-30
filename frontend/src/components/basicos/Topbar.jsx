export default function Topbar() {
  return (
    <div className="d-flex align-items-center justify-content-end bg-white shadow p-3" style={{ height: '64px' }}>
      <span className="me-3 fw-semibold">Marcus White</span> 

      <img src="/avatar.jpg" alt="User" className="rounded-circle" style={{ width: '40px', height: '40px' }} />

      <button 
        className="btn btn-outline-danger ms-3" 
        onClick={() => console.log('Logout clicked')}
      >
        Logout
      </button>
    </div>
  );
}