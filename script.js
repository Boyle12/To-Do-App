/*Javascript code */

document.addEventListener("DOMContentLoaded",() => {
const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => renderTask(task));
addTaskButton.addEventListener('click',() => {
  const taskText = todoInput.value.trim();          // .value = Ye ek property hai jo batati hai ki kisi input field ya button ke andar filhal kya text ya data maujood hai., .trim() = Yeh ek bahut zaroori JavaScript string method hai. Iska kaam hai string ke shuruat aur aakhiri mein se f फaltu ke khali spaces (extra spaces) ko hata dena.Example: Agar user ne "  Learn JS   " type kiya hai, toh .trim() use karne ke baad yeh sirf "Learn JS" bachega.
  if(taskText === "") return;

  const newTask = {
    id : Date.now(),      // Date.now() : Yeh ek built-in JavaScript function hai jo 1 January 1970 se lekar abhi tak ke total milliseconds return karta hai. Kyunki waqt hamesha aage badhta hai, isliye har baar jab aap button click karenge, aapko ek naya aur unique number milega.
    text: taskText,
    completed: false, // completed: false = Jab completed (true) ho jata hai, toh hum CSS ka use karke us task ke text par ek line pher dete hain (jise text-decoration: line-through kehte hain). Isse user ko turant pata chal jata hai ki "Haan, yeh kaam main kar chuka hoon".
  };
  tasks.push(newTask);
  saveTasks();
  renderTask(newTask);    // renderTask(newTask) ka matlab hai ki naya task (jo newTask object hai) ko UI mein display karna.
  todoInput.value = "";
     // todoInput.value = "" =  input box se "jo task likha hua hoga box me" usko mita diya taaki box phir se naya dikhe.
  console.log(tasks);
})

function renderTask (task){       //renderTask function ka asli kaam Data ko Design mein badalna hai. Jab tak aapka task array ke andar ek object hai, woh sirf ek computer data hai. Lekin jab aap use screen par ek list ke roop mein dekhte hain, toh woh kaam renderTask ki wajah se hota hai.

  const li = document.createElement('li');
  li.setAttribute('data-id',task.id);
  if(task.completed) li.classList.add("completed");
  li.innerHTML = `
  <span>${task.text}</span>
  <button>delete</button>
  `; // <span>${task.text}</span>: Task ka text display karta hai
  
  li.addEventListener('click',(e) => {
    if(e.target.tagName === 'BUTTON') return;
    task.completed = !task.completed
    li.classList.toggle('completed');
    saveTasks();
  });
  
  li.querySelector('button').addEventListener('click',(e) => {
    e.stopPropagation();
    tasks = tasks.filter((t) => t.id !== task.id);
    li.remove();
    saveTasks();
  });

  todoList.appendChild(li);
}

function saveTasks(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
}
});