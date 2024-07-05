"use server";

import { createOrderSchema } from "@/types/create-order-schema";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { orderProduct, orders } from "../schema";

const action = createSafeActionClient();

export const createOrder = action(
  createOrderSchema,
  async ({ products, status, total, paymentIntentID }) => {
    try {
      const session = await auth();
      if (!session) {
        return { error: "User not found, please sign in" };
      }
      const order = await db
        .insert(orders)
        .values({ status, total, userID: session.user.id, paymentIntentID })
        .returning();

      const orderProducts = products.map(
        async ({ productID, quantity, variantID }) => {
          const newOrderProduct = await db.insert(orderProduct).values({
            quantity,
            orderID: order[0].id,
            productID: productID,
            productVariantID: variantID,
          });
        }
      );

      return { success: "Order has been created" };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  }
);
