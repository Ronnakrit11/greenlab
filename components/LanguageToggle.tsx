"use client";

import * as React from "react";
import { useLanguageStore } from "@/store/languageStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'th', label: 'ไทย' },
    { code: 'ru', label: 'Русский' }
  ];

  const getCurrentLanguageLabel = () => {
    return languages.find(lang => lang.code === currentLanguage)?.label || 'English';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'en' | 'th' | 'ru')}
            className={currentLanguage === lang.code ? "bg-accent" : ""}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}