const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Habitica API configuration
const HABITICA_API_BASE = 'https://habitica.com/api/v3';

// Helper function to make Habitica API requests
async function habiticaRequest(endpoint, method = 'GET', data = null, userId, apiToken) {
  if (!userId || !apiToken) {
    throw new Error('Habitica credentials not provided');
  }

  const config = {
    method,
    url: `${HABITICA_API_BASE}${endpoint}`,
    headers: {
      'x-api-user': userId,
      'x-api-key': apiToken,
      'Content-Type': 'application/json',
    },
  };

  if (data && method !== 'GET') {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(`Habitica API error: ${error.response?.data?.message || error.message}`);
  }
}

// MCP Server endpoints

// Health check
app.get('/', (req, res) => {
  res.json({
    name: 'Habitica MCP Micro Server',
    version: '1.0.0',
    status: 'running',
    capabilities: [
      'get_user_profile',
      'get_tasks',
      'create_task',
      'score_task',
      'update_task',
      'delete_task',
      'get_stats'
    ]
  });
});

// Get user profile
app.post('/mcp/user', async (req, res) => {
  try {
    const { userId, apiToken } = req.body;
    const data = await habiticaRequest('/user', 'GET', null, userId, apiToken);
    res.json({
      success: true,
      data: data.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get user tasks
app.post('/mcp/tasks', async (req, res) => {
  try {
    const { userId, apiToken, type } = req.body;
    const endpoint = type ? `/tasks/user?type=${type}` : '/tasks/user';
    const data = await habiticaRequest(endpoint, 'GET', null, userId, apiToken);
    res.json({
      success: true,
      data: data.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create a new task
app.post('/mcp/tasks/create', async (req, res) => {
  try {
    const { userId, apiToken, task } = req.body;
    const data = await habiticaRequest('/tasks/user', 'POST', task, userId, apiToken);
    res.json({
      success: true,
      data: data.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Score a task (up or down)
app.post('/mcp/tasks/:taskId/score', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId, apiToken, direction } = req.body;
    const data = await habiticaRequest(
      `/tasks/${taskId}/score/${direction || 'up'}`,
      'POST',
      null,
      userId,
      apiToken
    );
    res.json({
      success: true,
      data: data.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update a task
app.post('/mcp/tasks/:taskId/update', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId, apiToken, updates } = req.body;
    const data = await habiticaRequest(
      `/tasks/${taskId}`,
      'PUT',
      updates,
      userId,
      apiToken
    );
    res.json({
      success: true,
      data: data.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete a task
app.post('/mcp/tasks/:taskId/delete', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId, apiToken } = req.body;
    const data = await habiticaRequest(
      `/tasks/${taskId}`,
      'DELETE',
      null,
      userId,
      apiToken
    );
    res.json({
      success: true,
      data: data.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get user stats
app.post('/mcp/stats', async (req, res) => {
  try {
    const { userId, apiToken } = req.body;
    const data = await habiticaRequest('/user', 'GET', null, userId, apiToken);
    const stats = data.data.stats;
    res.json({
      success: true,
      data: {
        hp: stats.hp,
        mp: stats.mp,
        exp: stats.exp,
        gp: stats.gp,
        lvl: stats.lvl,
        class: stats.class
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Habitica MCP Micro Server running on port ${port}`);
});

module.exports = app;
