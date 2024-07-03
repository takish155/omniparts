"use server";

import { UpdateOrderStatusFormProps } from "@/app/type/api/admin/admin-order-table-type";
import isAdmin from "./isAdmin";
import prisma from "@/app/api/db";
import { ServerMessage } from "@/hooks/useHandleUpdateOrder";
import { getTranslations } from "next-intl/server";

const updateOrderAction = async (
  data: UpdateOrderStatusFormProps
): Promise<ServerMessage> => {
  const t = await getTranslations("AdminOrderPage");

  try {
    const admin = await isAdmin();
    if (!admin) throw new Error("IS_NOT_ADMIN");

    const orderExist = await prisma.order.findUnique({
      where: {
        id: data.orderId,
      },
    });
    if (!orderExist) {
      return {
        status: 404,
        message: t("orderNotFound"),
      };
    }

    await prisma.order.update({
      where: {
        id: data.orderId,
      },
      data: {
        status: data.orderStatus,
        estimatedDeliveryTime: data.expectedDeliveryDate,
      },
    });

    return {
      status: 200,
      message: t("orderUpdated"),
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "IS_NOT_ADMIN") {
        return {
          status: 403,
          message: t("forbidden"),
        };
      }
    }
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};

export default updateOrderAction;
