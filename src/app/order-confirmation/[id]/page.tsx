import { Metadata } from "next";
import OrderConfirmationClient from "@/components/OrderConfirmationClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order #${id} Confirmed — LOS KAREL`,
    description: "Thank you for your order at LOS KAREL.",
  };
}

export default async function OrderConfirmationPage({ params }: PageProps) {
  const { id } = await params;
  return <OrderConfirmationClient orderId={id} />;
}
