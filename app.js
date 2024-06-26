const cards = document.querySelectorAll('.cards');
const addCardBtn = document.querySelector('.cardCreato');
const cardHolder = document.querySelector('.cardHolder');
const tasks = document.querySelectorAll('.tasks');

// ------------------------------ Save object to local storage
let savedTasks = JSON.parse(localStorage.getItem("savedTasks"))

const deleteTasks = (event) => {

    event.preventDefault();
    const clickTrash = event.target;

    const trashParent = clickTrash.parentElement;  // get those div which delete icon clicks
    
    const trashValue = trashParent.children[0].innerHTML // div para value of clicks delete icon

    const trashValueIndex = savedTasks.indexOf(trashValue) /// find index of those trash value 

    const remove = savedTasks.splice(trashValueIndex , 1); // remove element 

    localStorage.setItem('savedTasks' , JSON.stringify(savedTasks)) // save this new array to local storage

    trashParent.remove(); // Remove the task element
};

const createTasks = (value) => {
    const task = document.createElement('div');
    const para = document.createElement('p')
    const text = document.createTextNode(value);
    const trashIcon = document.createElement('i');

    trashIcon.classList.add('fa-solid', 'fa-trash', 'trash');

    task.setAttribute('draggable', 'true');
    task.classList.add('tasks');

    para.appendChild(text)
    task.appendChild(para);
    task.appendChild(trashIcon);

    trashIcon.addEventListener('click', deleteTasks); // Add delete event listener to the trash icon
    return task;
};


// console.log(cards[0].lastElementChild.children[0]);
if (!savedTasks) {
    savedTasks = []
}
// console.log();
for (let i = 0; i < savedTasks.length; i++) {
    const p = createTasks(savedTasks[i])

    cards[0].lastElementChild.insertBefore(p , cards[0].lastElementChild.lastElementChild);
}


// for (let i = 0; i < cards.length; i++){
//     intro[i] = [];
//     console.log("🚀 ~ addTask ~ intro:", intro);
// The following line seems incorrect, intro[i] is an array, so pushing without arguments does nothing.
// intro[i].push();
// } 

let addTask = (event) => {
    event.preventDefault();
    const activeForm = event.target; // current form element
    const inputValue = activeForm[0].value; // value written in form's input
    const parent = activeForm.parentElement; // parent of form i.e div.column



    if (inputValue.trim() !== '') {
            const ticket1 = createTasks(inputValue)
            parent.insertBefore(ticket1, activeForm); // adding new task before the form
            savedTasks.push(inputValue);
            localStorage.setItem('savedTasks',JSON.stringify(savedTasks))

            activeForm.reset(); // clearing form
    }
            

    // if (inputValue.trim() !== "") {
    //     const ticket = createTasks(inputValue); // div to be added
    //     parent.insertBefore(ticket, activeForm); // adding new task before the form
    //     activeForm.reset(); // clear form
    // }
};

// Attach event listener to card creator form
cardHolder.addEventListener('click', (event) => {
    event.preventDefault();
});

for (let i = 0; i < cards.length; i++) {
    const form = cards[i].querySelector('form'); // selecting each column's form
    form.addEventListener('submit', addTask);
}



const addNewCard = (event) => {
    event.preventDefault();

    const input = addCardBtn.querySelector('input');
    const cardTitle = input.value;

    if (cardTitle.trim() !== "") {
        const newCard = createCard(cardTitle);
        cardHolder.insertBefore(newCard, addCardBtn);
        input.value = ''; // clear input field
    }
    
};

addCardBtn.querySelector('form').addEventListener('submit', addNewCard);

const createCard = (cardHeading) => {
    const card = document.createElement('div');
    card.classList.add('cards');

    const cardNav = document.createElement('div');
    cardNav.classList.add('cardNav');
    const h6 = document.createElement('h6');
    h6.textContent = cardHeading;
    const icon = document.createElement('div');
    icon.classList.add('icon');
    const i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-ellipsis');

    icon.appendChild(i);
    cardNav.appendChild(h6);
    cardNav.appendChild(icon);

    const cardHome = document.createElement('div');
    cardHome.classList.add('cardHome');
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.setAttribute('placeholder', '+ Add a card');
    input.setAttribute('type', 'text');
    input.setAttribute('maxlength', '15');
    form.appendChild(input);
    cardHome.appendChild(form);

    card.appendChild(cardNav);
    card.appendChild(cardHome);

    form.addEventListener('submit', addTask);

    return card;
};



for (let i = 0; i < cards.length; i++) {
    const tasks = cards[i].querySelectorAll('.tasks');
    tasks.forEach(task => {
        const trash = task.querySelector('.trash');
        trash.addEventListener('click', deleteTasks);
    });
}
