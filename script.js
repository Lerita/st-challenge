const itemsQuantity = document.getElementById('items_quantity');
const listContainer = document.getElementById('list');
const eachItem = document.getElementById('each_item');
const form = document.getElementById('form');
const descriptionInput = document.getElementById('description');
const editItem = document.getElementById('edit');
const deleteItem = document.getElementById('delete');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []


updateInfo = () => {
    itemsQuantity.innerText = `${itemsArray.length} items`;
}
updateInfo();

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

        const deleteItem = document.getElementById(`delete_${i}`);
        const editItem = document.getElementById(`edit_${i}`);
        const acceptEdit = document.getElementById(`accept_edit_${i}`);
        const cancelEdit = document.getElementById(`cancel_edit_${i}`);

        editItem.onclick = () => {
            let itemDescription = itemsArray[i];
            newItem.children[1].innerHTML = `<textarea class="edit-description" id="description_${i}">${itemDescription}</textarea>`;
            editItem.classList.add('hide');
            deleteItem.classList.add('hide');
            acceptEdit.classList.remove('hide');
            cancelEdit.classList.remove('hide');

            acceptEdit.onclick = () => {
                let newDescription = document.getElementById(`description_${i}`).value;
                itemsArray[i] = newDescription;
                newItem.children[1].innerHTML = `<p>${newDescription}</p>`;
                editItem.classList.remove('hide');
                deleteItem.classList.remove('hide');
                acceptEdit.classList.add('hide');
                cancelEdit.classList.add('hide');
                console.log('el accept click funciona');
                localStorage.setItem('items', JSON.stringify(itemsArray))
            }

            cancelEdit.onclick = () => {
                newItem.children[1].innerHTML = `<p>${itemsArray[i]}</p>`;
                editItem.classList.remove('hide');
                deleteItem.classList.remove('hide');
                acceptEdit.classList.add('hide');
                cancelEdit.classList.add('hide');
            }
        }

        deleteItem.onclick = () => {
            itemsArray.splice(i, 1);

            updateItems();
            updateInfo();
            localStorage.setItem('items', JSON.stringify(itemsArray))
        }
    }
}
updateItems();



/************** POP-UP *****************/


const closePopUp = document.getElementById('close_popup');
const addItem = document.getElementById('add_item');
const body = document.getElementById('body');
const popUp = document.getElementById('pop_up');
const closeOutside = document.getElementById('outside');
const cancel = document.getElementById('cancel');

form.addEventListener('submit', function (e) {
    e.preventDefault()


    itemsArray.push(descriptionInput.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    updateItems();
    descriptionInput.value = '';
})

descriptionInput.onkeyup = () => {
    let characters = descriptionInput.value.length;
    let charactersLeft = 300 - characters;
    const characterCount = document.getElementById('char_count');
    characterCount.innerText = charactersLeft;

    if (charactersLeft < 0) {
        characterCount.classList.add('too-long');
        characterCount.innerText = `${charactersLeft} - too many characters.`
        closePopUp.disabled = true;
        closePopUp.classList.add('button-dissabled');
    } else {
        characterCount.classList.remove('too-long');
        closePopUp.disabled = false;
        closePopUp.classList.remove('button-dissabled');
    }
}


addItem.onclick = () => {
    popUp.style.visibility = 'visible';
    body.classList.add('stop-scrolling');
}

closeOutside.onclick = () => {
    popUp.style.visibility = 'hidden';
    body.classList.remove('stop-scrolling');
};

closePopUp.onclick = () => {
    popUp.style.visibility = 'hidden';
    body.classList.remove('stop-scrolling');
    localStorage.setItem('items', JSON.stringify(itemsArray))
}

cancel.onclick = () => {
    popUp.style.visibility = 'hidden';
    body.classList.remove('stop-scrolling');
}

