import type { PublicGalleryItem } from "@/services/api/work-governance";

export const MOYING_DEMO_GALLERY_ITEMS: PublicGalleryItem[] = [
    demoWork("misty-voyage", "示例 · 雾岭行舟", "水墨群山与晨雾中的一叶孤舟。", "插画", ["水墨", "山水", "东方美学"], 1268, 184, 0),
    demoWork("plum-shadow", "示例 · 梅影入画", "梅枝、衣袂与纸上烟岚交叠的东方人物创作。", "视觉设计", ["人物", "国风", "编辑视觉"], 1086, 156, 1),
    demoWork("cloud-pavilion", "示例 · 云上栖居", "传统飞檐与未来材料融合的云端建筑概念。", "视觉设计", ["建筑", "概念设计", "未来东方"], 946, 131, 2),
    demoWork("crane-lotus", "示例 · 鹤步墨荷", "工笔细节与写意墨色结合的花鸟作品。", "插画", ["花鸟", "仙鹤", "工笔"], 875, 119, 3),
];

export function listMoyingDemoGallery(input: { limit?: number; sort?: unknown; category?: unknown; tag?: unknown; keyword?: unknown; featured?: unknown } = {}) {
    const category = text(input.category).toLowerCase();
    const tag = text(input.tag).toLowerCase();
    const keyword = text(input.keyword).toLowerCase();
    const featuredOnly = input.featured === true || input.featured === "true" || input.featured === "1";
    let items = MOYING_DEMO_GALLERY_ITEMS.filter((item) => {
        if (category && item.category.toLowerCase() !== category) return false;
        if (tag && !item.tags.some((value) => value.toLowerCase().includes(tag))) return false;
        if (keyword && ![item.title, item.description, item.publicPrompt, ...item.tags].some((value) => value.toLowerCase().includes(keyword))) return false;
        return !featuredOnly || item.isFeatured;
    });
    if (input.sort === "latest") items = [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    if (input.sort === "popular") items = [...items].sort((a, b) => b.viewCount - a.viewCount);
    const limit = Math.max(1, Math.min(48, Math.floor(Number(input.limit) || 12)));
    return { items: items.slice(0, limit), nextCursor: undefined };
}

export function moyingDemoGalleryEnabled() {
    return process.env.VERCEL === "1" && process.env.MOYING_ENABLE_DEMO_GALLERY !== "0";
}

function demoWork(id: string, title: string, description: string, category: string, tags: string[], viewCount: number, likeCount: number, index: number): PublicGalleryItem {
    return {
        slug: `demo-${id}`,
        sourceType: "media",
        viewCount,
        likeCount,
        isFeatured: true,
        publishedAt: `2026-08-${18 - index}T08:00:00.000Z`,
        title,
        description,
        publicPrompt: "墨影AI漫剧创作平台原创视觉示例",
        category,
        tags,
        authorName: "墨影漫剧平台示例",
        preview: { id: `preview-${id}`, mediaType: "image", mimeType: "image/webp", url: `/demo-works/${id}.webp` },
    };
}

function text(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
}
