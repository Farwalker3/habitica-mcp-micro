# Habitica MCP Micro Server

A lightweight Express.js micro server that provides MCP (Model Context Protocol) endpoints for integrating with the Habitica API. This server enables easy interaction with Habitica's task management and gamification features through a simple REST API.

## Features

- ✅ Get user profile and stats
- ✅ Retrieve tasks (all types: habits, dailies, todos, rewards)
- ✅ Create new tasks
- ✅ Score tasks (complete/uncomplete)
- ✅ Update existing tasks
- ✅ Delete tasks
- ✅ Get user statistics (HP, MP, EXP, GP, Level, Class)
- ✅ CORS enabled for web applications
- ✅ Ready for Vercel deployment

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Farwalker3/habitica-mcp-micro.git
cd habitica-mcp-micro
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000` by default.

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## API Endpoints

### Health Check

**GET /**

Returns server status and capabilities.

```json
{
  "name": "Habitica MCP Micro Server",
  "version": "1.0.0",
  "status": "running",
  "capabilities": ["get_user_profile", "get_tasks", ...]
}
```

### Get User Profile

**POST /mcp/user**

Retrieve complete user profile information.

**Request Body:**
```json
{
  "userId": "your-habitica-user-id",
  "apiToken": "your-habitica-api-token"
}
```

### Get Tasks

**POST /mcp/tasks**

Retrieve user's tasks. Optionally filter by type.

**Request Body:**
```json
{
  "userId": "your-habitica-user-id",
  "apiToken": "your-habitica-api-token",
  "type": "habits" // Optional: habits, dailys, todos, rewards
}
```

### Create Task

**POST /mcp/tasks/create**

Create a new task in Habitica.

**Request Body:**
```json
{
  "userId": "your-habitica-user-id",
  "apiToken": "your-habitica-api-token",
  "task": {
    "text": "Complete project documentation",
    "type": "todo",
    "notes": "Add API endpoints and examples",
    "priority": 2
  }
}
```

### Score Task

**POST /mcp/tasks/:taskId/score**

Score a task up (complete) or down (uncomplete).

**Request Body:**
```json
{
  "userId": "your-habitica-user-id",
  "apiToken": "your-habitica-api-token",
  "direction": "up" // or "down"
}
```

### Update Task

**POST /mcp/tasks/:taskId/update**

Update an existing task.

**Request Body:**
```json
{
  "userId": "your-habitica-user-id",
  "apiToken": "your-habitica-api-token",
  "updates": {
    "text": "Updated task text",
    "notes": "Updated notes"
  }
}
```

### Delete Task

**POST /mcp/tasks/:taskId/delete**

Delete a task.

**Request Body:**
```json
{
  "userId": "your-habitica-user-id",
  "apiToken": "your-habitica-api-token"
}
```

### Get Stats

**POST /mcp/stats**

Get user's game statistics.

**Request Body:**
```json
{
  "userId": "your-habitica-user-id",
  "apiToken": "your-habitica-api-token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hp": 50,
    "mp": 30,
    "exp": 120,
    "gp": 45.5,
    "lvl": 5,
    "class": "warrior"
  }
}
```

## Getting Habitica Credentials

1. Log in to [Habitica](https://habitica.com)
2. Go to Settings → API
3. Copy your User ID and API Token
4. **Keep these credentials secure!**

## Security Considerations

- Never commit Habitica credentials to version control
- Use environment variables for sensitive data in production
- Implement rate limiting for production deployments
- Consider adding authentication middleware for public deployments
- Use HTTPS in production environments

## Error Handling

All endpoints return a consistent error format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

## Dependencies

- **express**: Web server framework
- **cors**: Enable Cross-Origin Resource Sharing
- **axios**: HTTP client for Habitica API requests
- **nodemon**: Development auto-reload (dev dependency)

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Resources

- [Habitica API Documentation](https://habitica.com/apidoc/)
- [Express.js Documentation](https://expressjs.com/)
- [Vercel Documentation](https://vercel.com/docs)

## Author

John C. Barr (Farwalker3)

## Changelog

### v1.0.0 (2026-03-02)
- Initial release
- Basic MCP endpoints for Habitica integration
- Vercel deployment support
