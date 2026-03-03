import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Async thunks for todos
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_BASE_URL}/todos?${queryParams}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, todoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createSubtask = createAsyncThunk(
  'todos/createSubtask',
  async ({ todoId, subtaskData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos/${todoId}/subtasks`, subtaskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSubtask = createAsyncThunk(
  'todos/updateSubtask',
  async ({ todoId, subtaskId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${todoId}/subtasks/${subtaskId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSubtask = createAsyncThunk(
  'todos/deleteSubtask',
  async ({ todoId, subtaskId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/todos/${todoId}/subtasks/${subtaskId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      search: '',
      priority: '',
      category: '',
      completed: undefined,
    },
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSorting: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    clearError: (state) => {
      state.error = null;
    },
    optimisticToggleTodo: (state, action) => {
      const todo = state.items.find(item => item._id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    optimisticToggleSubtask: (state, action) => {
      const { todoId, subtaskId } = action.payload;
      const todo = state.items.find(item => item._id === todoId);
      if (todo) {
        const subtask = todo.subtasks.find(sub => sub._id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Todo
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload.data);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Subtask operations
      .addCase(createSubtask.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(updateSubtask.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(deleteSubtask.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      });
  },
});

export const { 
  setFilters, 
  setSorting, 
  clearError, 
  optimisticToggleTodo, 
  optimisticToggleSubtask 
} = todoSlice.actions;

export default todoSlice.reducer;
