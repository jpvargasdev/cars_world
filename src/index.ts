import { GraphEditor } from "./graph-editor";
import { World } from "./world";
import { Graph } from "./math/graph";
import { Viewport } from "./viewport";
import { scale } from "./math/utils";

// Assuming canvas is defined in the HTML
const btnSave = document.getElementById("btn-save");
const btnDelete = document.getElementById("btn-dispose");
const btnGraph = document.getElementById("graphBtn");
const btnStop = document.getElementById("stopBtn");

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

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 600;
canvas.height = 600;

const ctx = canvas.getContext("2d");

if (!ctx) {
	throw new Error("Could not get 2d context");
}

const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null;

const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const world = new World(graph);

const viewport = new Viewport(canvas, ctx);
const graphEditor = new GraphEditor(viewport, graph);

let oldGraphHash = graph.hash();

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
	graphEditor.display();
	requestAnimationFrame(animate);
}

animate();

function dispose() {
	graphEditor.dispose();
}

function save() {
	localStorage.setItem("graph", JSON.stringify(graph));
}

function setMode(mode: string) {
	if (btnGraph && btnStop) {
		disableEditors();
		switch (mode) {
			case "graph":
				btnGraph.style.backgroundColor = "white";
				btnGraph.style.filter = "";
				break;
			case "stop":
				btnStop.style.backgroundColor = "white";
				btnStop.style.filter = "";
				break;
		}
	}
}

function disableEditors() {
	if (btnGraph && btnStop) {
		btnGraph.style.backgroundColor = "white";
		btnGraph.style.filter = "grayscale(0%)";
		btnStop.style.backgroundColor = "white";
		btnStop.style.filter = "grayscale(0%)";
	}
}
