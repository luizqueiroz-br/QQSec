import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';


export default function Sidebar() {
  return (
    <div id='sidebar' className="w-60 h-screen bg-slate-500 text-white p-4 fixed">
  
        <img src={logo} alt="Logo" style={{ width: '150px', height: '150px' }} />

        
      <nav className="flex flex-col gap-4">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/reports" className="nav-link text-white">
          <i className="bi bi-file-earmark-text"></i>  SubDomainFinder 
          </Link>
        </li>
        <li>
          <Link to="/whois" className="nav-link text-white">
          <i class="bi bi-info"></i>   Whois Information
          </Link>
        </li>
        <li>
          <Link to="/ConversorTime" className="nav-link text-white">
          <i class="bi bi-clock-history"></i>  Conversor de time
          </Link>
        </li>
        <li>
          <Link to="/admin/maneger/user" className="nav-link text-white">
            Usuários
          </Link>
        </li>
      </ul>
      </nav>
    </div>
  );
}