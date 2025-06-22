import Swal from "sweetalert2"

export function Toast(icon: 'success' | 'error' | 'warning' | 'info' | 'question', title: string) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    });

    Toast.fire({
        icon: icon,
        title: title,
    });
}
