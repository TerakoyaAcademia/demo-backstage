import React from 'react';
import { Navigate, Route } from 'react-router';
import {
  AlertDisplay,
  createApp,
  FlatRoutes,
  OAuthRequestDialog,
} from '@backstage/core';
import { ApiExplorerPage } from '@backstage/plugin-api-docs';
import { githubAuthApiRef, gitlabAuthApiRef, SignInPage } from '@backstage/core';
import {
  CatalogEntityPage,
  CatalogIndexPage,
} from '@backstage/plugin-catalog';
import { CatalogImportPage } from '@backstage/plugin-catalog-import';
import { ScaffolderPage } from '@backstage/plugin-scaffolder';
import { SearchPage } from '@backstage/plugin-search';
import *  as plugins from './plugins';
import { TechRadarPage } from '@backstage/plugin-tech-radar';
import { TechdocsPage } from '@backstage/plugin-techdocs';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { Root } from './components/Root';
import { GithubPlaygroundPage } from '@internal/plugin-github-playground';
import { GitlabPlaygroundPage } from '@internal/plugin-gitlab-playground';

const authProviders = [
  {
    id: 'github-auth-provider',
    title: 'GitHub',
    message: 'Login via Github',
    apiRef: githubAuthApiRef,
  },   
  {
    id: 'gitlab-auth-provider',
    title: 'Gitlab',
    message: 'Login via Gitlab',
    apiRef: gitlabAuthApiRef,
  }
]
const app = createApp({
  apis,
  plugins: Object.values(plugins),
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        auto
        providers={authProviders}
        align="center"
      />
    ),
  },
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();

const routes = (
  <FlatRoutes>
    <Navigate key="/" to="/catalog" />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechdocsPage />} />
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <Route path="/catalog-import" element={<CatalogImportPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/github-playground" element={<GithubPlaygroundPage />} />
    <Route path="/gitlab-playground" element={<GitlabPlaygroundPage />}/>
  </FlatRoutes>
);

const App = () => (
  <AppProvider>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </AppProvider>
);

export default App;
