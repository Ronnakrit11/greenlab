"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Logo = ({ className }: Props) => {
  const { theme } = useTheme();

  return (
    <Link href={"/"}>
      <Image 
        src={theme === "dark" ? "/logo1.png" : "/logo.png"}
        alt=" CNC Logo"
        width={1000}
        height={1000}
        className={cn("w-auto h-12 object-contain", className)}
        priority
      />
    </Link>
  );
};

export default Logo;