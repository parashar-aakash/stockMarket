import * as dotenv from 'dotenv';
const enVars = dotenv.config();

console.log('Inside config', enVars);

const config: any = enVars.parsed;
Object.freeze(config);

export default config;
