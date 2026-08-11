import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../Context/auth';
import showToast from '../Helpers/SweetAlert';
import { logout as logoutRequest } from '../Network/appApis';

const navStyle = { color: 'grey', textDecoration: 'none' };

function MyNavbar() {
  const auth = useAuth();

  async function handleLogout() {
    const result = await Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await logoutRequest();
      auth.logout();
      showToast('success', 'Successfully logged out');
    } catch {
      showToast('error', 'Unable to log out. Please try again.');
    }
  }

  return (
    <Navbar bg="dark" expand="md">
      <Container fluid>
        <Navbar.Toggle aria-controls="main-navigation" />
        <Navbar.Collapse
          id="main-navigation"
          className="justify-content-center"
        >
          <Nav>
            <Nav.Link as={Link} style={navStyle} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} style={navStyle} to="/docs">
              API docs
            </Nav.Link>

            {auth.isAuthenticated ? (
              <>
                <Nav.Link as={Link} style={navStyle} to="/accountSettings">
                  Account settings
                </Nav.Link>
                <button
                  type="button"
                  className="nav-link text-secondary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} style={navStyle} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} style={navStyle} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
