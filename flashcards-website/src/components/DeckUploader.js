class DeckUploader {
    constructor(uploadElement, deckDisplayElement) {
        this.uploadElement = uploadElement;
        this.deckDisplayElement = deckDisplayElement;
        this.uploadElement.addEventListener('change', (event) => this.handleFileUpload(event));
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => this.parseFile(e.target.result);
            reader.readAsText(file);
        }
    }

    parseFile(content) {
        const lines = content.split('\n');
        const deck = lines.map(line => {
            const [question, answer] = line.split(' - ');
            return { question: question.trim(), answer: answer.trim() };
        }).filter(item => item.question && item.answer);

        this.updateDeckDisplay(deck);
    }

    updateDeckDisplay(deck) {
        this.deckDisplayElement.innerHTML = '';
        deck.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'flashcard';
            cardElement.innerHTML = `<strong>Q:</strong> ${card.question}<br><strong>A:</strong> ${card.answer}`;
            this.deckDisplayElement.appendChild(cardElement);
        });
    }
}

export default DeckUploader;