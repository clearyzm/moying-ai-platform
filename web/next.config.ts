import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { ProxyAgent, setGlobalDispatcher } from "undici";
import { parseChangelog } from "@/lib/release";

const webDir = dirname(fileURLToPath(import.meta.url));
const packageMetadata = JSON.parse(readFileSync(resolve(webDir, "package.json"), "utf8")) as { version?: string };
const versionPath = resolve(webDir, "../VERSION");
const changelogPath = resolve(webDir, "../CHANGELOG.md");
const localVersion = (existsSync(versionPath) ? readFileSync(versionPath, "utf8").trim() : `v${packageMetadata.version || "dev"}`) || "dev";
const localChangelog = existsSync(changelogPath) ? readFileSync(changelogPath, "utf8") : `# ${localVersion}\n\n- 墨影AI漫剧创作平台展示版本。`;
const configuredBuildCpus = Number.parseInt(process.env.NEXT_BUILD_CPUS || "", 10);
const distDir = process.env.NEXT_DIST_DIR?.trim() || ".next";
const skipBuildTypeCheck = process.env.NEXT_SKIP_BUILD_TYPECHECK === "1";
const nodeProxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.https_proxy || process.env.http_proxy;
const privatePageSource = "/:section(api|admin|assets|billing|canvas|community|create|drama|forgot-password|help|image|install|login|my-prompts|profile|prompts|register|video|works)/:path*";
if (nodeProxy) setGlobalDispatcher(new ProxyAgent(nodeProxy));

export default function nextConfig(phase: string): NextConfig {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const isProduction = process.env.NODE_ENV === "production";
    const releases = parseChangelog(localChangelog);
    return {
        distDir,
        output: "standalone",
        outputFileTracingRoot: webDir,
        turbopack: { root: webDir },
        typescript: { ignoreBuildErrors: skipBuildTypeCheck },
        allowedDevOrigins: isDev ? ["*.*.*.*"] : [],
        env: {
            NEXT_PUBLIC_APP_VERSION: localVersion,
            NEXT_PUBLIC_APP_RELEASES: JSON.stringify(releases),
        },
        experimental: {
            ...(Number.isSafeInteger(configuredBuildCpus) && configuredBuildCpus > 0 ? { cpus: configuredBuildCpus } : {}),
            proxyClientMaxBodySize: "32mb",
        },
        async rewrites() {
            return {
                beforeFiles: [{ source: "/favicon.ico", destination: "/api/site-icon" }],
                afterFiles: [],
                fallback: [],
            };
        },
        async headers() {
            return [
                {
                    source: "/(.*)",
                    headers: [
                        { key: "X-Content-Type-Options", value: "nosniff" },
                        { key: "X-Frame-Options", value: "DENY" },
                        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
                        ...(isProduction ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }] : []),
                    ],
                },
                {
                    source: privatePageSource,
                    headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" }],
                },
            ];
        },
    };
}
