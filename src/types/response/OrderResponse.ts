import z from "zod";
import { AddPaintingsResponseSchema } from "./AddPaintingsResponse";

export const OrderItemSchema = z.object({
  orderItemId: z.string(),
  currentPrice: z.number(),
  quantity: z.number(),
  painting: AddPaintingsResponseSchema,
});

export const OrderSchema = z.object({
  orderId: z.string(),
  orderDate: z.string(),
  status: z.string(),
  deliveryCost: z.number(),
  totalPaintingsPrice: z.number(),
  totalPrice: z.number(),
  shippingAddress: z.string().nullable(),
  note: z.string(),
  imagePayment: z.string().nullable(),
  paymentMethod: z.string(),
  receiverName: z.string(),
  phone: z.string(),
  email: z.string(),
  postalCode: z.string(),
  contact: z.string(),
  discount: z.number(),
  prefecture: z.string(),
  city: z.string(),
  town: z.string(),
  addressDetail: z.string(),
  orderItems: z.array(OrderItemSchema),
});

export const OrderResponseSchema = z.object({
  items: z.array(OrderSchema),
  page: z.number().int().nonnegative(),
  size: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  totalItems: z.number().int().nonnegative(),
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderResponse = z.infer<typeof OrderResponseSchema>;