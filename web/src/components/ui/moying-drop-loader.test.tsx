import { renderToStaticMarkup } from "react-dom/server";
import { ConfigProvider, Spin } from "antd";
import { describe, expect, it } from "vitest";

import { MoyingDropLoader } from "./moying-drop-loader";

describe("MoyingDropLoader", () => {
    it("renders the Moying drop and forwards the Ant Design indicator class", () => {
        const markup = renderToStaticMarkup(<MoyingDropLoader className="ant-spin-dot" />);

        expect(markup).toContain("ant-spin-dot");
        expect(markup).toContain("moying-loader-ink-");
        expect(markup).toContain("moying-loader-vermilion-");
        expect(markup).toContain('aria-hidden="true"');
    });

    it("replaces the Ant Design four-dot spinner", () => {
        const markup = renderToStaticMarkup(
            <ConfigProvider spin={{ indicator: <MoyingDropLoader /> }}>
                <Spin />
            </ConfigProvider>,
        );

        expect(markup).toContain("ant-spin-dot");
        expect(markup).toContain("moying-loader-ink-");
        expect(markup).not.toContain("ant-spin-dot-item");
    });
});
