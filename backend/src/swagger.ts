import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const PORT = process.env.PORT || 5000;
// Swagger definition and options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Search API', // Title for your API documentation
      version: '1.0.0', // API version
      description: 'API documentation for the Job Search application',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // URL of the server
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Function to set up Swagger UI in your app
export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at /api-docs');
};