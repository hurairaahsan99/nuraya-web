"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNav() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signup" || pathname === "/verify")
    return null;
  return <Navbar />;
}
