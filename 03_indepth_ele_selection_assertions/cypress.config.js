import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      on('after:run', (results) => {
        console.log(results);
      });

      on('before:run', () => {
        console.log('Cypress Running...');
      });
    },
  },
});
