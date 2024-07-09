import z from "zod";

export const addProductSchema = z.object({
  productImage: z.string().url({ message: "productImageError" }).max(300),
  productName: z
    .string()
    .min(3, { message: "productNameMinError" })
    .max(50, { message: "productNameMaxError" }),
  productPrice: z
    .number()
    .min(1, { message: "productPriceError" })
    .max(100000000, { message: "productPriceError" }),
  productDetails: z.string().max(2000, { message: "productDetailsError" }),
  productDetailsJapanese: z
    .string()
    .max(2000, { message: "productDetailsError" }),
  productCategory: z.string().max(20, { message: "productCategoryError" }),
  slug: z
    .string()
    .min(3, { message: "minSlugError" })
    .max(50, { message: "maxSlugError" }),
  productBrand: z
    .string()
    .min(1, { message: "minBrandError" })
    .max(20, { message: "productBrandError" }),
  year: z
    .number()
    .min(2000, { message: "minYearError" })
    .max(20000, { message: "maxYearError" }),
  specifications: z
    .array(z.object({ name: z.string(), value: z.string() }))
    .optional(),
  currentStock: z
    .number()
    .min(1, { message: "minStockError" })
    .max(100000, { message: "maxStockError" }),
});

export type AddProductSchemaType = z.infer<typeof addProductSchema>;
export type AddProductErrors =
  | "productNameMinError"
  | "productNameMaxError"
  | "productPriceError"
  | "productDetailsError"
  | "productCategoryError"
  | "productBrandError"
  | "minYearError"
  | "maxYearError"
  | "minStockError"
  | "maxStockError"
  | "productImageError";
