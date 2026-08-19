import { describe, expect, it } from "vitest";

import { listMoyingDemoGallery } from "./demo-gallery";

describe("listMoyingDemoGallery", () => {
    it("returns the four branded demo works", () => {
        const result = listMoyingDemoGallery();
        expect(result.items).toHaveLength(4);
        expect(result.items.every((item) => item.slug.startsWith("demo-") && item.authorName === "墨影漫剧平台示例")).toBe(true);
    });

    it("supports category and keyword filters", () => {
        expect(listMoyingDemoGallery({ category: "插画" }).items).toHaveLength(2);
        expect(listMoyingDemoGallery({ keyword: "建筑" }).items.map((item) => item.slug)).toEqual(["demo-cloud-pavilion"]);
    });

    it("sorts popular works by view count", () => {
        const result = listMoyingDemoGallery({ sort: "popular" });
        expect(result.items.map((item) => item.viewCount)).toEqual([1268, 1086, 946, 875]);
    });
});
