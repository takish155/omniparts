"use server";

import React from "react";
import { signOut } from "./auth";

const signOutAction = async () => {
  await signOut();
};

export default signOutAction;
