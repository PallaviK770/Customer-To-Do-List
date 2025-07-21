import { activityService } from './activityService.js';
import { TaskList } from './taskList.js';
import { AnimatedBackground } from './animatedBackground.js';
const bg = new AnimatedBackground();

const taskList = new TaskList("task-list");

const input = document.getElementById("activityInput");
const prioritySelect = document.getElementById("prioritySelect");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");

addBtn.addEventListener("click", () => {
  const title = input.value.trim();
  const priority = prioritySelect.value;

  if (title !== "") {
    console.log("Calling addActivity with:", title, priority);
    activityService.addActivity(title, priority);
    taskList.render();
    bg.triggerRipple();
    input.value = "";
    prioritySelect.value = "Medium";
  }
});

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const allItems = document.querySelectorAll("li");

  allItems.forEach(item => {
    const text = item.querySelector(".task-text")?.textContent.toLowerCase();
    if (text && text.includes(keyword)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});
const themeToggle = document.getElementById("themeToggle");


if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});
