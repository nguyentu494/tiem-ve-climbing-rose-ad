import { OrderDetailPage } from "src/components/detail-order/order-detail-page";

// Mock order data based on the provided structure
const mockOrderData = {
  orderId: "ORD-2025-001",
  orderDate: "2025-08-21T15:14:09.053Z",
  status: "PENDING",
  deliveryCost: 15.0,
  totalPaintingsPrice: 450.0,
  totalPrice: 465.0,
  shippingAddress: "123 Art Street, Creative District",
  note: "Please handle with care - fragile artwork",
  imagePayment: "/payment-receipt.png",
  paymentMethod: "Credit Card",
  receiverName: "John Smith",
  address: "123 Art Street",
  phone: "+1 (555) 123-4567",
  email: "john.smith@email.com",
  postalCode: "12345",
  contact: "john.smith@email.com",
  prefecture: "Tokyo",
  city: "Shibuya",
  town: "Harajuku",
  addressDetail: "Apartment 4B",
  discount: 25.0,
  orderItems: [
    {
      orderItemId: "ITEM-001",
      currentPrice: 250.0,
      quantity: 1,
      painting: {
        createdAt: "2025-08-20T10:00:00.000Z",
        updatedAt: "2025-08-21T12:00:00.000Z",
        paintingId: "PAINT-001",
        name: "Sunset Over Mountains",
        description:
          "A beautiful landscape painting capturing the golden hour over mountain peaks",
        imageUrl: "/sunset-mountain-landscape-painting.png",
        size: "24x36 inches",
        price: 250.0,
        quantity: 5,
        categories: [
          {
            createdAt: "2025-08-15T09:00:00.000Z",
            updatedAt: "2025-08-15T09:00:00.000Z",
            categoryId: "CAT-001",
            categoryCode: "LANDSCAPE",
            name: "Landscape",
            description: "Beautiful landscape paintings",
            imageUrl: "/vast-mountain-range.png",
            active: true,
          },
        ],
        active: true,
      },
    },
    {
      orderItemId: "ITEM-002",
      currentPrice: 200.0,
      quantity: 1,
      painting: {
        createdAt: "2025-08-19T14:30:00.000Z",
        updatedAt: "2025-08-21T11:15:00.000Z",
        paintingId: "PAINT-002",
        name: "Abstract Dreams",
        description:
          "A vibrant abstract piece with flowing colors and dynamic composition",
        imageUrl: "/abstract-colorful-art.png",
        size: "20x30 inches",
        price: 200.0,
        quantity: 3,
        categories: [
          {
            createdAt: "2025-08-15T09:00:00.000Z",
            updatedAt: "2025-08-15T09:00:00.000Z",
            categoryId: "CAT-002",
            categoryCode: "ABSTRACT",
            name: "Abstract",
            description: "Modern abstract artwork",
            imageUrl: "/abstract-art.png",
            active: true,
          },
        ],
        active: true,
      },
    },
  ],
};

export default function DetailOrder({ params }: { params: Promise<{ orderId: string }> }) {
  return (
    <div className="min-h-screen bg-background">
      <OrderDetailPage orderData={mockOrderData} />
    </div>
  );
}
