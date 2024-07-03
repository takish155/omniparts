export type ProductResponse = {
  productName: string;
  productImage: string;
  productPrice: number;
  slug: string | null;
};

export type RecommendedResponse =
  | {
      status: 200;
      data: ProductResponse[];
    }
  | {
      status: 500;
      message: string;
    };
