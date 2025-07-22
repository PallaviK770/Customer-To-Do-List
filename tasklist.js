import { activityService } from "./activityService.js";
import { TaskItem } from "./taskItem.js";

export class TaskList {
  constructor(containerId) {
    this.container = document.getElementById(containerId);

    
    this.container.addEventListener("activityEdited", (e) => {
      activityService.editActivity(e.detail.id, e.detail.newTitle);
      this.render();
    });

    this.container.addEventListener("activityDeleted", (e) => {
      activityService.deleteActivity(e.detail.id);
      this.render();
    });

    this.container.addEventListener("activityToggled", (e) => {
      activityService.toggleActivityCompletion(e.detail.id);
      this.render();
    });

    this.render();
  }

  render() {
  const activities = activityService.getAllActivities();
  console.log("Loaded from storage:", activities); // NEW
  
  this.container.innerHTML = "";

  console.log("Rendering", activities.length, "activities");

  activities.forEach((activity) => {
    const taskItem = new TaskItem(activity);
    this.container.appendChild(taskItem.element);
  });

  
  this.container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = this.getDragAfterElement(e.clientY);
    const dragging = this.container.querySelector(".dragging");
    if (afterElement == null) {
      this.container.appendChild(dragging);
    } else {
      this.container.insertBefore(dragging, afterElement);
    }
  });

  this.container.addEventListener("drop", () => {
    const newOrder = [...this.container.querySelectorAll("li")].map(li =>
      activityService.getAllActivities().find(act => act.id === li.dataset.id)
    );
    activityService.saveActivities(newOrder);
  });



}
getDragAfterElement(y) {
  const draggableElements = [...this.container.querySelectorAll("li:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

}



