import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import "html5-qrcode";
const QRCodeScanner_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-up2wiv{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px}reader.svelte-up2wiv{width:100%;min-height:500px;background-color:black}",
  map: null
};
const QRCodeScanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="svelte-up2wiv"><reader id="reader" class="svelte-up2wiv"></reader> ${`<button data-svelte-h="svelte-15bye9q">start</button>`}</main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(QRCodeScanner, "QrCodeScanner").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
