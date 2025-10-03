import './commands';
import 'cypress-plugin-api';

// Para habilitar o uso de tags (@cypress/grep) nos testes, adicione as linhas abaixo:
const { register: registerCypressGrep } = require('@cypress/grep');
registerCypressGrep();