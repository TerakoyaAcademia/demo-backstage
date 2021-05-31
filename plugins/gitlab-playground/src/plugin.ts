import { createPlugin, createRoutableExtension } from '@backstage/core';

import { rootRouteRef } from './routes';

export const gitlabPlaygroundPlugin = createPlugin({
  id: 'gitlab-playground',
  routes: {
    root: rootRouteRef,
  },
});

export const GitlabPlaygroundPage = gitlabPlaygroundPlugin.provide(
  createRoutableExtension({
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
