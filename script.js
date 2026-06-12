let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveData(){
    localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit(){

    let input = document.getElementById("habitInput");
    let habitName = input.value.trim();

    if(habitName === ""){
        alert("Enter a habit!");
        return;
    }

    habits.push({
        name: habitName,
        completed: false
    });

    input.value = "";

    saveData();
    displayHabits();
}

function toggleHabit(index){

    habits[index].completed = !habits[index].completed;

    saveData();
    displayHabits();
}

function deleteHabit(index){

    habits.splice(index,1);

    saveData();
    displayHabits();
}

function displayHabits(){

    let habitList = document.getElementById("habitList");
    habitList.innerHTML = "";

    let completedCount = 0;

    habits.forEach((habit,index)=>{

        if(habit.completed){
            completedCount++;
        }

        habitList.innerHTML += `
        <div class="habit">

            <span class="${habit.completed ? 'done' : ''}">
                ${habit.name}
            </span>

            <div class="actions">

                <button
                class="complete"
                onclick="toggleHabit(${index})">
                ${habit.completed ? 'Undo' : 'Done'}
                </button>

                <button
                class="delete"
                onclick="deleteHabit(${index})">
                Delete
                </button>

            </div>

        </div>
        `;
    });

    let total = habits.length;
    let pending = total - completedCount;

    document.getElementById("total").innerText = total;
    document.getElementById("completed").innerText = completedCount;
    document.getElementById("pending").innerText = pending;

    let percentage = total === 0
        ? 0
        : Math.round((completedCount / total) * 100);

    document.getElementById("progress").style.width =
        percentage + "%";

    document.getElementById("progressText").innerText =
        percentage + "% Completed";
}

displayHabits();