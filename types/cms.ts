export type Cms = {
  contents: {
    id: string;
    title: string;
  }[];
  totalCount: number;
  offset: number;
  limit: number;
};
