import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { identityApiRef, useApi, } from '@backstage/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core';
import { ExampleFetchComponent } from '../ExampleFetchComponent';

export const ExampleComponent = () => {
  // our API hook
  const identityApi = useApi(identityApiRef);

  // data to use
  const userId = identityApi.getUserId();
  const profile = identityApi.getProfile();
  return (
    <Page themeId="tool">
      <Header title="Welcome to gitlab-playground!" subtitle="Optional subtitle">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Plugin title">
          <SupportButton>A description of your plugin goes here.</SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title={userId}>
              <Typography variant="body1">
              {`${profile.displayName} | ${profile.email}`}
            </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <ExampleFetchComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  )
};
