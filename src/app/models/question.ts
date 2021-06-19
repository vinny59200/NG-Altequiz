export class Question {
    id: number;
    question: string;
    choices_count: number;
    choices_content: string;
    answer: string;
    karma: number;
    
    constructor(questionData: Question) {
        Object.assign(this, {
            ...questionData
        })
    }
}
