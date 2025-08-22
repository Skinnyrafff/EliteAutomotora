// src/app/page.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Hero from "@/components/Hero";
import FeaturedVehicles from "@/components/FeaturedVehicles";

export default function Landing() {
  return (
    <>
      <Hero />
      <FeaturedVehicles />
    </>
  );
}