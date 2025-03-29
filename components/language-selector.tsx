"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSelector() {
  const [language, setLanguage] = useState("English")

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    // In a real app, this would update the app's language context
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("English")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("Hindi")}>हिन्दी (Hindi)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("Tamil")}>தமிழ் (Tamil)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("Bengali")}>বাংলা (Bengali)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

