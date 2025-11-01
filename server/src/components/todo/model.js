
'use strict';

const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

let subtaskSchema = new SCHEMA(
    {
        text: {
            type: String,
            trim: true,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
    },
    { timestamps: true }
);

let todoSchema = new SCHEMA(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        completed: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        dueDate: {
            type: Date,
            default: null,
        },
        category: {
            type: String,
            trim: true,
            default: 'general',
        },
        tags: [{
            type: String,
            trim: true,
        }],
        subtasks: [subtaskSchema],
        userId: {
            type: SCHEMA.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

let modelTodo = MONGOOSE.model('todo', todoSchema);

module.exports = modelTodo;
