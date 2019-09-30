var modalCall = document.querySelector(".modal");
var modalOpenButton = document.querySelector(".site-list__button-call");
var modalCallCloseButton = document.querySelector(".modal__close-button");


modalOpenButton.addEventListener("click", function () {
    modalCall.classList.add("modal--open")
});

function closeModal(evt) {
    evt.preventDefault();
    modalCall.classList.remove("modal--open");
}

modalCallCloseButton.addEventListener("click", closeModal);
