import type { CSSProperties } from "react";
import { useId } from "react";

import styles from "./moying-drop-loader.module.css";

export function MoyingDropLoader({ className, style }: { className?: string; style?: CSSProperties; percent?: number | "auto" }) {
    const id = useId().replace(/:/g, "");
    const inkClipId = `moying-loader-ink-${id}`;
    const vermilionClipId = `moying-loader-vermilion-${id}`;

    return (
        <span className={[styles.loader, className].filter(Boolean).join(" ")} style={style} aria-hidden="true">
            <svg className={styles.mark} viewBox="0 0 128 128" focusable="false">
                <defs>
                    <clipPath id={inkClipId}>
                        <path fillRule="evenodd" d="M64 9C54 27 31 49 31 75c0 22 14 39 33 39s33-17 33-39C97 49 74 27 64 9Zm-17 63c7-18 21-31 40-38-12 12-18 24-18 37 0 12-6 22-18 29 5-10 4-20-4-28Z" />
                    </clipPath>
                    <clipPath id={vermilionClipId}>
                        <path d="M73 80c9-3 17-9 23-18 1 15-4 29-16 39-1-8-3-15-7-21Z" />
                    </clipPath>
                </defs>

                <path className={styles.outline} fillRule="evenodd" d="M64 9C54 27 31 49 31 75c0 22 14 39 33 39s33-17 33-39C97 49 74 27 64 9Zm-17 63c7-18 21-31 40-38-12 12-18 24-18 37 0 12-6 22-18 29 5-10 4-20-4-28Z" />
                <g clipPath={`url(#${inkClipId})`}>
                    <rect className={`${styles.fill} ${styles.inkFill}`} x="24" y="7" width="80" height="109" />
                </g>
                <g clipPath={`url(#${vermilionClipId})`}>
                    <rect className={`${styles.fill} ${styles.vermilionFill}`} x="70" y="58" width="30" height="48" />
                </g>
            </svg>
        </span>
    );
}
