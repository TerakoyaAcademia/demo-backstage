import { BackstagePlugin, RouteRef } from '@backstage/core-api';

declare const gitlabPlaygroundPlugin: BackstagePlugin<{
    root: RouteRef<undefined>;
}, {}>;
declare const GitlabPlaygroundPage: () => JSX.Element;

export { GitlabPlaygroundPage, gitlabPlaygroundPlugin };
