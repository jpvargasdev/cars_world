import { Target } from "../markings/target";
import { Point } from "../primitives/point";
import { Viewport } from "../viewport";
import { World } from "../world";
import { MarkingEditor } from "./marking-editor";

export class TargetEditor extends MarkingEditor {
	constructor(viewport: Viewport, world: World) {
		super(viewport, world, world.laneGuides);
	}

	createMarking(center: Point, directionVector: Point) {
		return new Target(
			center,
			directionVector,
			this.world.roadWidth / 2,
			this.world.roadWidth / 2,
		);
	}
}
