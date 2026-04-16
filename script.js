import { formatTimeRemaining } from './utils.js';

const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');
const expandToggle = document.querySelector('[data-testid="test-todo-expand-toggle"]');
const collapsible = document.querySelector('[data-testid="test-todo-collapsible-section"]');
const overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]');
const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');
const priorityIndicator = document.querySelector('[data-testid="test-todo-priority-indicator"]');

const card = document.querySelector('[data-testid="test-todo-card"]');
const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const status = document.querySelector('[data-testid="test-todo-status"]');
const timeRemaining = document.querySelector('[data-testid="test-todo-time-remaining"]');
const dueDate = document.querySelector('[data-testid="test-todo-due-date"]');
const editButton = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteButton = document.querySelector('[data-testid="test-todo-delete-button"]');

const title = document.querySelector('[data-testid="test-todo-title"]');
const description = document.querySelector('[data-testid="test-todo-description"]');
const priority = document.querySelector('[data-testid="test-todo-priority"]');

const editTitleInput = document.querySelector('[data-testid="test-todo-edit-title-input"]');
const editDescriptionInput = document.querySelector('[data-testid="test-todo-edit-description-input"]');
const editPrioritySelect = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
const editDueDateInput = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');

const due = new Date(dueDate.dateTime);

let previousState = null;


function updateTimeRemaining() {
  if (checkbox.checked) {
    timeRemaining.textContent = 'Completed';
    overdueIndicator.hidden = true;
    card.classList.remove('overdue');
    return;
  }

  const text = formatTimeRemaining(due);
  timeRemaining.textContent = text;

  const isOverdue = text.includes('Overdue');
  overdueIndicator.hidden = !isOverdue;
  card.classList.toggle('overdue', isOverdue);
}

/* =========================
   STATUS + CHECKBOX SYNC
========================= */
checkbox.addEventListener('change', () => {
  const done = checkbox.checked;

  const newStatus = done ? 'Done' : 'Pending';

  status.textContent = newStatus;
  statusControl.value = newStatus;

  card.classList.toggle('is-done', done);

  updateTimeRemaining(); 
});

statusControl.addEventListener('change', () => {
  const value = statusControl.value;

  status.textContent = value;
  checkbox.checked = value === 'Done';

  card.classList.toggle('is-done', value === 'Done');

  updateTimeRemaining(); 
});


function updatePriorityUI(value) {
  priority.textContent = value;
  priority.setAttribute('aria-label', `Priority: ${value}`);

  priorityIndicator.classList.remove('priority-low', 'priority-medium', 'priority-high');

  if (value === 'Low') priorityIndicator.classList.add('priority-low');
  if (value === 'Medium') priorityIndicator.classList.add('priority-medium');
  if (value === 'High') priorityIndicator.classList.add('priority-high');
}

updatePriorityUI(priority.textContent.trim());


expandToggle.addEventListener('click', () => {
  const expanded = expandToggle.getAttribute('aria-expanded') === 'true';

  expandToggle.setAttribute('aria-expanded', !expanded);
  expandToggle.textContent = expanded ? 'Show more' : 'Show less';

  collapsible.classList.toggle('expanded');
});

if (description.textContent.length <= 120) {
  expandToggle.hidden = true;
  collapsible.classList.add('expanded');
}



editButton.addEventListener('click', () => {
  previousState = {
    title: title.textContent,
    description: description.textContent,
    priority: priority.textContent,
    due: new Date(due),
  };

  editTitleInput.value = previousState.title;
  editDescriptionInput.value = previousState.description;
  editPrioritySelect.value = previousState.priority;
  editDueDateInput.value = formatDateForInput(previousState.due);

  editForm.hidden = false;
});

cancelBtn.addEventListener('click', () => {
  if (previousState) {
    title.textContent = previousState.title;
    description.textContent = previousState.description;
    updatePriorityUI(previousState.priority);
    due = new Date(previousState.due);
    dueDate.dateTime = due.toISOString();
  }

  editForm.hidden = true;
  editButton.focus();
});

saveBtn.addEventListener('click', () => {
  title.textContent = editTitleInput.value || title.textContent;
  description.textContent = editDescriptionInput.value || description.textContent;

  updatePriorityUI(editPrioritySelect.value);

  if (editDueDateInput.value) {
    due = new Date(editDueDateInput.value);
    dueDate.dateTime = due.toISOString();
  }

  editForm.hidden = true;
  editButton.focus();

  updateTimeRemaining();
});

function formatDateForInput(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

deleteButton.addEventListener('click', () => {
  alert('Delete clicked');
});


updateTimeRemaining();
setInterval(updateTimeRemaining, 30000);