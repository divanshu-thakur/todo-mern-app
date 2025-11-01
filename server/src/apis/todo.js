
const router = require('express').Router();
const { asyncExecute, isAuthenticated } = require('../middlewares');
const controller = require('../components/todo/controller');

// Todo CRUD routes
router.post('/', asyncExecute(isAuthenticated), asyncExecute(controller.createTodo));
router.get('/', asyncExecute(isAuthenticated), asyncExecute(controller.getTodos));
router.get('/:id', asyncExecute(isAuthenticated), asyncExecute(controller.getTodoById));
router.put('/:id', asyncExecute(isAuthenticated), asyncExecute(controller.updateTodo));
router.delete('/:id', asyncExecute(isAuthenticated), asyncExecute(controller.deleteTodo));

// Subtask routes
router.post('/:id/subtasks', asyncExecute(isAuthenticated), asyncExecute(controller.createSubtask));
router.put('/:todoId/subtasks/:subtaskId', asyncExecute(isAuthenticated), asyncExecute(controller.updateSubtask));
router.delete('/:todoId/subtasks/:subtaskId', asyncExecute(isAuthenticated), asyncExecute(controller.deleteSubtask));

module.exports = router;
