function modalOpen() {
    modalOverlay.classList.remove("modal-close");
    modalOverlay.classList.add("modal-open");
}

function modalClose() {
    modalOverlay.classList.remove("modal-open");
    modalOverlay.classList.add("modal-close");
}

const modalOverlay = document.querySelector(".modal-overlay");

const listener = event => {
    if (event.target.dataset.close) {
        modalClose()
    }
}

modalClose();
modalOverlay.addEventListener("click", listener);