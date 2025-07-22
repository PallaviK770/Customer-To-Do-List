export class TaskItem {
  constructor(activity) {
    this.activity = activity;
    this.element = this.createElement();
  }

  createElement() {
    const li = document.createElement("li");
    li.dataset.id = this.activity.id;
    li.className = "task-item";

    const priorityBadge = document.createElement("span");
    const priority = this.activity.priority || "Medium";
    priorityBadge.className = `priority ${priority.toLowerCase()}`;
    priorityBadge.textContent = priority;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = this.activity.completed;
    checkbox.addEventListener("change", () => {
      this.dispatchCustomEvent("activityToggled");
    });

    const tickIcon = document.createElement("span");
    tickIcon.innerHTML = this.activity.completed ? '<i class="fa-solid fa-check-circle"></i>' : "";
    tickIcon.className = "tick";

    const taskText = document.createElement("span");
    taskText.textContent = this.activity.title;
    taskText.contentEditable = true;
    taskText.className = "task-text";

    const dueDateElement = document.createElement('span');
    dueDateElement.classList.add('due-date');
    dueDateElement.textContent = `Due: ${this.activity.dueDate || 'N/A'}`;

    const textWrapper = document.createElement("div");
    textWrapper.className = "text-wrapper";
    textWrapper.appendChild(tickIcon);
    textWrapper.appendChild(taskText);
    textWrapper.appendChild(priorityBadge);
    textWrapper.appendChild(dueDateElement); 

    if (this.activity.completed) {
      taskText.classList.add("completed-text");
      li.classList.add("completed");
    }

    taskText.addEventListener("blur", () => {
      this.dispatchCustomEvent("activityEdited", { newTitle: taskText.textContent.trim() });
    });

    li.draggable = true;

    li.addEventListener("dragstart", (e) => {
      li.classList.add("dragging");
      e.dataTransfer.setData("text/plain", this.activity.id);
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.addEventListener("click", () => {
      this.dispatchCustomEvent("activityDeleted");
    });

    li.appendChild(checkbox);
    li.appendChild(textWrapper);
    li.appendChild(delBtn);

    return li;
  }

  dispatchCustomEvent(name, detail = {}) {
    const event = new CustomEvent(name, {
      bubbles: true,
      detail: {
        id: this.activity.id,
        ...detail
      }
    });
    this.element.dispatchEvent(event);
  }
}
