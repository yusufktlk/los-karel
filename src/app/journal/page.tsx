import { Metadata } from "next";
import JournalClient from "@/components/JournalClient";

export const metadata: Metadata = {
  title: "Journal — LOS KAREL",
  description: "Read in-depth editorial articles on Anatolian craft, İznik tile artistry, and wearable symbolic heritage at LOS KAREL.",
};

export default function JournalPage() {
  return <JournalClient />;
}
