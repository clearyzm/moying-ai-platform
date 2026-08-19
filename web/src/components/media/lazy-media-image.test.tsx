import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LazyMediaImage } from "./lazy-media-image";

describe("LazyMediaImage", () => {
    it("uses the animated Moying drop while media is loading", () => {
        const markup = renderToStaticMarkup(<LazyMediaImage src="/example.jpg" alt="示例作品" />);

        expect(markup).toContain("moying-loader-ink-");
        expect(markup).toContain("moying-loader-vermilion-");
        expect(markup).not.toContain('data-testid="site-logo"');
    });
});
