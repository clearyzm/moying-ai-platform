import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AiInkOrb } from "./ai-ink-orb";

describe("AiInkOrb", () => {
    it("renders the Moying logo as an accessible loading status", () => {
        const markup = renderToStaticMarkup(<AiInkOrb label="正在生成作品" compact />);

        expect(markup).toContain('role="status"');
        expect(markup).toContain('aria-label="正在生成作品"');
        expect(markup).toContain("moying-ink-");
        expect(markup).toContain("moying-vermilion-");
    });
});
