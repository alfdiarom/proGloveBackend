import http from 'http'
import { Server } from 'socket.io'
import express from 'express'
import cors from 'cors'
import swaggerTools from 'swagger-tools'
import jsyaml  from 'js-yaml'
import fs from 'fs'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import customEnv from 'custom-env'

customEnv.env(process.env.NODE_ENV);

const app = express();
const httpServer = http.Server(app);
const io = new Server(httpServer);

const serverHost = process.env.IO_HOST;
const serverPort = process.env.IO_PORT;
const spec = fs.readFileSync('./init.yaml', 'utf8');

// swaggerRouter Configuración
const options = {
  swaggerUi: '/swagger.json',
  controllers: './src/controllers',
  useStubs: process.env.NODE_ENV == 'development' 
    ? true : process.env.NODE_ENV == 'integration' 
      ? true : false // Condicional para activar los stubs (mock mode)
};

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Swagger doc
let swaggerDoc = jsyaml.safeLoad(spec);

// Iniciar Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpretar los recursos de Swagger y adjuntar metadatos para solicitar
  app.use(middleware.swaggerMetadata());

	app.use(cors());

  // Validar las solicitudes de Swagger
  app.use(middleware.swaggerValidator());

  // Enruta las solicitudes validadas al controlador apropiado
  app.use(middleware.swaggerRouter(options));

  // Sirve los documentos Swagger y Swagger UI
  app.use(middleware.swaggerUi());

  // Inicia el servidor API REST
  httpServer.listen(serverPort, function () {
    console.log(`Swagger-ui está disponible en http://${serverHost}:${serverPort}/docs`);
  });
});

export { io }