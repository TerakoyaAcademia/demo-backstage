import React from 'react';
import { useAsync } from 'react-use';
import Alert from '@material-ui/lab/Alert';
import {
  Table,
  TableColumn,
  Progress,
  gitlabAuthApiRef,
  useApi,
} from '@backstage/core';
import { graphql } from '@octokit/graphql';

const query = `{
  projects(membership: true) {
    nodes {
      name
      description
      lastActivityAt
      repository{
        tree(ref: "master"){
          lastCommit{
            authorName
            authoredDate
          }
        }
        blobs(paths: "README.md") {
        nodes{
          rawTextBlob
        }
      }
      }
    }
  }
}`;

type Node = {
  name: string;
  description: string;
  lastActivityAt: string;
  repository: Repository;
}

type Repository={
  tree: Tree;
  blobs: RepositoryBlob;
}

type Tree={
  lastCommit: Lastcommit;
}

type RepositoryBlob={
  nodes: BlobNode[];
}

type BlobNode={
  rawTextBlob: string;
}

type Lastcommit={
  authorName: string;
  authoredDate: string;
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
  // console.log(viewer)
  // console.log(viewer.projects.nodes[0].repository.blobs.nodes[0].rawTextBlob)
  // console.log(viewer.projects.nodes[0].repository.tree.lastCommit.authorName)
  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Last Activity', field: 'lastActivityAt' },
    { title: 'Latest Committed By', field: `repository.tree.lastCommit.authorName` },
    { title: 'Latest Committed Date', field: `repository.tree.lastCommit.authoredDate` },
    { title: 'Read Me', field: `repository.blobs.nodes[0].rawTextBlob` },
  ];

  return (
    <Table
      title="List Of User's Repositories"
      options={{ search: true, paging: true }}
      columns={columns}
      data={viewer.projects.nodes}
    />
  );
};

export const ExampleFetchComponent = () => {
  const auth = useApi(gitlabAuthApiRef);
  const { value, loading, error } = useAsync(async (): Promise<any> => {
    const token = await auth.getAccessToken();
    const gqlEndpoint = graphql.defaults({
      baseUrl: 'https://gitlab.com/api',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const viewer  = await gqlEndpoint(query);
    return viewer;
  }, []);

  // console.log("value", value);
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


