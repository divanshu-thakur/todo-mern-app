import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false,
    createTodoModalOpen: false,
    editTodoModalOpen: false,
    currentEditTodo: null,
    snackbar: {
      open: false,
      message: '',
      severity: 'info', // 'success', 'error', 'warning', 'info'
    },
    loading: {
      global: false,
      todos: false,
      auth: false,
    },
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    openCreateTodoModal: (state) => {
      state.createTodoModalOpen = true;
    },
    closeCreateTodoModal: (state) => {
      state.createTodoModalOpen = false;
    },
    openEditTodoModal: (state, action) => {
      state.editTodoModalOpen = true;
      state.currentEditTodo = action.payload;
    },
    closeEditTodoModal: (state) => {
      state.editTodoModalOpen = false;
      state.currentEditTodo = null;
    },
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setTodosLoading: (state, action) => {
      state.loading.todos = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.loading.auth = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  openCreateTodoModal,
  closeCreateTodoModal,
  openEditTodoModal,
  closeEditTodoModal,
  showSnackbar,
  hideSnackbar,
  setGlobalLoading,
  setTodosLoading,
  setAuthLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
