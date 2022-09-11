import Server from './server';
import { config }  from './config';

console.log( 'Config is', config );
const server = new Server ( { PORT: config.PORT, MONGO_URL: config.MONGO_URL } );

server.bootstrap().run();
