import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { AuthProvider } from './Context/auth';
import Index from './pages/index';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </Router>
  );
}
