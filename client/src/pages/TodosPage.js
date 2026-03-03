import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Menu,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  MoreVert,
  CheckCircle,
  RadioButtonUnchecked,
  Search,
  FilterList,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  setFilters,
} from '../redux/slices/todoSlice';
import { openCreateTodoModal, openEditTodoModal, showSnackbar } from '../redux/slices/uiSlice';
import TodoFormModal from '../components/TodoFormModal';

const TodoCard = ({ todo, onEdit, onDelete, onToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(todo);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(todo._id);
    handleMenuClose();
  };

  const priorityColors = {
    high: '#f44336',
    medium: '#ff9800',
    low: '#4caf50',
  };

  const completedSubtasks = todo.subtasks?.filter((s) => s.completed).length || 0;
  const totalSubtasks = todo.subtasks?.length || 0;

  return (
    <Card
      sx={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s',
        opacity: todo.completed ? 0.7 : 1,
        '&:hover': {
          transform: 'translateY(-4px)',
          background: 'rgba(255, 255, 255, 0.15)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1} flexGrow={1}>
            <IconButton onClick={() => onToggle(todo._id, !todo.completed)} sx={{ color: 'white', p: 0 }}>
              {todo.completed ? (
                <CheckCircle sx={{ fontSize: 28, color: '#4caf50' }} />
              ) : (
                <RadioButtonUnchecked sx={{ fontSize: 28 }} />
              )}
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 600,
                textDecoration: todo.completed ? 'line-through' : 'none',
                wordBreak: 'break-word',
              }}
            >
              {todo.title}
            </Typography>
          </Box>
          <IconButton onClick={handleMenuClick} sx={{ color: 'white' }}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleEdit}>
              <Edit sx={{ mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: '#f44336' }}>
              <Delete sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </Menu>
        </Box>

        {todo.description && (
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
            {todo.description}
          </Typography>
        )}

        <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
          <Chip
            label={todo.priority}
            size="small"
            sx={{
              background: priorityColors[todo.priority] + '40',
              color: 'white',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          />
          {todo.category && (
            <Chip
              label={todo.category}
              size="small"
              sx={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          )}
        </Box>

        {totalSubtasks > 0 && (
          <Box>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Subtasks: {completedSubtasks}/{totalSubtasks}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(completedSubtasks / totalSubtasks) * 100}
              sx={{
                mt: 0.5,
                height: 6,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                },
              }}
            />
          </Box>
        )}

        {todo.dueDate && (
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1, display: 'block' }}>
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const TodosPage = () => {
  const dispatch = useDispatch();
  const { items: todos, loading, filters } = useSelector((state) => state.todos);
  const [searchText, setSearchText] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);
    dispatch(setFilters({ search: value }));
  };

  const handlePriorityFilter = (event) => {
    const value = event.target.value;
    setFilterPriority(value);
    dispatch(setFilters({ priority: value || undefined }));
  };

  const handleCategoryFilter = (event) => {
    const value = event.target.value;
    setFilterCategory(value);
    dispatch(setFilters({ category: value || undefined }));
  };

  const handleCompletedFilter = (event) => {
    const checked = event.target.checked;
    setShowCompleted(checked);
    if (!checked) {
      dispatch(setFilters({ completed: false }));
    } else {
      dispatch(setFilters({ completed: undefined }));
    }
  };

  const handleCreateTodo = () => {
    dispatch(openCreateTodoModal());
  };

  const handleEditTodo = (todo) => {
    dispatch(openEditTodoModal(todo));
  };

  const handleDeleteTodo = async (todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await dispatch(deleteTodo(todoId)).unwrap();
        dispatch(showSnackbar({ message: 'Todo deleted successfully', severity: 'success' }));
      } catch (error) {
        dispatch(showSnackbar({ message: 'Failed to delete todo', severity: 'error' }));
      }
    }
  };

  const handleToggleTodo = async (todoId, completed) => {
    try {
      await dispatch(updateTodo({ id: todoId, data: { completed } })).unwrap();
    } catch (error) {
      dispatch(showSnackbar({ message: 'Failed to update todo', severity: 'error' }));
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (!showCompleted && todo.completed) return false;
    if (filterPriority && todo.priority !== filterPriority) return false;
    if (filterCategory && todo.category !== filterCategory) return false;
    if (searchText) {
      const search = searchText.toLowerCase();
      return (
        todo.title.toLowerCase().includes(search) ||
        (todo.description && todo.description.toLowerCase().includes(search))
      );
    }
    return true;
  });

  const categories = [...new Set(todos.map((todo) => todo.category).filter(Boolean))];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
            My Tasks
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Manage and organize your todos
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateTodo}
          sx={{
            background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.8), rgba(59, 130, 246, 0.8))',
            '&:hover': {
              background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.9), rgba(59, 130, 246, 0.9))',
            },
          }}
        >
          New Task
        </Button>
      </Box>

      <Card
        sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          p: 3,
          mb: 3,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search tasks..."
              value={searchText}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <Search sx={{ color: 'rgba(255, 255, 255, 0.5)', mr: 1 }} />,
                sx: { color: 'white' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Priority</InputLabel>
              <Select
                value={filterPriority}
                onChange={handlePriorityFilter}
                label="Priority"
                sx={{ color: 'white' }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={handleCategoryFilter}
                label="Category"
                sx={{ color: 'white' }}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showCompleted}
                  onChange={handleCompletedFilter}
                  sx={{ color: 'white' }}
                />
              }
              label="Show completed"
              sx={{ color: 'white' }}
            />
          </Grid>
        </Grid>
      </Card>

      {loading ? (
        <LinearProgress />
      ) : (
        <>
          {filteredTodos.length > 0 ? (
            <Grid container spacing={3}>
              {filteredTodos.map((todo) => (
                <Grid item xs={12} sm={6} md={4} key={todo._id}>
                  <TodoCard
                    todo={todo}
                    onEdit={handleEditTodo}
                    onDelete={handleDeleteTodo}
                    onToggle={handleToggleTodo}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                p: 8,
                textAlign: 'center',
              }}
            >
              <FilterList sx={{ fontSize: 64, color: 'rgba(255, 255, 255, 0.3)', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                No tasks found
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Try adjusting your filters or create a new task
              </Typography>
            </Card>
          )}
        </>
      )}

      <TodoFormModal />
    </Box>
  );
};

export default TodosPage;
