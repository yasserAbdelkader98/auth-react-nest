import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/auth';
import showToast from '../Helpers/SweetAlert';
import getApiErrorMessage from '../Network/apiError';
import { deleteAccount, logout as logoutRequest } from '../Network/appApis';

function AccountSettings() {
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleDeleteAccount() {
    const result = await Swal.fire({
      title: 'Delete account',
      text: 'Are you sure you want to permanently delete your account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAccount();
      await logoutRequest().catch(() => undefined);
      auth.logout();
      navigate('/');
      showToast('success', 'Your account has been deleted');
    } catch (error: unknown) {
      showToast(
        'error',
        getApiErrorMessage(error, 'Unable to delete your account')
      );
    }
  }

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: 640 }}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <h1 className="h4">Account settings</h1>
            <p className="mb-0 text-muted">Permanently delete your account.</p>
          </div>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="btn btn-danger"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
