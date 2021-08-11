import Modal from './modal.js';

const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalParagraph = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

/**
 * Geting the 'check' buttom.
 */
const checkButtons = document.querySelectorAll('.actions a.check');

checkButtons.forEach((button) => {
  button.addEventListener('click', handleClick);
});

/**
 * Geting the 'trash' buttom.
 */
const trashButttons = document.querySelectorAll('.actions a.trash');

trashButttons.forEach((button) => {
  button.addEventListener('click', (event) => handleClick(event, false));
});

function handleClick(event, check = true) {
  event.preventDefault();

  const slug = check ? 'check' : 'trash';
  const roomId = document.querySelector('#room-id').dataset.id;
  const questionID = event.target.dataset.id;

  const form = document.querySelector('.modal form');
  form.setAttribute('action', `/question/${roomId}/${questionID}/${slug}`);

  modalTitle.innerHTML = check ? 'Marcar como lida.' : 'Excluir pergunta.';
  modalParagraph.innerHTML = check
    ? 'Tem certeza que dejesa marcar esta pergunta como lida?'
    : 'Tem certeza que deseja excluir esta pergunta?';
  modalButton.innerHTML = check ? 'Sim, marcar como lida.' : 'Sim, excluir.';
  check
    ? modalButton.classList.remove('red')
    : modalButton.classList.add('red');
  modal.open();
}
