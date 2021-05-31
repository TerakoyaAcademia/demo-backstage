import React from 'react';
import { useAsync } from 'react-use';
import Alert from '@material-ui/lab/Alert';
import {
  Table,
  TableColumn,
  Progress,
} from '@backstage/core';
import { graphql } from '@octokit/graphql';

const query = `{
  projects(membership: true) {
        nodes {
          name
          createdAt
          description
          forksCount
          fullPath
        }
      }
    }`;

type Node = {
  name: string;
  createdAt: string;
  description: string;
  forksCount: string;
  fullPath: string;
}

type Viewer = {
  projects: {
    nodes: Node[];
  }
}

type DenseTableProps = {
  viewer: Viewer;
};

export const DenseTable = ({ viewer }: DenseTableProps) => {
  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'Created', field: 'createdAt' },
    { title: 'Description', field: 'description' },
    { title: 'Fork Count', field: 'forksCount' },
    { title: 'Path', field: 'fullPath' },
  ];

  return (
    <Table
      title="List Of User's Repositories"
      options={{ search: false, paging: false }}
      columns={columns}
      data={viewer.projects.nodes}
    />
  );
};

export const ExampleFetchComponent = () => {
  const { value, loading, error } = useAsync(async (): Promise<any> => {
    const token = '${YOUR_PERSONAL_ACCESS_TOKEN}'
    const gqlEndpoint = graphql.defaults({
      baseUrl: 'https://gitlab.com/api',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const viewer  = await gqlEndpoint(query);
    return viewer;
  }, []);

  console.log("value", value);
  if (loading) return <Progress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (value && value.projects) return <DenseTable viewer={value} />;
  return (
    <Table
      title="List Of User's Repositories"
      options={{ search: false, paging: false }}
      columns={[]}
      data={[]}
    />
  );
};


