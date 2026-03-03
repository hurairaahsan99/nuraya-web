"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <h1 className="hero-title text-2xl text-[#151515] mb-4">My Profile</h1>
      {user && (
        <p className="text-[#4D4842] mb-6">Signed in as {user.email}</p>
      )}
      <Link
        href="/"
        className="text-sm font-medium underline"
        style={{ color: "#C14D1C" }}
      >
        Back to home
      </Link>
    </div>
  );
}
