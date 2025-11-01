
const DAL = require('./DAL');
const AppError = require('../../utils/appError');
const { ERROR_CODES } = require('../../constants/error');

let createTodo = async (userId, todoData) => {
    let createTodoObj = {
        ...todoData,
        userId,
    };
    
    let newTodo = await DAL.createTodo(createTodoObj);
    
    return newTodo;
};

let getTodos = async (userId, filters = {}) => {
    let todos = await DAL.findByUser(userId, filters);
    
    return todos;
};

let getTodoById = async (todoId, userId) => {
    let todo = await DAL.findByIdAndUser(todoId, userId);
    if (!todo) throw new AppError(ERROR_CODES.TODO_NOT_FOUND);
    
    return todo;
};

let updateTodo = async (todoId, userId, updateData) => {
    let updatedTodo = await DAL.updateTodo(todoId, userId, updateData);
    if (!updatedTodo) throw new AppError(ERROR_CODES.TODO_NOT_FOUND);
    
    return updatedTodo;
};

let deleteTodo = async (todoId, userId) => {
    let deletedTodo = await DAL.deleteTodo(todoId, userId);
    if (!deletedTodo) throw new AppError(ERROR_CODES.TODO_NOT_FOUND);
    
    return { message: 'Todo deleted successfully' };
};

let createSubtask = async (todoId, userId, subtaskData) => {
    let updatedTodo = await DAL.addSubtask(todoId, userId, subtaskData);
    if (!updatedTodo) throw new AppError(ERROR_CODES.TODO_NOT_FOUND);
    
    return updatedTodo;
};

let updateSubtask = async (todoId, subtaskId, userId, updateData) => {
    let updatedTodo = await DAL.updateSubtask(todoId, subtaskId, userId, updateData);
    if (!updatedTodo) throw new AppError(ERROR_CODES.TODO_NOT_FOUND);
    
    return updatedTodo;
};

let deleteSubtask = async (todoId, subtaskId, userId) => {
    let updatedTodo = await DAL.deleteSubtask(todoId, subtaskId, userId);
    if (!updatedTodo) throw new AppError(ERROR_CODES.TODO_NOT_FOUND);
    
    return updatedTodo;
};

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    createSubtask,
    updateSubtask,
    deleteSubtask,
};
