import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Typography,
} from '@mui/material';
import { Close, Add, Delete } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, updateTodo } from '../redux/slices/todoSlice';
import { closeCreateTodoModal, closeEditTodoModal, showSnackbar } from '../redux/slices/uiSlice';

const TodoFormModal = () => {
  const dispatch = useDispatch();
  const { createTodoModalOpen, editTodoModalOpen, currentEditTodo } = useSelector((state) => state.ui);
  
  const isOpen = createTodoModalOpen || editTodoModalOpen;
  const isEditMode = editTodoModalOpen && currentEditTodo;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: null,
    category: '',
    tags: [],
  });
  
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        title: currentEditTodo.title || '',
        description: currentEditTodo.description || '',
        priority: currentEditTodo.priority || 'medium',
        dueDate: currentEditTodo.dueDate ? new Date(currentEditTodo.dueDate) : null,
        category: currentEditTodo.category || '',
        tags: currentEditTodo.tags || [],
      });
      setSubtasks(currentEditTodo.subtasks || []);
    } else {
      resetForm();
    }
  }, [isEditMode, currentEditTodo]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: null,
      category: '',
      tags: [],
    });
    setSubtasks([]);
    setNewSubtaskText('');
    setNewTag('');
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    if (isEditMode) {
      dispatch(closeEditTodoModal());
    } else {
      dispatch(closeCreateTodoModal());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) });
  };

  const handleAddSubtask = () => {
    if (newSubtaskText.trim()) {
      setSubtasks([
        ...subtasks,
        {
          text: newSubtaskText.trim(),
          completed: false,
          priority: 'medium',
        },
      ]);
      setNewSubtaskText('');
    }
  };

  const handleToggleSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setSubtasks(updatedSubtasks);
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const todoData = {
      ...formData,
      tags: formData.tags,
    };

    // Don't include subtasks in initial create (will be added separately)
    // For edit mode, include them
    if (isEditMode) {
      todoData.subtasks = subtasks;
    }

    try {
      if (isEditMode) {
        await dispatch(updateTodo({ id: currentEditTodo._id, data: todoData })).unwrap();
        dispatch(showSnackbar({ message: 'Todo updated successfully', severity: 'success' }));
      } else {
        await dispatch(createTodo(todoData)).unwrap();
        dispatch(showSnackbar({ message: 'Todo created successfully', severity: 'success' }));
      }
      handleClose();
    } catch (error) {
      dispatch(showSnackbar({ 
        message: isEditMode ? 'Failed to update todo' : 'Failed to create todo', 
        severity: 'error' 
      }));
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(30, 30, 60, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {isEditMode ? 'Edit Task' : 'Create New Task'}
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            error={!!errors.title}
            helperText={errors.title}
            InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
            InputProps={{ sx: { color: 'white' } }}
            FormHelperTextProps={{ sx: { color: '#f44336' } }}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
            InputProps={{ sx: { color: 'white' } }}
          />

          <Box display="flex" gap={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Priority</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                label="Priority"
                sx={{ color: 'white' }}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
              InputProps={{ sx: { color: 'white' } }}
            />
          </Box>

          <DatePicker
            label="Due Date"
            value={formData.dueDate}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                InputLabelProps: { sx: { color: 'rgba(255, 255, 255, 0.7)' } },
                InputProps: { sx: { color: 'white' } },
              },
            }}
          />

          <Box>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
              Tags
            </Typography>
            <Box display="flex" gap={1} mb={1} flexWrap="wrap">
              {formData.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  sx={{
                    background: 'rgba(147, 51, 234, 0.3)',
                    color: 'white',
                    '& .MuiChip-deleteIcon': { color: 'rgba(255, 255, 255, 0.7)' },
                  }}
                />
              ))}
            </Box>
            <Box display="flex" gap={1}>
              <TextField
                size="small"
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                InputProps={{ sx: { color: 'white' } }}
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="outlined"
                onClick={handleAddTag}
                sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}
              >
                Add
              </Button>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
              Subtasks
            </Typography>
            <List sx={{ mb: 1 }}>
              {subtasks.map((subtask, index) => (
                <ListItem
                  key={index}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <Checkbox
                    checked={subtask.completed}
                    onChange={() => handleToggleSubtask(index)}
                    sx={{ color: 'white' }}
                  />
                  <ListItemText
                    primary={subtask.text}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: 'white',
                        textDecoration: subtask.completed ? 'line-through' : 'none',
                      },
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveSubtask(index)}
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Box display="flex" gap={1}>
              <TextField
                size="small"
                placeholder="Add a subtask"
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
                InputProps={{ sx: { color: 'white' } }}
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddSubtask}
                sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
        <Button
          onClick={handleClose}
          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.8), rgba(59, 130, 246, 0.8))',
            '&:hover': {
              background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.9), rgba(59, 130, 246, 0.9))',
            },
          }}
        >
          {isEditMode ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoFormModal;
