

// https://vitejs.dev/config/
export default {
  // ...
  server: {
    proxy: {
      '/api': 'http://localhost:3001', // Reemplaza la URL con la de tu servidor Express
    },
  },
};

