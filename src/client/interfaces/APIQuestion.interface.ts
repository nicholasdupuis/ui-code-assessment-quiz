export interface APIQuestion {
    category?: string
    correct_answer?: string | boolean
    difficulty?: string
    incorrect_answers?: string[]
    question?: string,
    type?: string
}