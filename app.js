const cards = document.querySelectorAll('.cards');
const addCardBtn = document.querySelector('.cardCreato');
const cardHolder = document.querySelector('.cardHolder');
// const trash = document.querySelectorAll('.trash')
const tasks = document.querySelectorAll('.tasks')

// console.log("🚀 ~ addCard:", addCardBtn.querySelector('input'));
// console.log("🚀 ~ card:", cardHolder.querySelector('cards'));
console.log("🚀 ~ cards:", cards)


cardHolder.addEventListener('onclick', (event) => {
    event.preventDefault()
})
let addTask = (event) => {
    event.preventDefault();
    const activeForm = event.target; // current form element
    const inputValue = activeForm[0].value; // value written in form's input
    const parent = activeForm.parentElement; // parent of form i.e div.column
    // console.log("🚀 ~ addTask ~ parent:", parent)
    if (inputValue.trim() !== "") {
        const ticket = createTasks(inputValue); // div to be added
        // console.log(event);
        parent.insertBefore(ticket, activeForm); // adding new task before the form
        activeForm.reset(); // clear form
    }
};

for (let i = 0; i < cards.length; i++) {
    const form = cards[i].querySelector('form'); // selecting each column's form
    form.addEventListener('submit', addTask);
}

const createTasks = (value) => {
    const task = document.createElement('div');
    const text = document.createTextNode(value);
    const trashIcon = document.createElement('i')
    // trashIcon.setAttribute('draggable', 'true')
    trashIcon.classList.add('fa-solid')
    trashIcon.classList.add('fa-trash')
    trashIcon.classList.add('trash')


    task.setAttribute('draggable', 'true');
    task.classList.add('tasks');

    task.appendChild(text);
    task.appendChild(trashIcon)

    return task;
};



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

// Attach event listener to the card creator form
addCardBtn.querySelector('form').addEventListener('submit', addNewCard);

const createCard = (cardHeading) => {
    // Create card container
    const cards = document.createElement('div');
    cards.classList.add('cards');

    // Create card header
    const cardNav = document.createElement('div');
    cardNav.classList.add('cardNav');
    const h6 = document.createElement('h6');
    h6.textContent = cardHeading;
    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.textContent = '...';

    cardNav.appendChild(h6);
    cardNav.appendChild(icon);

    // Create card body
    const cardHome = document.createElement('div');
    cardHome.classList.add('cardHome');
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.setAttribute('placeholder', '+ Add a card');
    input.setAttribute('type', 'text');
    input.setAttribute('maxlength', '15');
    form.appendChild(input);
    cardHome.appendChild(form);

    // Append elements to card container
    cards.appendChild(cardNav);
    cards.appendChild(cardHome);

    // Attach event listener to new card form
    form.addEventListener('submit', addTask);

    return cards;
};

const deleteTasks = (event) => {
    event.preventDefault();
    // console.log(event.target);
    const clickTrash = event.target
    const trashParent = clickTrash.parentElement
    trashParent.style.display = 'none'
}

for (let i = 0; i < cards.length; i++) {
 
    for (let j = 0; j < tasks.length; j++) {
        
        // console.log(cards[i].children[1].children[j].children[0]);
        const trash = cards[i].children[1].children[j].children[0]
        trash.addEventListener('click' , deleteTasks)
    }

}