
const router = require('express').Router();
const { isAuthenticated } = require('../middlewares');
const controller = require('../components/todo/controller');

// Todo CRUD routes
router.post('/', isAuthenticated, controller.createTodo);
router.get('/', isAuthenticated, controller.getTodos);
router.get('/:id', isAuthenticated, controller.getTodoById);
router.put('/:id', isAuthenticated, controller.updateTodo);
router.delete('/:id', isAuthenticated, controller.deleteTodo);

// Subtask routes
router.post('/:id/subtasks', isAuthenticated, controller.createSubtask);
router.put('/:todoId/subtasks/:subtaskId', isAuthenticated, controller.updateSubtask);
router.delete('/:todoId/subtasks/:subtaskId', isAuthenticated, controller.deleteSubtask);

module.exports = router;
