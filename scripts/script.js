const selectors = {
    addTag: document.querySelector('.tagInput'),
    addTagButton: document.querySelector('.addTagButton'),
    tagsContainer: document.querySelector('.tagsContainer'),
    readOnlyCheckBox: document.querySelector('.readOnlyCheckBox'),
}

let tagsList = [];

if (localStorage.getItem('tags')) {
    tagsList = JSON.parse(localStorage.getItem('tags'));
    displayTags();
}

selectors.addTagButton.addEventListener('click', () => {
    let newTag = {
        tag: selectors.addTag.value,
    }

    if (newTag.tag.trim() === '') {
        alert('Please entry tag');
        return;
    }

    tagsList.push(newTag)
    displayTags();
    localStorage.setItem('tags', JSON.stringify(tagsList));
})

selectors.tagsContainer.addEventListener('click', (event) => {
    tagsList.splice(event.target.getAttribute('id'), 1)
    displayTags();
    localStorage.setItem('tags', JSON.stringify(tagsList));
    if (tagsList.length === 0) {
        selectors.tagsContainer.innerHTML = '';
        displayTags();
    }
})

selectors.readOnlyCheckBox.addEventListener('click', function () {
    let deleteTagButton = document.querySelectorAll('.deleteTagButton');
    selectors.addTagButton.disabled = this.checked;
    deleteTagButton.forEach(deleteButton => deleteButton.disabled = this.checked);
})

function displayTags() {
    let displayTags = '';
    tagsList.forEach((item, index) => {
        displayTags += `
        <div class="tag">
            <span>${item.tag}</span>
            <button onclick="" type="submit" class="deleteTagButton"><i class="fa fa-close" id="${index}"></i></button>
        </div>
        `;
        selectors.tagsContainer.innerHTML = displayTags;
    })
}