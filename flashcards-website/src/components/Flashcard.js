class Flashcard {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
        this.isFlipped = false;
    }

    flip() {
        this.isFlipped = !this.isFlipped;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'flashcard';
        card.innerText = this.isFlipped ? this.answer : this.question;

        card.addEventListener('click', () => {
            this.flip();
            card.innerText = this.isFlipped ? this.answer : this.question;
        });

        return card;
    }
}

export default Flashcard;