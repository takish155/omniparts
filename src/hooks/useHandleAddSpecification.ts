import { useState } from "react";

export interface Specification {
  name: string;
  value: string;
}

const useHandleAddSpecification = (data: Specification[]) => {
  const [specifications, setSpecifications] = useState<Specification[]>(data);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleAddSpecification = () => {
    setSpecifications((specification) => {
      return [...specification, { id: Date.now().toString(), name, value }];
    });
    setName("");
    setValue("");
  };
  const handleRemoveSpecification = (name: string, value: string) => {
    setSpecifications((specification) => {
      return specification.filter(
        (specification) =>
          specification.name !== name && specification.value !== value
      );
    });
  };

  return {
    name,
    value,
    setName,
    setValue,
    handleAddSpecification,
    specifications,
    handleRemoveSpecification,
  };
};

export type HandleRemoveSpecification = (name: string, value: string) => void;
export default useHandleAddSpecification;
