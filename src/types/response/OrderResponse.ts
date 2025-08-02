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

export type OrderResponse = z.infer<typeof OrderSchema>;
