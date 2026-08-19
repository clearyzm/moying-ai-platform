"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

import styles from "./home.module.css";

type HomeScrollRevealProps = Omit<HTMLMotionProps<"section">, "initial" | "transition" | "viewport" | "whileInView"> & {
    delay?: number;
    distance?: number;
};

export function HomeScrollReveal({ children, className, delay = 0, distance = 28, ...props }: HomeScrollRevealProps) {
    return (
        <motion.section
            {...props}
            className={[styles.scrollReveal, className].filter(Boolean).join(" ")}
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.section>
    );
}
