import styles from "./ai-ink-orb.module.css";

export function AiInkOrb({ label = "AI 正在思考", compact = false }: { label?: string; compact?: boolean }) {
    return (
        <span className={compact ? `${styles.orb} ${styles.compact}` : styles.orb} role="img" aria-label={label}>
            <span className={styles.core} aria-hidden="true" />
            <span className={styles.ring} aria-hidden="true">
                <span />
                <span />
                <span />
            </span>
        </span>
    );
}
