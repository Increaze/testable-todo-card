import { formatTimeRemaining } from './utils.js';

const card = document.querySelector('[data-testid="test-todo-card"]');
const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const status = document.querySelector('[data-testid="test-todo-status"]');
const timeRemaining = document.querySelector('[data-testid="test-todo-time-remaining"]');
const dueDate = document.querySelector('[data-testid="test-todo-due-date"]');
const editButton = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteButton = document.querySelector('[data-testid="test-todo-delete-button"]');

const due = new Date(dueDate.dateTime);

function updateTimeRemaining() {
  timeRemaining.textContent = formatTimeRemaining(due);
}

checkbox.addEventListener('change', () => {
  const done = checkbox.checked;
  card.classList.toggle('is-done', done);
  status.textContent = done ? 'Done' : 'In Progress';
    status.className = done ? 'badge badge--done' : 'badge badge--status';
  status.setAttribute('aria-label', `Status: ${status.textContent}`);
});

editButton.addEventListener('click', () => {
  console.log('edit clicked');
});

deleteButton.addEventListener('click', () => {
  alert('Delete clicked');
});

updateTimeRemaining();
setInterval(updateTimeRemaining, 30000);
