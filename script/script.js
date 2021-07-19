//select
const addBtn = document.querySelector('.add__btn');
const inputValue = document.querySelector('#todo__input')
const addList = document.querySelector('#add__list');

const arrColor = ['violet', 'orange', 'green', 'red', 'light-green', 'blue'];
const colorWrapper = document.querySelector('.color__btn');
const colorsCollection = colorWrapper.children;

const toDos = JSON.parse(localStorage.getItem('toDos')) || {};
let selected = getRandomColor();

for (let i = 0; i < colorsCollection.length; i++) {
    colorsCollection[i].addEventListener('click', colorHandler(colorsCollection[i].className));
}

function colorHandler(color) {

    return function (e) {
        e.preventDefault();
        selected.selectedElement.classList.remove('color-active');
        selected.selectedColor = color;
        selected.selectedElement = e.target;
        e.target.classList.add('color-active');
    }
}

const addButtonHandler = (e) => {
    e.preventDefault();

    const name = inputValue.value;
    const checked = false;

    const color = selected.selectedColor;
    const id = Date.now();

    if (!inputValue.value.trim()) {
        return
    }

    const elem = createToDo(name, checked, color, id);
    addList.appendChild(elem);

    inputValue.value = '';
    toDos[id] = {id, name, checked, color};

    selected.selectedElement.classList.remove('color-active');
    selected = getRandomColor();

    update();
}
//JSON
const update = () => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
}

addBtn.addEventListener('click', addButtonHandler);

const createToDo = (name, checked, color, id) => {
    //function checkBoxHandler
    const checkBoxHandler = (e) => {
        toDos[id].checked = !toDos[id].checked;
        update();
        e.target.parentElement.classList.toggle('completed');
    }
    //Create <li>
    const wrapper = document.createElement('li');
    wrapper.classList.add('add__item');
    wrapper.classList.add(color);

    //Create <input>
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = checked;

    checkBox.classList.add('add__item__checkbox');

    checkBox.addEventListener('change', checkBoxHandler);
    wrapper.appendChild(checkBox);

    if (checked) {
        checkBox.parentElement.classList.add('completed');
    }

    //Create <div>
    const toDoName = document.createElement('div');
    toDoName.classList.add('add__item__todo-name');
    toDoName.textContent = name;
    wrapper.appendChild(toDoName);

    return wrapper;
}

//generate random color
function randomArr(arr) {
    const randomIndex = Math.abs(Math.floor(Math.random() * (arr.length - 1)));
    return arr[randomIndex];
}

function getRandomColor() {
    const randomColor = randomArr(arrColor);
    const colorElement = document.querySelector(`.${randomColor}`);
    colorElement.classList.add('color-active');
    return {
        selectedElement: colorElement,
        selectedColor: randomColor,
    }
}

//localStorage
Object.values(toDos).forEach((toDo) => {
    const elem = createToDo(toDo.name, toDo.checked, toDo.color, toDo.id);
    addList.appendChild(elem);
});

