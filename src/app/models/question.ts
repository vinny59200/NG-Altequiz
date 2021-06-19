export class Question {
    id: number;
    question: string;
    choices_content: string;
    answer: string;
    karma: number;
    choices_count: number;

    constructor(questionData: Question) {
        Object.assign(this, {
            ...questionData
        })
    }
}
