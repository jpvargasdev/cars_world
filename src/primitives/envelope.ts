import { Polygon } from "./polygon";
import { Point } from "./point";
import { Segment } from "./segment";

import { angle, substract, translate } from "../math/utils";

export class Envelope {
	private skeleton: Segment;
	public poly: Polygon;

	constructor(skeleton: Segment, width: number, roundness: number = 1) {
		this.skeleton = skeleton;
		this.poly = this.generatePolygon(width, roundness);
	}

	private generatePolygon(width: number, roundness: number): Polygon {
		const { p1, p2 } = this.skeleton;
		const radius = width / 2;
		const alpha = angle(substract(p1, p2));

		const alpha_cw = alpha + Math.PI / 2;
		const alpha_ccw = alpha - Math.PI / 2;

		const points: Point[] = [];

		const step = Math.PI / roundness;
		const epsilon = step / 2;
		for (let i = alpha_ccw; i <= alpha_cw + epsilon; i += step) {
			points.push(translate(p1, i, radius));
		}
		for (let i = alpha_ccw; i <= alpha_cw + epsilon; i += step) {
			points.push(translate(p2, Math.PI + i, radius));
		}

		return new Polygon(points);
	}

	draw(ctx: CanvasRenderingContext2D, options: DrawOptions): void {
		this.poly.draw(ctx, options);
	}
}
