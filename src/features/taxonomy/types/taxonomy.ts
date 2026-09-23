export type Category = {
  _id: string;
  title: string;
  slug: string;
  displayOrder: number;
};

export type Tag = {
  _id: string;
  title: string;
  slug: string;
  category: Category;
};
