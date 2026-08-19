"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export function SiteLogo({ logoUrl, className }: { logoUrl: string; className?: string }) {
    const customLogoUrl = logoUrl.trim() || "/logo.svg";
    const [failedLogoUrl, setFailedLogoUrl] = useState("");

    if (customLogoUrl && failedLogoUrl !== customLogoUrl) {
        return <img data-testid="site-logo" src={customLogoUrl} alt="" className={cn("shrink-0 object-contain", className)} referrerPolicy="no-referrer" onError={() => setFailedLogoUrl(customLogoUrl)} />;
    }

    return (
        <span data-testid="site-logo" aria-hidden="true" className={cn("inline-flex shrink-0 items-center justify-center rounded-[28%] bg-[#1b1d20] text-[0.52em] font-black text-[#f5f1e9] dark:bg-[#efede7] dark:text-[#17191d]", className)}>
            墨
        </span>
    );
}
