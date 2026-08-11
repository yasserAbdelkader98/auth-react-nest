import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../Context/auth';
import showToast from '../Helpers/SweetAlert';
import { logout as logoutRequest } from '../Network/appApis';

function MyNavbar() {
  const auth = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
    <Navbar className="app-navbar" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="app-brand">
          <span className="app-brand-mark" aria-hidden="true">
            A
          </span>
          <span>Auth App</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navigation"
          className="app-navbar-toggle"
        />

        <Navbar.Collapse id="main-navigation">
          <Nav className="app-nav-links mx-auto">
            <Nav.Link
              as={Link}
              className="app-nav-link"
              active={isActive('/')}
              to="/"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              className="app-nav-link"
              active={isActive('/docs')}
              to="/docs"
            >
              API docs
            </Nav.Link>

            {auth.isAuthenticated && (
              <Nav.Link
                as={Link}
                className="app-nav-link"
                active={isActive('/accountSettings')}
                to="/accountSettings"
              >
                Account
              </Nav.Link>
            )}
          </Nav>

          <div className="app-nav-actions">
            {auth.isAuthenticated ? (
              <>
                {auth.user && (
                  <div className="app-user-summary">
                    <span className="app-user-avatar" aria-hidden="true">
                      {auth.user.firstName.charAt(0).toUpperCase()}
                    </span>
                    <span className="app-user-name">{auth.user.firstName}</span>
                  </div>
                )}
                <button
                  type="button"
                  className="btn app-logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn app-login-button" to="/login">
                  Login
                </Link>
                <Link className="btn app-register-button" to="/register">
                  Get started
                </Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
