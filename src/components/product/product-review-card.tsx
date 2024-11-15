"use client";

import React from "react";
import ReactStars from "react-stars";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ProductReviewCard = ({
  userMessage,
  userRated,
  username,
}: {
  username: string;
  userRated: number;
  userMessage: string;
}) => {
  return (
    <Card className="mx-auto mb-6">
      <CardHeader>
        <CardTitle className="text-base">{username}</CardTitle>
        <CardDescription>
          <ReactStars
            className="my-0"
            size={20}
            value={userRated}
            edit={false}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mt-2">{userMessage}</p>
      </CardContent>
    </Card>
  );
};

export default ProductReviewCard;
