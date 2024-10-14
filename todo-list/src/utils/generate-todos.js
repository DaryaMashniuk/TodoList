import { v4 as uuidv4 } from "uuid";

const importancyLevels = ["low", "medium", "high"];

export const generateTodos = (n = 5000) => {
    const todos = [];
    for (let i = 0; i < n; i++) {
        todos.push(generateTodo()); 
    }
    return todos;
};

const generateTodo = () => ({
    id: uuidv4(),  
    name: `Задача ${getRandomString()}`, 
    body: `Описание ${getRandomString()}`, 
    checked: Math.random() > 0.5,  
    created: new Date().toLocaleString(),  
    todoImportancy: getRandomImportancy(), 
});

const getRandomString = () => Math.random().toString(36).substring(2, 8);

const getRandomImportancy = () => importancyLevels[Math.floor(Math.random() * importancyLevels.length)];