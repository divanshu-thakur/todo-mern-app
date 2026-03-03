import React, { useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, LinearProgress, Chip } from '@mui/material';
import { Assignment, CheckCircle, HourglassEmpty, TrendingUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../redux/slices/todoSlice';

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <Card
    sx={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 3,
      height: '100%',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            background: `linear-gradient(45deg, \${color}20, \${color}40)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
          {value}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const TodoItem = ({ todo }) => (
  <Box
    sx={{
      p: 2,
      mb: 2,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 2,
      transition: 'all 0.2s',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.15)',
      },
    }}
  >
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
        {todo.title}
      </Typography>
      <Chip
        label={todo.priority}
        size="small"
        sx={{
          background:
            todo.priority === 'high'
              ? 'rgba(244, 67, 54, 0.3)'
              : todo.priority === 'medium'
              ? 'rgba(255, 152, 0, 0.3)'
              : 'rgba(76, 175, 80, 0.3)',
          color: 'white',
          fontWeight: 600,
        }}
      />
    </Box>
    {todo.description && (
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
        {todo.description.substring(0, 100)}
        {todo.description.length > 100 ? '...' : ''}
      </Typography>
    )}
    <Box display="flex" gap={1} flexWrap="wrap">
      {todo.category && (
        <Chip label={todo.category} size="small" sx={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white' }} />
      )}
      {todo.subtasks && todo.subtasks.length > 0 && (
        <Chip
          label={`\${todo.subtasks.filter((s) => s.completed).length}/\${todo.subtasks.length} subtasks`}
          size="small"
          sx={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
        />
      )}
    </Box>
  </Box>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: todos, loading } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  
  const highPriorityTodos = todos.filter((todo) => !todo.completed && todo.priority === 'high').length;
  const recentTodos = todos.slice(0, 5);

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
          Welcome back, {user?.userName || 'User'}! 👋
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Here's an overview of your tasks
        </Typography>
      </Box>

      {loading ? (
        <LinearProgress sx={{ mb: 4 }} />
      ) : (
        <>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Tasks"
                value={totalTodos}
                icon={<Assignment sx={{ color: '#667eea', fontSize: 32 }} />}
                color="#667eea"
                subtitle="All your tasks"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Completed"
                value={completedTodos}
                icon={<CheckCircle sx={{ color: '#4caf50', fontSize: 32 }} />}
                color="#4caf50"
                subtitle={`\${completionRate}% completion rate`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Pending"
                value={pendingTodos}
                icon={<HourglassEmpty sx={{ color: '#ff9800', fontSize: 32 }} />}
                color="#ff9800"
                subtitle="Tasks to complete"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="High Priority"
                value={highPriorityTodos}
                icon={<TrendingUp sx={{ color: '#f44336', fontSize: 32 }} />}
                color="#f44336"
                subtitle="Urgent tasks"
              />
            </Grid>
          </Grid>

          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
              Recent Tasks
            </Typography>
            {recentTodos.length > 0 ? (
              recentTodos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
            ) : (
              <Box
                sx={{
                  py: 8,
                  textAlign: 'center',
                }}
              >
                <Assignment sx={{ fontSize: 64, color: 'rgba(255, 255, 255, 0.3)', mb: 2 }} />
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                  No tasks yet
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Create your first task to get started
                </Typography>
              </Box>
            )}
          </Card>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
