import React from "react";
import Matter from "matter-js";

import "./App.css";

import logo from "./images/Logo.png";
import plus1 from "./images/test.png";
import plus2 from "./images/02.png";
import plus3 from "./images/03.png";
import plus4 from "./images/04.png";
import plus5 from "./images/05.png";
import plus6 from "./images/06.png";

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Body = Matter.Body,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Constraint = Matter.Constraint,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({});

    let width = 600;
    let height = 600;
    let ballCount = 12;
    var ballSize = height / 8;
    var color3 = "transparent";
    let raf = null;
    let bodyRotation = 0;

    var rotateCategory = 0x0001,
      boundaryCategory = 0x0002;

    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        showAngleIndicator: false,
        showCollisions: false,
        showVelocity: false,
      },
    });
    Render.run(render);

    const w = 20;
    const extraLength = 1;
    const sides = 100;
    const radius = 280;
    const theta = (2 * Math.PI) / sides;
    const sideLength = ((2 * radius * theta) / 2) * extraLength;

    const parts = [];
    for (let i = 0; i < sides; i++) {
      // We'll build thin sides and then translate + rotate them appropriately.
      const body = Bodies.rectangle(0, 0, sideLength, w, {
        isStatic: true,
        collisionFilter: {
          category: boundaryCategory,
        },
        render: {
          fillStyle: "transparent",
        },
      });
      Body.rotate(body, i * theta);
      Body.translate(body, {
        x: radius * Math.sin(i * theta),
        y: -radius * Math.cos(i * theta),
      });
      parts.push(body);
    }
    const ret = Body.create({
      isStatic: true,
      collisionFilter: {
        category: boundaryCategory,
      },
      render: {
        fillStyle: "transparent",
      },
    });
    Body.setParts(ret, parts);
    // if (initialRotation) {
    //   Body.rotate(ret, initialRotation);
    // }
    Body.translate(ret, { x: 300, y: 300 });

    World.add(engine.world, [ret]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    mouseConstraint.collisionFilter.mask = rotateCategory;

    World.add(engine.world, mouseConstraint);

    var sstop1 = Bodies.circle(width / 4.2, (height / 5) * 3.8, height / 20, {
      isStatic: true,
      collisionFilter: {
        category: rotateCategory | boundaryCategory,
      },
      render: {
        fillStyle: "transparent",
      },
    });
    World.add(engine.world, [sstop1]);

    for (let i = 0; i < ballCount; i++) {
      let radius = Math.round(30 + (Math.random() * height) / 25);
      var ball = Bodies.circle(width / 4, height / 6, radius, {
        density: 0.04,
        frictionAir: 0.06,
        restitution: 0.8,
        collisionFilter: {
          category: rotateCategory | boundaryCategory,
        },
        render: {
          sprite: {
            texture: [plus1, plus2, plus3, plus4, plus5, plus6][
              Math.round(Math.random() * 6 - 0.5)
            ],
            xScale: 0.2,
            yScale: 0.2,
          },

          strokeStyle: color3,
          lineWidth: 1,
        },
      });
      var constraint = Constraint.create({
        pointA: { x: width / 2, y: height / 2 },
        bodyB: ball,
        length: ballSize,
        stiffness: 0.0001,
        render: { visible: false },
      });
      World.add(engine.world, [ball, constraint]);
    }

    // let textBlock = this.refs.info

    var w1 = Bodies.rectangle(width / 2, height / 2, 100, 2, {
      isStatic: true,
      collisionFilter: {
        category: rotateCategory,
      },
      render: {
        fillStyle: "transparent",
      },
    });

    World.add(engine.world, [w1]);
    Body.rotate(w1, bodyRotation);

    engine.world.gravity.y = 0;

    Engine.run(engine);
    Render.run(render);

    function update() {
      bodyRotation = bodyRotation + 0.00001;
      Body.rotate(w1, bodyRotation);

      // textBlock.style.transform =
      //   'translate( ' +
      //   body.position.x / 2 +
      //   'px, ' +
      //   body.position.y / 2 +
      //   'px )'
      // textBlock.style.transform += 'rotate( ' + body.angle / 4 + 'rad )'
      raf = requestAnimationFrame(update.bind(this));
    }
    update();
    var runner = Runner.create();
    Runner.run(runner, engine);
  }

  render() {
    return (
      <div className="App">
        <div className="info">
          <img ref="logo" className="logo" alt="Suprlus+ logo" src={logo} />
          <p ref="info">
            Surplus+ (“sur-plus-plus”) is an elastic, multi-disciplinary team of
            soft workers offering <span className="pink">art</span>,{" "}
            <span className="green">design</span>,{" "}
            <span className="yellow">research</span> and{" "}
            <span className="blue">production</span> services to you. Surplus+
            is born out of a desire to financially sustain our collective studio
            space, Soft Surplus, support our members under COVID-19, as well as
            our love of learning from and working with each other.
            <br />
            <br />
            Our practice is mission-driven:
            <ul>
              <li>we think and make as a collective</li>
              <li>we actively seek to redistribute wealth and labor</li>
              <li>we work with clients whose values we align with</li>
            </ul>
          </p>

          <section className="rolodex">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScDeWeCV86EN3ECMOdNRLxANv0Wt6I4vsAtxEzfMyTAG2SO6g/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <button className="button">work with us</button>
            </a>
            <div>
              <div className="slidingVertical">
                <span>+ writing + financial modeling + chatbots/ML apps</span>
                <span>+ curriculum design + cooking + graphic design</span>
                <span>
                  + interactive design tools + furniture + 3D modeling
                </span>
                <span>+ architecture + digital fabrication + film editing</span>
                <span>+ gardening + web design/dev + dancing + drawing</span>
                <span>+ UI/UX + physical computing + wireless sensors</span>
                <span>+ print design + inflatables + carpentry + more!</span>
              </div>
            </div>
          </section>
          <p className="small">
            A percentage of every payment we receive will go towards subsidizing
            studio spaces in Soft Surplus for Black members and towards Black
            led organizations we love & support. The goal of Surplus+ is to
            create structures for reducing barriers to access and participation
            in creative community spaces. We are designing our bylaws to become
            a worker-owned cooperative in the State of New York.
          </p>
        </div>
        <div ref="scene" className="canvas" />
      </div>
    );
  }
}
export default Scene;
