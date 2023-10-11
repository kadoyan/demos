import Matter from "matter-js";
import texture from "./images/creampuff.png";

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
	const scale:number = 0.2;
	const puffShape = [[
		{ x: 100*scale, y: 26*scale },
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
	const puffOptions = {
		friction: 1,
		restitution: 0,
		frictionStatic: 10,
		slop: 0.5,
		render: {
			sprite: {
				texture: texture,
				xScale: scale,
				yScale: scale
			}
		}
	};
	const ground = Bodies.rectangle(400, 610, 810, 60, {
		isStatic: true,
		friction: 1,
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

	//create puffes
	const puffes = new Array();
	const loop = () => {
		puffes.forEach((el) => {
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
		const newPuff = Bodies.fromVertices(x, y, puffShape, puffOptions);
		puffes.push(newPuff);
		Composite.add(engine.world, [newPuff]);
	})
} 