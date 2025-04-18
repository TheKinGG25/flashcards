// This file contains the JavaScript code that handles the functionality of the website, including loading flashcards, displaying them, and managing the deck upload process.

document.addEventListener('DOMContentLoaded', () => {
    const deckUploader = new DeckUploader();
    const flashcardContainer = document.getElementById('flashcard-container');

    document.getElementById('upload-button').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            deckUploader.uploadFile(file)
                .then(flashcards => {
                    displayFlashcards(flashcards);
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        }
    });

    function displayFlashcards(flashcards) {
        flashcardContainer.innerHTML = '';
        flashcards.forEach(flashcard => {
            const cardElement = document.createElement('div');
            cardElement.className = 'flashcard';
            cardElement.innerHTML = `
                <div class="front">${flashcard.question}</div>
                <div class="back">${flashcard.answer}</div>
            `;
            cardElement.addEventListener('click', () => {
                cardElement.classList.toggle('flipped');
            });
            flashcardContainer.appendChild(cardElement);
        });
    }
});