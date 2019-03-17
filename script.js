// UI vars
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list')
let items;

//load items 
loadItems();

// call event listener
eventListeners();

function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);

    //delete an item
    taskList.addEventListener('click', deleteItem);

    //delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);

    localStorage.setItem('emre')
}

function loadItems() {
    item = getItemsFromLocalStorage();
    items.forEach(function (item) {
        createItem(item);
    });
}

// get items from local storage
function getItemsFromLocalStorage() {
    if(localStorage.getItem('items') === null) {
        items=[];
    }else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to from local storage
function setItemToLocalStorage(text) {
    items = getItemsFromLocalStorage();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLocalStorage(text) {
    items = getItemsFromLocalStorage();
    items.forEach(function(item, index) {
        if(item === text) {
            items.splice(index, 1);
        }
    })
    localStorage.setItem('items', JSON.stringify(items))
    console.log(items);
}

function createItem(text) {
    //create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text))
    console.log(li);

    //create a
    const a = document.createElement('a');
    a.className = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';
    /*  const i = document.querySelector('i');
    i.className = 'fas fa-times';
    a.appendChild(i);
    */

    //add a to li
    li.appendChild(a);

    //add li to ul
    taskList.appendChild(li);
}

function addNewItem(e) {

    if (input.value === '') {
        alert('add new item');
    } else {
        createItem(input.value);

        //save to LocalStorage
        setItemToLocalStorage(input.value);
    }

    //clear input 
    input.value = '';

    e.preventDefault();
}

function deleteItem(e) {

    if (e.target.className === 'fas fa-times') {
        if (confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove();

            //delete item from LocalStorage
            deleteItemFromLocalStorage(e.target.parentElement.parentElement.textContent);
            console.log(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteAllItems(e) {
    //remove all
    //taskList.innerHTML='';   

    if (confirm('Are you sure ?')) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
}
