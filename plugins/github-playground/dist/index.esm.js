import { createRouteRef, createPlugin, createRoutableExtension } from '@backstage/core';

const rootRouteRef = createRouteRef({
  title: "github-playground"
});

const githubPlaygroundPlugin = createPlugin({
  id: "github-playground",
  routes: {
    root: rootRouteRef
  }
});
const GithubPlaygroundPage = githubPlaygroundPlugin.provide(createRoutableExtension({
  component: () => import('./esm/index-70c25c15.esm.js').then((m) => m.ExampleComponent),
  mountPoint: rootRouteRef
}));

export { GithubPlaygroundPage, githubPlaygroundPlugin };
//# sourceMappingURL=index.esm.js.map
