"use client";

import { useTestScore } from "@/context/test";
import React from "react";

const Test = () => {
  const { count, increment } = useTestScore();
  return (
    <div>
      <button onClick={() => increment()}>Count: {count}</button>
    </div>
  );
};

export default Test;
