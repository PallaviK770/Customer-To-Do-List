const STORAGE_KEY = "todo_activities";

export const activityService = {
  getAllActivities() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveActivities(activities) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  },

  addActivity(title, priority = "Medium", dueDate = "") {
  console.log("🚀 addActivity called");
  console.log("Title:", title);
  console.log("Priority:", priority);

  const newActivity = {
    id: Date.now().toString(),
    title: title,
    completed: false,
    dueDate: dueDate,
    priority: priority,
  };

  console.log("New activity to store:", newActivity);

  const activities = this.getAllActivities();
  console.log("Existing activities before push:", activities);

  activities.push(newActivity);

  console.log("After push:", activities);

  this.saveActivities(activities);
  console.log("Activities saved to localStorage.");
},

  editActivity(id, updatedTitle) {
    const activities = this.getAllActivities();
    const index = activities.findIndex(act => act.id === id);
    if (index !== -1) {
      activities[index].title = updatedTitle;
      this.saveActivities(activities);
    }
  },

  deleteActivity(id) {
    const activities = this.getAllActivities().filter(act => act.id !== id);
    this.saveActivities(activities);
  },

  toggleActivityCompletion(id) {
    const activities = this.getAllActivities();
    const index = activities.findIndex(act => act.id === id);
    if (index !== -1) {
      activities[index].completed = !activities[index].completed;
      this.saveActivities(activities);
    }
  }
};
