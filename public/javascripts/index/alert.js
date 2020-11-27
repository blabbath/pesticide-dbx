const alertTimeOut = function () {
    setTimeout(() => {
        if (document.querySelector('.alert')) {
            document.querySelector('.alert').style.display = 'none';
        }
    }, 10000);
};

const alertClickClose = function () {
    if (document.querySelector('.alert')) {
        const close = document.querySelector('.close');
        const alert = document.querySelector('.alert');
        close.addEventListener('click', () => (alert.style.display = 'none'));
    }
};

export { alertClickClose, alertTimeOut };
