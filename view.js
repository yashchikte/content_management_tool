const createForm = document.getElementById('createForm');
const list = document.getElementById('list');
let contents = JSON.parse(localStorage.getItem('contents')) || [];

createForm.addEventListener('submit', createContent);

function createContent(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const content = { title, body };
    
    contents.push(content);
    localStorage.setItem('contents', JSON.stringify(contents));
    
    renderList();
    createForm.reset();
}

function renderList() {
    list.innerHTML = '';
    contents.forEach((content, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${content.title}</strong>: ${content.body} <button class="delete" data-index="${index}">Delete</button>`;
        list.appendChild(listItem);
    });

    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteContent);
    });
}

function deleteContent(event) {
    const index = event.target.dataset.index;
    contents.splice(index, 1);
    localStorage.setItem('contents', JSON.stringify(contents));
    renderList();
}

// Initial rendering
renderList();
