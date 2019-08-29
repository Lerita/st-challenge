// import Sortable from 'sortablejs';

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
        newItem.id = `item_${i}`;
        // newItem.children[0].src = ;
        newItem.children[1].innerText = `${itemsArray[i]}`;
        newItem.children[2].innerHTML = `<i class="fas fa-pencil-alt" id="edit_${i}"></i>
    <i class="fas fa-minus-circle" id="delete_${i}"></i>`;
        listContainer.appendChild(newItem);


        let editItem = document.getElementById(`edit_${i}`);
        editItem.onclick = () => {
            let itemDescription = itemsArray[i];
            newItem.children[1].innerHTML = `<textarea class="edit-description" id="description_${i}">${itemDescription}</textarea>`
            newItem.children[2].innerHTML = `<i class="fas fa-check" id="accept_edit"></i>
            <i class="fas fa-times" id="cancel_edit"></i>`
            console.log('el click de edit funciona');

            let acceptEdit = document.getElementById(`accept_edit`);
            acceptEdit.onclick = () => {
                let newDescription = document.getElementById(`description_${i}`).value;
                itemsArray[i] = newDescription;
                newItem.children[1].innerHTML = `<p>${newDescription}</p>`;
                newItem.children[2].innerHTML = `<i class="fas fa-pencil-alt" id="edit_${i}"></i>
                <i class="fas fa-minus-circle" id="delete_${i}"></i>`;
                console.log('el accept click funciona');
            }

            let cancelEdit = document.getElementById(`cancel_edit`);
            cancelEdit.onclick = () => {
                newItem.children[1].innerHTML = `<p>${itemsArray[i]}</p>`;
                newItem.children[2].innerHTML = `<i class="fas fa-pencil-alt" id="edit_${i}"></i>
            <i class="fas fa-minus-circle" id="delete_${i}"></i>`
            }
        }

        let deleteItem = document.getElementById(`delete_${i}`);
        deleteItem.onclick = () => {
            itemsArray.splice(i, 1);
            console.log('el click funciona');
            updateItems();
            updateInfo();
        }
    }
}
updateItems();



// let urlObject = window.URL || window.webkitURL;
// document.getElementbyId('file').change(function(e) {
//     let file;
//     if ((file = this.files[0])) {
//         img = document.getElementById('img');
//         img.onerror = function() {
//             alert( "not a valid file: " + file.type);
//         };
//         img.src = urlObject.createObjectURL(file);
//     }
// });

const closePopUp = document.getElementById('close_popup');


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

    if (characters > 300) {
        closePopUp.disabled = true;
        closePopUp.classList.add('button-dissabled');
    } else {
        closePopUp.disabled = false;
        closePopUp.classList.remove('button-dissabled');
    }

    if (charactersLeft < 0) {
        characterCount.classList.add('too-long');
        characterCount.innerText = `${charactersLeft} - too many characters.`
    } else {
        characterCount.classList.remove('too-long');
    }
}




// let sortItems = document.getElementById('list');
// let sortable = Sortable.create(sortItems);


const addItem = document.getElementById('add_item');
const body = document.getElementById('body');
const popUp = document.getElementById('pop_up');
const closeOutside = document.getElementById('outside');
const cancel = document.getElementById('cancel');

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
    location.reload();
}

cancel.onclick = () => {
    popUp.style.visibility = 'hidden';
    body.classList.remove('stop-scrolling');
}

