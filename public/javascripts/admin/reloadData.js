import form from './formHandler';

const reload = {
    reload: document.querySelector('.refresh-charts'),
    alertDanger: document.querySelector('.alert-danger'),
    alertSuccess: document.querySelector('.alert-success'),
    reloadModal: function () {
        this.reload.addEventListener('click', () => {
            this.alertDanger.style.display = 'none';
            this.alertSuccess.style.display = 'none';
            form.openForm();
        });
    },
};

reload.reloadModal();
