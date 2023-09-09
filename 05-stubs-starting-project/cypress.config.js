import { defineConfig } from 'cypress';
import clipboardy from 'clipboardy';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        getClipboard() {
          return clipboardy.readSync();
        },
      });
    },
  },
});
