declare type Node = {
    name: string;
    createdAt: string;
    description: string;
    diskUsage: number;
    isFork: boolean;
};
declare type Viewer = {
    repositories: {
        totalCount: number;
        nodes: Node[];
        pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
        };
    };
};
declare type DenseTableProps = {
    viewer: Viewer;
};
export declare const DenseTable: ({ viewer }: DenseTableProps) => JSX.Element;
export declare const ExampleFetchComponent: () => JSX.Element;
export {};
