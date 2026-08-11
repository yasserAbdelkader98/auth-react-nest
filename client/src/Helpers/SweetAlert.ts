import Swal from 'sweetalert2';

export default function showToast(
  icon: 'success' | 'error' | 'warning' | 'info' | 'question',
  title: string
) {
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  toast.fire({ icon, title });
}
