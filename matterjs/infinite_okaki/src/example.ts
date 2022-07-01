import Matter from "matter-js";
import texture from "./images/okaki.png";

export const example = () => {

	// module aliases
	const Engine = Matter.Engine,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Bodies = Matter.Bodies,
		Composite = Matter.Composite;
	
	// create an engine
	const engine = Engine.create();
	
	// create a renderer
	const stage = document.getElementById("app") as HTMLInputElement;
	const render = Render.create({
		element: stage,
		engine: engine,
		options: {
			wireframes: false,
			background: "#cca",
			width: 800,
			height: 600,
		}
	});
	
	// create two boxes and a ground
	const scale:number = 0.25;
	const okakiShape = [[
		{ x: 100, y: 26 },
		{ x: 214*scale, y: 1*scale },
		{ x: 368*scale, y: 25*scale },
		{ x: 429*scale, y: 65*scale },
		{ x: 459*scale, y: 167*scale },
		{ x: 434*scale, y: 271*scale },
		{ x: 339*scale, y: 327*scale },
		{ x: 214*scale, y: 355*scale },
		{ x: 64*scale, y: 321*scale },
		{ x: 15*scale, y: 289*scale },
		{ x: 2*scale, y: 133*scale },
	]];
	const okakiOptions = {
		render: {
			sprite: {
				texture: texture,
				xScale: 0.25,
				yScale: 0.25
			}
		}
	};
	const ground = Bodies.rectangle(400, 610, 810, 60, {
		isStatic: true,
		render: {
			 fillStyle: "#888",
		}
	});
	
	// add all of the bodies to the world
	Composite.add(engine.world, [ground]);
	
	// run the renderer
	Render.run(render);
	
	// create runner
	const runner = Runner.create();
	
	// run the engine
	Runner.run(runner, engine);

	//create okakies
	const okakies = new Array();
	const loop = () => {
		okakies.forEach((el) => {
			const leftX = el.bounds.min.x;
			const rightX = el.bounds.max.x;
			if (leftX < -100 || rightX > render.bounds.max.x + 100) {
				Composite.remove(engine.world, el);
			}
		})
		window.requestAnimationFrame(loop);
	}
	loop();

	stage.addEventListener("click", function(event) {
		const x = event.offsetX;
		const y = event.offsetY;
		const newOkaki = Bodies.fromVertices(x, y, okakiShape, okakiOptions);
		okakies.push(newOkaki);
		Composite.add(engine.world, [newOkaki]);
	})
} 