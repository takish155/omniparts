"use client";

import { Input } from "../../ui/input";
import { useTranslations } from "next-intl";
import InputContainer from "../../input-container";
import { Button } from "../../ui/button";
import useHandleAddSpecification, {
  Specification,
} from "@/hooks/useHandleAddSpecification";
import RenderSpecifications from "./render-specifications";

const AddSpecification = ({
  defaultValue,
}: {
  defaultValue: Specification[];
}) => {
  const t = useTranslations("AdminPage");
  const {
    handleAddSpecification,
    name,
    setName,
    setValue,
    value,
    specifications,
    handleRemoveSpecification,
  } = useHandleAddSpecification([]);

  return (
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
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
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
  );
};

export default AddSpecification;
