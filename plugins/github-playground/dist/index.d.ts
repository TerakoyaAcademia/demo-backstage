import { BackstagePlugin, RouteRef } from '@backstage/core-api';

declare const githubPlaygroundPlugin: BackstagePlugin<{
    root: RouteRef<undefined>;
}, {}>;
declare const GithubPlaygroundPage: () => JSX.Element;

export { GithubPlaygroundPage, githubPlaygroundPlugin };
