
const model = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

let createTodo = (data) => {
    return new model(data).save();
};

let findById = (todoId) => {
    return model.findOne({ _id: todoId, active: true });
};

let findByIdAndUser = (todoId, userId) => {
    return model.findOne({ _id: todoId, userId: ObjectId(userId), active: true });
};

let findByUser = (userId, filters = {}) => {
    let query = { userId: ObjectId(userId), active: true };
    
    if (filters.completed !== undefined) {
        query.completed = filters.completed;
    }
    
    if (filters.priority) {
        query.priority = filters.priority;
    }
    
    if (filters.category) {
        query.category = filters.category;
    }
    
    if (filters.search) {
        query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
        ];
    }
    
    return model.find(query).sort({ createdAt: -1 });
};

let updateTodo = (todoId, userId, updateData) => {
    return model.findOneAndUpdate(
        { _id: ObjectId(todoId), userId: ObjectId(userId), active: true },
        updateData,
        { new: true }
    );
};

let deleteTodo = (todoId, userId) => {
    return model.findOneAndUpdate(
        { _id: ObjectId(todoId), userId: ObjectId(userId), active: true },
        { active: false },
        { new: true }
    );
};

let addSubtask = (todoId, userId, subtaskData) => {
    return model.findOneAndUpdate(
        { _id: ObjectId(todoId), userId: ObjectId(userId), active: true },
        { $push: { subtasks: subtaskData } },
        { new: true }
    );
};

let updateSubtask = (todoId, subtaskId, userId, updateData) => {
    return model.findOneAndUpdate(
        { 
            _id: ObjectId(todoId), 
            userId: ObjectId(userId), 
            active: true,
            'subtasks._id': ObjectId(subtaskId)
        },
        { $set: { 'subtasks.$': { ...updateData, _id: ObjectId(subtaskId) } } },
        { new: true }
    );
};

let deleteSubtask = (todoId, subtaskId, userId) => {
    return model.findOneAndUpdate(
        { _id: ObjectId(todoId), userId: ObjectId(userId), active: true },
        { $pull: { subtasks: { _id: ObjectId(subtaskId) } } },
        { new: true }
    );
};

module.exports = {
    createTodo,
    findById,
    findByIdAndUser,
    findByUser,
    updateTodo,
    deleteTodo,
    addSubtask,
    updateSubtask,
    deleteSubtask,
};
