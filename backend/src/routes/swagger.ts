import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Application } from 'express';

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Search API',
      version: '1.0.0',
      description:
        'API documentation for the Job Search application',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

const openapiSpecification = swaggerJsdoc(options);

export const addSwagger = (app: Application) => {
    const swaggerRoute = '/api' 
  app.use(swaggerRoute, swaggerUi.serve, swaggerUi.setup(openapiSpecification));
  console.log(`Swagger docs available at http://localhost:${process.env.PORT}${swaggerRoute}`);
};