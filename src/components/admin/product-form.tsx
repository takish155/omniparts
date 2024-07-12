"use client";

import { UploadButton } from "@/lib/uploadthing";
import InputContainer from "../input-container";
import { useTranslations } from "next-intl";
import { UseHandleAddProductType } from "@/hooks/useHandleAddProduct";
import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import {
  AddProductErrors,
  AddProductSchemaType,
} from "@/app/schema/admin/addProductSchema";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categories } from "@/lib/filterData";
import { Textarea } from "../ui/textarea";
import RenderSpecifications from "./specifications/render-specifications";
import useHandleAddSpecification from "@/hooks/useHandleAddSpecification";

const ProductForm = ({
  data,
  hook,
  productId,
  isUpdate,
}: {
  data?: AddProductSchemaType | undefined;
  hook: UseHandleAddProductType;
  productId?: string;
  isUpdate?: boolean;
}) => {
  const t = useTranslations("AdminPage");
  const { handleSubmit, control, register, errors, isPending, onSubmit } =
    hook(productId);
  const {
    handleAddSpecification,
    handleRemoveSpecification,
    name,
    setName,
    setValue,
    value,
    specifications,
  } = useHandleAddSpecification(data?.specifications ?? []);
  const yearNow = new Date().getFullYear();

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          ...data,
          specifications,
        })
      )}
    >
      <InputContainer
        data={{
          label: t("productPicture"),
          error:
            errors.productImage?.message &&
            t(errors.productImage?.message as AddProductErrors),
          htmlFor: "productPicture",
          input: (
            <Controller
              control={control}
              defaultValue={data?.productImage}
              name="productImage"
              render={({ field: { onChange } }) => (
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    onChange(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}
            />
          ),
        }}
      />
      <InputContainer
        data={{
          error:
            errors.productName?.message &&
            t(errors.productName?.message as AddProductErrors),
          htmlFor: "productName",
          label: t("productName"),
          input: (
            <Input
              defaultValue={data?.productName}
              {...register("productName")}
            />
          ),
        }}
      />
      <InputContainer
        data={{
          error:
            errors.slug?.message && t(errors.slug?.message as AddProductErrors),
          htmlFor: "slug",
          label: t("slug"),
          input: <Input {...register("slug")} defaultValue={data?.slug} />,
        }}
      />
      <InputContainer
        data={{
          error:
            errors.productPrice?.message &&
            t(errors.productPrice?.message as AddProductErrors),
          htmlFor: "productPrice",
          label: t("productPrice"),
          input: (
            <Input
              {...register("productPrice", { valueAsNumber: true })}
              defaultValue={data?.productPrice ?? 0}
            />
          ),
        }}
      />
      <InputContainer
        data={{
          error:
            errors.productDetails?.message &&
            t(errors.productDetails?.message as AddProductErrors),
          htmlFor: "productDetails",
          label: t("productDetails"),
          input: (
            <Textarea
              {...register("productDetails")}
              defaultValue={data?.productDetails}
            />
          ),
        }}
      />
      <InputContainer
        data={{
          error:
            errors.productDetails?.message &&
            t(errors.productDetails?.message as AddProductErrors),
          htmlFor: "productDetailsJapanese",
          label: t("productDetailsJapanese"),
          input: (
            <Textarea
              {...register("productDetailsJapanese")}
              defaultValue={data?.productDetails}
            />
          ),
        }}
      />
      <InputContainer
        data={{
          error:
            errors.productCategory?.message &&
            t(errors.productCategory?.message as AddProductErrors),
          htmlFor: "productCategory",
          label: t("productCategory"),
          input: (
            <Controller
              control={control}
              name="productCategory"
              render={({ field: { onChange, value } }) => (
                <Select
                  defaultValue={data?.productCategory}
                  onValueChange={(value) => onChange(value)}
                >
                  <SelectTrigger className="w-[30%] min-w-[250px] max-w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => {
                      return (
                        <SelectItem value={category} key={category}>
                          {t(category as any)}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
          ),
        }}
      />
      <InputContainer
        data={{
          error:
            errors.productBrand?.message &&
            t(errors.productBrand?.message as AddProductErrors),
          htmlFor: "productBrand",
          label: t("productBrand"),
          input: (
            <Input
              {...register("productBrand")}
              defaultValue={data?.productBrand}
            />
          ),
        }}
      />
      <InputContainer
        data={{
          error:
            errors.year?.message && t(errors.year?.message as AddProductErrors),
          htmlFor: "year",
          label: t("year"),
          input: (
            <Input
              {...register("year", { valueAsNumber: true })}
              defaultValue={data?.year ?? yearNow}
            />
          ),
        }}
      />
      <InputContainer
        data={{
          error:
            errors.currentStock?.message &&
            t(errors.currentStock?.message as AddProductErrors),
          htmlFor: "currentStock",
          label: t("currentStock"),
          input: (
            <Input
              {...register("currentStock", { valueAsNumber: true })}
              defaultValue={data?.currentStock ?? 1}
            />
          ),
        }}
      />
      <InputContainer
        data={{
          error:
            errors.specifications?.message &&
            t(errors.specifications?.message as AddProductErrors),
          htmlFor: "specifications",
          label: t("specifications"),
          input: (
            <div className="ml-4 mt-4">
              <InputContainer
                data={{
                  label: t("specifactionName"),
                  htmlFor: "specifactionName",
                  error: "",
                  input: (
                    <Input
                      placeholder={t("specifactionNamePlaceholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ),
                }}
              />
              <InputContainer
                data={{
                  label: t("specificationValue"),
                  htmlFor: "specificationValue",
                  error: "",
                  input: (
                    <Input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  ),
                }}
              />
              <Button
                type="button"
                className="mb-8"
                onClick={() => handleAddSpecification()}
              >
                {t("addSpecification")}
              </Button>
              <RenderSpecifications
                data={specifications}
                handleRemoveSpecification={handleRemoveSpecification}
              />
            </div>
          ),
        }}
      />
      <Button disabled={isPending}>{isUpdate ? t("update") : t("add")}</Button>
    </form>
  );
};

export default ProductForm;
