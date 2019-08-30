const itemsQuantity = document.getElementById('items_quantity');
const listContainer = document.getElementById('list');
const eachItem = document.getElementById('each_item');
const form = document.getElementById('form');
const descriptionInput = document.getElementById('description');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

/************ UPDATE LIST OF ITEMS ***********/

updateInfo = () => {
    itemsQuantity.innerText = `${itemsArray.length} items`;
}
updateInfo();

const updateLocalStorage = () => {
    localStorage.setItem('items', JSON.stringify(itemsArray))
    updateItems();
    updateInfo();
}


/***************** EDIT ITEMS ***************/

const acceptEdit = (newItem, i) => {
    const deleteIcon = document.getElementById(`delete_${i}`);
    const editIcon = document.getElementById(`edit_${i}`);
    const acceptIcon = document.getElementById(`accept_edit_${i}`);
    const cancelIcon = document.getElementById(`cancel_edit_${i}`);
    
    acceptIcon.onclick = () => {
        let newDescription = document.getElementById(`description_${i}`).value;
        itemsArray[i] = newDescription;
        newItem.children[1].innerHTML = `<p>${newDescription}</p>`;
        editIcon.classList.remove('hide');
        deleteIcon.classList.remove('hide');
        acceptIcon.classList.add('hide');
        cancelIcon.classList.add('hide');
        console.log('el accept click funciona');
        localStorage.setItem('items', JSON.stringify(itemsArray))
    }
}

const cancelEdit = (newItem, i) => {
    const deleteIcon = document.getElementById(`delete_${i}`);
    const editIcon = document.getElementById(`edit_${i}`);
    const acceptIcon = document.getElementById(`accept_edit_${i}`);
    const cancelIcon = document.getElementById(`cancel_edit_${i}`);
    
        cancelIcon.onclick = () => {
        newItem.children[1].innerHTML = `<p>${itemsArray[i]}</p>`;
        editIcon.classList.remove('hide');
        deleteIcon.classList.remove('hide');
        acceptIcon.classList.add('hide');
        cancelIcon.classList.add('hide');
    }
}

const editItem = (newItem, i) => {
    const deleteIcon = document.getElementById(`delete_${i}`);
    const editIcon = document.getElementById(`edit_${i}`);
    const acceptIcon = document.getElementById(`accept_edit_${i}`);
    const cancelIcon = document.getElementById(`cancel_edit_${i}`);

    editIcon.onclick = () => {
        let itemDescription = itemsArray[i];
        newItem.children[1].innerHTML = `<textarea class="edit-description" id="description_${i}">${itemDescription}</textarea>`;
        editIcon.classList.add('hide');
        deleteIcon.classList.add('hide');
        acceptIcon.classList.remove('hide');
        cancelIcon.classList.remove('hide');

        acceptEdit(newItem, i);
        cancelEdit(newItem, i);
    }
}

const deleteItem = i => {
    const deleteIcon = document.getElementById(`delete_${i}`);
    deleteIcon.onclick = () => {
        itemsArray.splice(i, 1);

        updateLocalStorage();
    }
}


/****************** NEW ITEMS *****************/

const updateItems = () => {
    const listModel = listContainer.children[0];
    listContainer.innerHTML = '';

    for (let i = 0; i < itemsArray.length; i++) {
        let newItem = listModel.cloneNode(true);
        // newItem.children[0].src = ;
        newItem.children[1].innerText = `${itemsArray[i]}`;
        newItem.children[2].innerHTML = `<i class="fas fa-pencil-alt" id="edit_${i}"></i>
    <i class="fas fa-minus-circle" id="delete_${i}"></i>
    <i class="fas fa-check hide" id="accept_edit_${i}"></i>
    <i class="fas fa-times hide" id="cancel_edit_${i}"></i>`;
        listContainer.appendChild(newItem);



        editItem(newItem, i);
        deleteItem(i);
    }
}
updateItems();

/************** POP-UP *****************/


const addItem = document.getElementById('add_item');
const openPopUp = document.getElementById('open_popup');
const body = document.getElementById('body');
const popUp = document.getElementById('pop_up');
const closeOutside = document.getElementById('outside');
const cancel = document.getElementById('cancel');

form.addEventListener('submit', function (e) {
    e.preventDefault()


    itemsArray.push(descriptionInput.value)
    updateLocalStorage();

    descriptionInput.value = '';
})

descriptionInput.onkeyup = () => {
    let characters = descriptionInput.value.length;
    let charactersLeft = 300 - characters;
    const characterCount = document.getElementById('char_count');
    characterCount.innerText = charactersLeft;

    if (charactersLeft < 0) {
        characterCount.classList.add('too-long');
        descriptionInput.classList.add('input-too-long');
        characterCount.innerText = `${charactersLeft} - too many characters.`
        addItem.disabled = true;
        addItem.classList.add('button-dissabled');
    } else {
        characterCount.classList.remove('too-long');
        descriptionInput.classList.remove('input-too-long');
        addItem.disabled = false;
        addItem.classList.remove('button-dissabled');
    }
}


openPopUp.onclick = () => {
    popUp.style.visibility = 'visible';
    body.classList.add('stop-scrolling');
}

closeOutside.onclick = () => {
    popUp.style.visibility = 'hidden';
    body.classList.remove('stop-scrolling');
};

addItem.onclick = () => {
    popUp.style.visibility = 'hidden';
    body.classList.remove('stop-scrolling');
}

cancel.onclick = () => {
    popUp.style.visibility = 'hidden';
    body.classList.remove('stop-scrolling');
}

