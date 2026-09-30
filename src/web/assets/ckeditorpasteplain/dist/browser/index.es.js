import { Plugin as e } from "ckeditor5";
//#region src/utils.ts
var t = /htmlH\d+/, n = [
	"bold",
	"italic",
	"htmlI"
], r = (e) => {
	window.ALYX_DEBUG_LOGGING && (console.groupCollapsed(`DEBUG(cleanElement): Cleaning ${e.name ?? "unnamed node"}`), console.log("DEBUG(cleanElement):\n", e)), (e.name?.startsWith("heading") || e.name?.match(t)) && (e.name = "paragraph");
	for (let t of n) e.hasAttribute(t) && e._removeAttribute(t);
	if ("getChildren" in e) for (let t of e.getChildren()) r(t);
	else window.ALYX_DEBUG_LOGGING && console.warn("DEBUG(cleanElement): NODE HAS NO getChildren METHOD!");
	window.ALYX_DEBUG_LOGGING && console.groupEnd();
};
//#endregion
//#region src/index.ts
console.log("init!");
var i = class extends e {
	static get pluginName() {
		return "PastePlain";
	}
	init() {
		let e = this.editor;
		e.model.schema.addChildCheck((e, t) => {
			if (t.name === "softBreak" && Array.from(e.getNames()).includes("paragraph")) return !1;
		}), e.plugins.get("ClipboardPipeline").on("contentInsertion", (e, t) => {
			window.ALYX_DEBUG_LOGGING && console.group("DEBUG(contentInsertion): triggered with data:\n", t);
			for (let e of t.content.getChildren()) {
				let t = e;
				if (!t.name) return;
				r(t);
			}
			console.groupEnd();
		});
	}
};
//#endregion
export { i as PastePlain };
