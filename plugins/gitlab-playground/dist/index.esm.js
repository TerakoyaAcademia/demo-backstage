import { createRouteRef, createPlugin, createRoutableExtension } from '@backstage/core';

const rootRouteRef = createRouteRef({
  title: "gitlab-playground"
});

const gitlabPlaygroundPlugin = createPlugin({
  id: "gitlab-playground",
  routes: {
    root: rootRouteRef
  }
});
const GitlabPlaygroundPage = gitlabPlaygroundPlugin.provide(createRoutableExtension({
  component: () => import('./esm/index-81a98f4f.esm.js').then((m) => m.ExampleComponent),
  mountPoint: rootRouteRef
}));

export { GitlabPlaygroundPage, gitlabPlaygroundPlugin };
//# sourceMappingURL=index.esm.js.map
