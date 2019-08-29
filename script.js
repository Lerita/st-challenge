// import Sortable from 'sortablejs';

const itemsQuantity = document.getElementById('items_quantity');
const listContainer = document.getElementById('list');
const eachItem = document.getElementById('each_item');
const form = document.getElementById('form');
const input = document.getElementById('description');
const editItem = document.getElementById('edit');
const deleteItem = document.getElementById('delete');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

// localStorage.setItem('items', JSON.stringify(itemsArray))
// let data = JSON.parse(localStorage.getItem('items'))

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

        let deleteItem = document.getElementById(`delete_${i}`)
        deleteItem.onclick = () => {
            itemsArray.splice(i, 1);
            console.log('el click funciona');
            updateItems();
            updateInfo();
        }

        let editItem = document.getElementById(`edit_${i}`);
        editItem.onclick = () => {
            let itemToEdit = document.getElementById(`item_${i}`);
            console.log('el click de edit funciona');
            // itemToEdit
        }
    }
}
updateItems();



form.addEventListener('submit', function (e) {
    e.preventDefault()

    itemsArray.push(input.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    updateItems();
    input.value = '';
})

//   data.forEach(item => {
//     updateItems(item);
//   })




// let sortItems = document.getElementById('list');
// let sortable = Sortable.create(sortItems);


const addItem = document.getElementById('add_item');
const body = document.getElementById('body');
const popUp = document.getElementById('pop_up');
const closeOutside = document.getElementById('outside');
const cancel = document.getElementById('cancel');
const closePopUp = document.getElementById('close_popup');

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

