import Swal from 'sweetalert2';
import './CustomSwal.css'; 

const CustomSwal = Swal.mixin({
    background: '#ffffff',
    color: '#111827',
    
    showCancelButton: true,
    reverseButtons: true,
    
    buttonsStyling: false,
    
    customClass: {
        popup: 'my-swal-popup',
        title: 'my-swal-title',
        confirmButton: 'my-swal-btn btn-confirm',
        cancelButton: 'my-swal-btn btn-cancel',
        actions: 'my-swal-actions'
    }
});

export default CustomSwal;