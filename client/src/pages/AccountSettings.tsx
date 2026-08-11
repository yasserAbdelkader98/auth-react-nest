import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteUser, logout } from '../Network/appApis';
import { Toast } from '../Helpers/SweetAlert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/auth';
import Swal from "sweetalert2";

function AccountSettings() {
  const Navigate = useNavigate();
  const auth = useAuth();

  function createData(label: string, action: JSX.Element) {
    return { label, action };
  }

  const rows = [
    createData( 'Delete My Account',
      <button onClick={DeleteMyAccount} className="btn btn-danger">
        Delete
      </button>
    ),
  ];

  function DeleteMyAccount(){
    Swal.mixin({
      toast: true,
        customClass: {
        confirmButton: 'btn btn-danger m-2',
        cancelButton: 'btn btn-outline-dark m-2'
      },
      buttonsStyling: false
    }).fire({
      title: 'Logout',
      text: `Are you sure you want to Delete Your Account?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAccount(auth?.userId || '');
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Toast('error','Cancelled!')
      }
    })
  }

  async function deleteAccount(id: string) {
    try {
      await deleteUser(id);
      // The account is already deleted even if clearing its now-unusable cookie fails.
      await logout().catch(() => undefined);

      auth?.logoutContext();
      Navigate('/');
      Toast('success', 'Your Account has been Deleted');
    } catch (err: any) {
      const message = err.response?.data?.message ?? 'Unable to delete your account';
      Toast('error', message);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center flex-wrap">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My Account Settings</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="right">{row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AccountSettings;
