// deno-lint-ignore-file no-explicit-any
import type { WindowGPU } from "@gfx/dwm/ext/webgpu";

const defaultStyle: any = {
	width: "",
	height: "",
	touchAction: "",
};

export class DenoCanvas {
	"data-enigine" = "three.js r182dev webgpu";

	_width: number;
	_height: number;
	_windowGPU: WindowGPU;
	_style = defaultStyle;

	constructor(window: WindowGPU) {
		this._windowGPU = window;

		this._width = window.window.size.width;
		this._height = window.window.size.height;
	}

	setAttribute(_qualifiedName: string, _value: string) {}

	get clientWidth() {
		return this._width;
	}

	get clientHeight() {
		return this._height;
	}

	get width() {
		return this._width;
	}

	set width(width: number) {
		this._width = width;
	}

	get height() {
		return this._height;
	}

	set height(height: number) {
		this._height = height;
	}

	get style() {
		return this._style;
	}

	set style(str: string) {
		console.log(str);
		this._style = str;
	}

	removeEventListener(...args: any[]) {
		(removeEventListener as any)(...args);
	}

	getRootNode() {
		return this;
	}

	addEventListener(...args: any[]) {
		(addEventListener as any)(...args);
	}

	setPointerCapture() {}
	releasePointerCapture() {}
}
