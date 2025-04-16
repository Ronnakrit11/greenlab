"use client";

import React from "react";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ListOrdered } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-background">
      <Container className="flex items-center justify-between gap-7 text-foreground">
        <HeaderMenu categories={[]} />
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <MobileMenu />
          <Logo />
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <ThemeToggle />
          <LanguageToggle />

          <ClerkLoaded>
            <SignedIn>
              <Link href={"/orders"} className="group relative">
                <ListOrdered className="w-5 h-5 group-hover:text-foreground hoverEffect" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                  0
                </span>
              </Link>
              <UserButton />
            </SignedIn>
            {!true && (
              <SignInButton mode="modal">
                <button className="text-sm font-semibold hover:text-foreground hoverEffect">
                  {t('common.login')}
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;