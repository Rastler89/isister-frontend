"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function MatomoTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window._paq !== "undefined") {
      window._paq.push(["setCustomUrl", pathname + "?" + searchParams.toString()])
      window._paq.push(["setDocumentTitle", document.title])
      window._paq.push(["trackPageView"])
    }
  }, [pathname, searchParams])

  return null
}
