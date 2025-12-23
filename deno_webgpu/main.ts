import { createWindowGPU, mainloop } from "@gfx/dwm/ext/webgpu";
import { DenoCanvas } from "./src/canvas.ts";
import { WebGPURenderer } from "three/webgpu";
import {
	Scene,
	AmbientLight,
	Mesh,
	PerspectiveCamera,
	BoxGeometry,
	MeshPhongMaterial,
	PointLight,
	Color,
} from "three";
import { OrbitControls } from "three/addons";

// deno-lint-ignore no-explicit-any
(globalThis as any).VideoFrame = class DummyVideoFrame {};

(async () => {
	try {
		const window = await createWindowGPU({
			title: "Deno Window Manager",
			width: 1000,
			height: 700,
			resizable: true,
		});

		const context = window.getContext("webgpu");

		// deno-lint-ignore no-explicit-any
		(window.device as any).lost = {
			then: () => {},
		};

		// const canvas = createLoggingProxy(new DenoCanvas(window), "DenoCanvas");
		const canvas = new DenoCanvas(window);

		const renderer = new WebGPURenderer({
			canvas: canvas as unknown as HTMLCanvasElement,
			antialias: true,
			forceWebGL: false,
			device: window.device,
			context,
			alpha: false,
		});
		await renderer.init();
		renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
		renderer.setPixelRatio(1);

		const scene = new Scene();
		scene.background = new Color(0x1a1a2e);

		const camera = new PerspectiveCamera(
			75,
			canvas.clientWidth / canvas.clientHeight,
			0.1,
			1000,
		);
		camera.position.z = 5;

		const controls = new OrbitControls(camera, renderer.domElement);

		const geometry = new BoxGeometry(2, 2, 2);
		const material = new MeshPhongMaterial({
			color: 0x00d4ff,
			shininess: 100,
		});
		const cube = new Mesh(geometry, material);
		scene.add(cube);

		// Add lighting
		const ambientLight = new AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		const pointLight = new PointLight(0xffffff, 1);
		pointLight.position.set(5, 5, 5);
		scene.add(pointLight);

		await mainloop(() => {
			controls.update();
			renderer.render(scene, camera);
			window.surface.present();
		}, false);
	} catch (error) {
		console.error(error);
	}
})();
