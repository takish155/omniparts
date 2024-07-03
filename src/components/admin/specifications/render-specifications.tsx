"use client";

import React from "react";
import SpecificationCard from "./specification-card";
import {
  HandleRemoveSpecification,
  Specification,
} from "@/hooks/useHandleAddSpecification";

const RenderSpecifications = ({
  data,
  handleRemoveSpecification,
}: {
  data: Specification[];
  handleRemoveSpecification: HandleRemoveSpecification;
}) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {data.map((specification, index) => (
        <SpecificationCard
          handleRemoveSpecification={handleRemoveSpecification}
          specification={specification}
          key={specification.name + index}
        />
      ))}
    </div>
  );
};

export default RenderSpecifications;
