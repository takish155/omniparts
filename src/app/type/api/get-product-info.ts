import { ProductCategory } from "@/components/product/load-product-recommendation";

export type Specification =
  | {
      specification: string;
      value: string;
    }[]
  | null;

export interface ProductInfoProps {
  productName: string;
  productPrice: number;
  productDetails: string;
  productBrand: string;
  productCategory: ProductCategory;
  productImage: string;
  productId: string;
  quantity: number;
  year: number;
  specification: Specification;
  productDetailsJapanese: string | null;
}

export type API_Product =
  | {
      status: 200;
      data: ProductInfoProps;
    }
  | {
      status: 404;
      message: string;
    }
  | {
      status: 500;
      message: string;
    };
