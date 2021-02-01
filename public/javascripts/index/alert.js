export default function() {
    let alert = document.querySelector('cds-alert-group')
    if (alert) {
        setTimeout(() => {
            alert.style.display = 'none'
        }, 5000)
    }
}