/* eslint-disable import/no-extraneous-dependencies */
import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import path from 'path';
// import DtsCreator, { run } from 'typed-css-modules';

// function cssPlugin() {
//   var creator = new DtsCreator();

//   return {
//     name: 'css',

//     buildStart: function () {
//       run('src', {
//         silent: true,
//       });
//     },

//     handleHotUpdate: function (context) {
//       console.log(context.file);
//       if (!/\.module\.css$/.test(context.file)) return;
//       console.log('pass');
//       creator.create(context.file).then((content) => {
//         content.writeFile();
//       });
//     },
//   };
// }

export default defineConfig({
  plugins: [reactRefresh()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },

  build: {
    // Specify the output directory (relative to project root).
    outDir: 'dist',

    // Base public path when served in development or production.
    // base: '/',

    sourcemap: true,
  },
});
