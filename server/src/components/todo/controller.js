
const { validateRequest } = require('../../middlewares');
const validator = require('./validator');
const service = require('./service');
const { RESPONSE_STATUS } = require('../../constants/status');

let createTodo = async (request, response) => {
    validateRequest(request, validator.createTodo);
    
    let newTodo = await service.createTodo(request.userObj._id, request.body);
    
    response.json({
        status: RESPONSE_STATUS.SUCCESS,
        data: newTodo,
    });
};

let getTodos = async (request, response) => {
    validateRequest(request, validator.getTodos);
    
    let todos = await service.getTodos(request.userObj._id, request.query);
    
    response.json({
        status: RESPONSE_STATUS.SUCCESS,
        data: todos,
    });
};

let getTodoById = async (request, response) => {
    validateRequest(request, validator.getTodoById);
    
    let todo = await service.getTodoById(request.params.id, request.userObj._id);
    
    response.json({
        status: RESPONSE_STATUS.SUCCESS,
        data: todo,
    });
};

let updateTodo = async (request, response) => {
    validateRequest(request, validator.updateTodo);
    
    let updatedTodo = await service.updateTodo(request.params.id, request.userObj._id, request.body);
    
    response.json({
        status: RESPONSE_STATUS.SUCCESS,
        data: updatedTodo,
    });
};

let deleteTodo = async (request, response) => {
    validateRequest(request, validator.deleteTodo);
    
    let result = await service.deleteTodo(request.params.id, request.userObj._id);
    
    response.json({
        status: RESPONSE_STATUS.SUCCESS,
        data: result,
    });
};

let createSubtask = async (request, response) => {
    validateRequest(request, validator.createSubtask);
    
    let updatedTodo = await service.createSubtask(request.params.id, request.userObj._id, request.body);
    
    response.json({
        status: RESPONSE_STATUS.SUCCESS,
        data: updatedTodo,
    });
};

let updateSubtask = async (request, response) => {
    validateRequest(request, validator.updateSubtask);
    
    let updatedTodo = await service.updateSubtask(request.params.todoId, request.params.subtaskId, request.userObj._id, request.body);
    
    response.json({
        status: RESPONSE_STATUS.SUCCESS,
        data: updatedTodo,
    });
};

let deleteSubtask = async (request, response) => {
    validateRequest(request, validator.deleteSubtask);
    
    let updatedTodo = await service.deleteSubtask(request.params.todoId, request.params.subtaskId, request.userObj._id);
    
    response.json({
        status: RESPONSE_STATUS.SUCCESS,
        data: updatedTodo,
    });
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
