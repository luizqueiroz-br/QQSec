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
            <i class="bi bi-speedometer2"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/reports" className="nav-link text-white">
              <i className="bi bi-file-earmark-text"></i>  SubDomainFinder (offline)
            </Link>
          </li>
          <li>
            <Link to="/reports" className="nav-link text-white">  
              <i className="bi bi-file-earmark-text"></i>  DNS Enumeration (offline)
            </Link>
          </li>
          <li>
            <Link to="/reports" className="nav-link text-white">
              <i className="bi bi-file-earmark-text"></i>  Port Scan(offline)
            </Link>
          </li>
          <li>
            <Link to="/reports" className="nav-link text-white">
              <i className="bi bi-file-earmark-text"></i>  Crawler Inteligente (offline)

            </Link>
            <Link to="/reports" className="nav-link text-white">
              <i className="bi bi-file-earmark-text"></i>  JS Files & Endpoint Extractor (offline)

            </Link>
            <Link to="/reports" className="nav-link text-white">
              <i className="bi bi-file-earmark-text"></i>  Directory Fuzzing (offline)
            </Link>
          </li>
          <li>
            <Link to="/whois" className="nav-link text-white">
              <i class="bi bi-info"></i>   Whois Information (offline)
            </Link>
          </li>
          <li>
            <Link to="/ConversorTime" className="nav-link text-white">
              <i class="bi bi-clock-history"></i>  Conversor de time (offline)
            </Link>
          </li>
          <li>
            <Link to="/ConversorTime" className="nav-link text-white">
            <i class="bi bi-cassette"></i>  LLMPrePrompt (offline)
            </Link>
          </li>
          <li>
            <Link to="/admin/maneger/user" className="nav-link text-white">
            <i class="bi bi-person-fill-gear"></i> Usuários (beta)
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}