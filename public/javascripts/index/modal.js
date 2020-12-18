import axios from 'axios';
import configFE from '../../../config/live';

const elemSubmitChoice = document.querySelector('#submit-choice');
elemSubmitChoice.onclick = saveState;

const elemModal = document.querySelector('#modal');
const elemCloseModal = document.querySelector('#close-modal');

function saveState() {
    axios.get(`${configFE.url}/state/user`).then(user => {
        if (user.data.username === undefined) {
            const elemLogged = document.querySelector('#logged');
            elemModal.style.display = 'block';
            elemLogged.style.display = 'none';
        } else {
            const elemNotLogged = document.querySelector('#not-logged');
            elemNotLogged.style.display = 'none';
            elemModal.style.display = 'block';
        }
    });
}

// When the user clicks on <span> (x), close the modal
elemCloseModal.onclick = () => {
    elemModal.style.display = 'none';
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
    if (event.target === elemModal) {
        elemModal.style.display = 'none';
    }
};
