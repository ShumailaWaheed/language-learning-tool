#! /usr/bin/env node
import inquirer from "inquirer";
// Define a class for LanguageLearningTool
class LanguageLearningTool {
    // Properties
    vocabulary; // Map of words and their translations
    // Constructor
    constructor() {
        this.vocabulary = new Map();
    }
    // Method to add words and translations to the vocabulary
    addWord(word, translation) {
        this.vocabulary.set(word, translation);
    }
    // Method to start the language learning tool
    async start() {
        console.log("Welcome to the Language Learning Tool!");
        while (true) {
            const { choice } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'choice',
                    message: 'What would you like to do?',
                    choices: ['Add Word', 'Start Quiz', 'Exit']
                }
            ]);
            if (choice === 'Add Word') {
                await this.addWordPrompt();
            }
            else if (choice === 'Start Quiz') {
                await this.startQuizPrompt();
            }
            else {
                console.log("Thank you for using the Language Learning Tool. Goodbye!");
                break;
            }
        }
    }
    // Method to prompt user for word and translation to add to the vocabulary
    async addWordPrompt() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'word',
                message: 'Enter the word:'
            },
            {
                type: 'input',
                name: 'translation',
                message: 'Enter its translation:'
            }
        ]);
        this.addWord(answers.word, answers.translation);
        console.log('Word added to the vocabulary!');
    }
    // Method to start a quiz
    async startQuizPrompt() {
        const { quizType } = await inquirer.prompt([
            {
                type: 'list',
                name: 'quizType',
                message: 'Select quiz type:',
                choices: ['Translation', 'Reverse Translation']
            }
        ]);
        const numberOfQuestions = await inquirer.prompt({
            type: 'number',
            name: 'numberOfQuestions',
            message: 'Enter the number of questions:'
        });
        const quizResults = await this.startQuiz(quizType, numberOfQuestions.numberOfQuestions);
        console.log('Quiz ended! Here are your results:');
        console.table(quizResults);
    }
    // Method to start a quiz of a specified type with a certain number of questions
    async startQuiz(quizType, numberOfQuestions) {
        const quizWords = Array.from(this.vocabulary.entries()).sort(() => Math.random() - 0.5).slice(0, numberOfQuestions);
        const quizResults = [];
        for (const [word, translation] of quizWords) {
            let userTranslation = '';
            if (quizType === 'Translation') {
                userTranslation = (await inquirer.prompt({
                    type: 'input',
                    name: 'translation',
                    message: `Translate "${word}":`
                })).translation;
            }
            else if (quizType === 'Reverse Translation') {
                userTranslation = (await inquirer.prompt({
                    type: 'input',
                    name: 'translation',
                    message: `Translate "${translation}":`
                })).translation;
            }
            const isCorrect = userTranslation.toLowerCase() === translation.toLowerCase();
            quizResults.push({ word, userTranslation, correctTranslation: translation, isCorrect });
        }
        return quizResults;
    }
}
// Example usage
const languageTool = new LanguageLearningTool();
languageTool.addWord("hello", "Shumaila");
languageTool.addWord("goodbye", "Urooj");
languageTool.addWord("thank you", "Mehak");
languageTool.start();
