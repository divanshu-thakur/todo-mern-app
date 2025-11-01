
const Joi = require('joi');

const createTodo = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().optional().allow(''),
        priority: Joi.string().valid('low', 'medium', 'high').optional(),
        dueDate: Joi.date().optional().allow(null),
        category: Joi.string().optional(),
        tags: Joi.array().items(Joi.string()).optional(),
    }),
};

const getTodos = {
    query: Joi.object().keys({
        completed: Joi.boolean().optional(),
        priority: Joi.string().valid('low', 'medium', 'high').optional(),
        category: Joi.string().optional(),
        search: Joi.string().optional(),
    }),
};

const getTodoById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateTodo = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().optional(),
        description: Joi.string().optional().allow(''),
        completed: Joi.boolean().optional(),
        priority: Joi.string().valid('low', 'medium', 'high').optional(),
        dueDate: Joi.date().optional().allow(null),
        category: Joi.string().optional(),
        tags: Joi.array().items(Joi.string()).optional(),
    }),
};

const deleteTodo = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const createSubtask = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        text: Joi.string().required(),
        priority: Joi.string().valid('low', 'medium', 'high').optional(),
    }),
};

const updateSubtask = {
    params: Joi.object().keys({
        todoId: Joi.string().required(),
        subtaskId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        text: Joi.string().optional(),
        completed: Joi.boolean().optional(),
        priority: Joi.string().valid('low', 'medium', 'high').optional(),
    }),
};

const deleteSubtask = {
    params: Joi.object().keys({
        todoId: Joi.string().required(),
        subtaskId: Joi.string().required(),
    }),
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
