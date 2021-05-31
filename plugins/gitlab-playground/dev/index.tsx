import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { gitlabPlaygroundPlugin, GitlabPlaygroundPage } from '../src/plugin';

createDevApp()
  .registerPlugin(gitlabPlaygroundPlugin)
  .addPage({
    element: <GitlabPlaygroundPage />,
    title: 'Root Page',
  })
  .render();
