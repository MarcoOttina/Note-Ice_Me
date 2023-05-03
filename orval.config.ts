import { defineConfig } from 'orval';

export default defineConfig({
  backend: {
    output: {
      mode: 'split',
      target: 'src/apis/rest/endpoints.ts',
      schemas: 'src/apis/rest/model',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/provider/use-custom-instance.ts',
          name: 'useCustomInstance',
        },
      },
      prettier: true,
      tslint: false,
    },
    input: {
      target: '../mirable-swagger/openapi',
    },
  },
});
