"use client";
// Todo: fix this
import React from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { HandleRemoveSpecification } from "@/hooks/useHandleAddSpecification";

const SpecificationCard = ({
  specification,
  handleRemoveSpecification,
}: {
  specification: {
    name: string;
    value: string;
  };
  handleRemoveSpecification: HandleRemoveSpecification;
}) => {
  return (
    <Card>
      <div className="p-2">
        {specification.name}: {specification.value}{" "}
        <Button
          className="text-red-500 font-bold"
          onClick={() =>
            handleRemoveSpecification(specification.name, specification.value)
          }
          variant={"link"}
        >
          X
        </Button>
      </div>
    </Card>
  );
};

export default SpecificationCard;
