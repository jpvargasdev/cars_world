import { add } from "../math/utils";
import { Point } from "../primitives/point";
import { Segment } from "../primitives/segment";

export class Tree {
    public center: Point;
    public size: number;

    constructor(center: Point, size: number) {
        this.center = center;
        this.size = size;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.center) return;
        this.center.draw(ctx, { size: this.size, color: 'green' });

        const top = add(this.center, { x: -40, y: - 40 });
        new Segment(this.center, top).draw(ctx)
    }
}