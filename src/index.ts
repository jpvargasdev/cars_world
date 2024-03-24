import { GraphEditor } from "./editors/graph-editor";
import { World } from "./world";
import { Graph } from "./math/graph";
import { Viewport } from "./viewport";
import { scale } from "./math/utils";
import { StopEditor } from "./editors/stop-editor";
import { CrossEditor } from "./editors/cross-editor";
import { StartEditor } from "./editors/start-editor";

// Assuming canvas is defined in the HTML
const btnSave = document.getElementById("btn-save");
const btnDelete = document.getElementById("btn-dispose");
const btnGraph = document.getElementById("graphBtn");
const btnStop = document.getElementById("stopBtn");
const crossBtn = document.getElementById("crossBtn");
const startBtn = document.getElementById("startBtn");

if (btnSave) {
	btnSave.addEventListener("click", save);
}

if (btnDelete) {
	btnDelete.addEventListener("click", dispose);
}

if (btnGraph) {
	btnGraph.addEventListener("click", () => setMode("graph"));
}

if (btnStop) {
	btnStop.addEventListener("click", () => setMode("stop"));
}

if (crossBtn) {
	crossBtn.addEventListener("click", () => setMode("crossing"));
}

if (startBtn) {
	startBtn.addEventListener("click", () => setMode("start"));
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 800;

const ctx = canvas.getContext("2d");

if (!ctx) {
	throw new Error("Could not get 2d context");
}

const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null;

const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const world = new World(graph);

const viewport = new Viewport(canvas, ctx);
let oldGraphHash = graph.hash();

const tools = {
	graph: {
		button: btnGraph,
		editor: new GraphEditor(viewport, graph),
	},
	stop: {
		button: btnStop,
		editor: new StopEditor(viewport, world),
	},
	crossing: {
		button: crossBtn,
		editor: new CrossEditor(viewport, world),
	},
	start: {
		button: startBtn,
		editor: new StartEditor(viewport, world),
	}
} as const;

setMode("graph");

function animate() {
	viewport.reset();
	if (graph.hash() !== oldGraphHash) {
		world.generate();
		oldGraphHash = graph.hash();
	}

	if (!ctx) {
		throw new Error("Could not get 2d context");
	}

	const viewPoint = scale(viewport.getOffset(), -1);

	world.draw(ctx, viewPoint);
	ctx.globalAlpha = 0.3;

	for (const tool of Object.values(tools)) {
		tool.editor.display()
	}

	requestAnimationFrame(animate);
}

animate();

function dispose() {
	tools.graph.editor.dispose();
	world.markings.length = 0;
}

function save() {
	localStorage.setItem("graph", JSON.stringify(graph));
}

function setMode(mode: keyof typeof tools) {
	disableEditors();
  const {button, editor} = tools[mode]
	if (button && editor) {
		button.style.backgroundColor = "white";
		button.style.filter = "";
		editor.enable();
	}
}

function disableEditors() {
	for (const tool of Object.values(tools)) {
		if (tool.button && tool.editor) {
			tool.button.style.backgroundColor = "gray";
			tool.button.style.filter = "grayscale(0%)";
			tool.editor.disable()
		}
	}
}
