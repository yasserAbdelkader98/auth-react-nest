import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "../Helpers/SweetAlert";
import { useAuth } from '../Context/auth';

function MyNavbar() {
  
  let navStyle={color:'grey',textDecoration:'none'}
  const auth = useAuth();

  function logout(){
    Swal.mixin({
      toast: true,
        customClass: {
        confirmButton: 'btn btn-danger m-2',
        cancelButton: 'btn btn-outline-dark m-2'
      },
      buttonsStyling: false
    }).fire({
      title: 'Logout',
      text: `Are you sure you want to Logout?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (auth) {auth?.logoutContext()}
        Toast('success','Successfully logged out !')
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Toast('error','Cancelled!')
      }
    })
  }

  return (
    <>
      <Navbar bg={'dark'} expand="md">
        <Container className="d-flex flex-wrap" fluid>
          <div className="w-100">
            <Navbar.Collapse className="justify-content-center">
              <Nav>
                <Nav.Link className="mx-3 text-secondary" as={Link} style={navStyle} to='/'>Home</Nav.Link>
                <Nav.Link className="mx-3 text-secondary" as={Link} style={navStyle} to='/docs'>Api Docs</Nav.Link>
                
                { 
                auth?.isLogged ? 
                  <>
                    <Nav.Link className="mx-3 text-secondary" as={Link} style={navStyle} to='/accountSettings'>Account Settings</Nav.Link>
                    <Nav.Link className="mx-3 text-secondary" as='button' onClick={logout} style={navStyle}>Logout</Nav.Link>
                  </>
                  :
                  <>
                    <Nav.Link className="mx-3 text-secondary" as={Link} style={navStyle} to='/login'>Login</Nav.Link>
                    <Nav.Link className="mx-3 text-secondary" as={Link} style={navStyle} to='/register'>Register</Nav.Link>
                  </>
                }
                  
                
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
    )
}

export default MyNavbar;