import React from 'react'
import ReactDOM from 'react-dom'
import Matter from 'matter-js'

import './App.css'

import logo from './images/Logo.png'
import plus1 from './images/test.png'
import plus2 from './images/02.png'
import plus3 from './images/03.png'
import plus4 from './images/04.png'
import plus5 from './images/05.png'
import plus6 from './images/06.png'

class Scene extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
      MouseConstraint = Matter.MouseConstraint

    var engine = Engine.create({
      // positionIterations: 20
    })

    let width = window.innerWidth
    let height = window.innerHeight
    let ballCount = 12
    var ballSize = height / 8
    var smallBall = height / 250
    var bigBall = height / 40
    var color1 = 'rgba(255,255,255,1)'
    var color2 = 'rgba(250,255,17,1)'
    var color3 = 'black'
    var color4 = 'whitesmoke'
    var color5 = 'red'
    var color6 = 'bisque'
    var redColor = 'red',
      greenColor = 'blue'
    let raf = null
    let bodyRotation = 0

    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
        showVelocity: false,
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showCollisions: false,
        showSeparations: false,
        showAxes: false,
        showPositions: false,
        showAngleIndicator: false,
        showIds: false,
        showShadows: false,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false,
        showMousePosition: false,
      },
    })

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
      })

    World.add(engine.world, mouseConstraint)

    var sstop1 = Bodies.circle(width / 4.2, (height / 5) * 3.8, height / 20, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    })
    World.add(engine.world, [sstop1])

    for (let i = 0; i < ballCount; i++) {
      let radius = Math.round(30 + (Math.random() * height) / 25)
      var ball = Bodies.circle(width / 4, height / 6, radius, {
        density: 0.04,
        frictionAir: 0.06,
        restitution: 0.8,
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
      })
      var constraint = Constraint.create({
        pointA: { x: width / 2, y: height / 2 },
        bodyB: ball,
        length: ballSize,
        stiffness: 0.0001,
        render: { visible: false },
      })
      World.add(engine.world, [ball, constraint])
    }

    var body = Bodies.rectangle(200, 20, 300, 500, {
      render: {
        fillStyle: 'transparent',
      },
    })
    var constraint2 = Constraint.create({
      pointA: { x: width / 2, y: height / 2 },
      bodyB: body,
      length: ballSize,
      stiffness: 0.0001,
      render: { visible: false },
    })
    World.add(engine.world, [body, constraint2])

    let textBlock = this.refs.info

    var w1 = Bodies.rectangle(width / 2, height / 2, 100, 2, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    })

    World.add(engine.world, [w1])
    Body.rotate(w1, bodyRotation)

    engine.world.gravity.y = 0

    Engine.run(engine)
    Render.run(render)

    function update() {
      console.log(body.position.x)
      bodyRotation = bodyRotation + 0.00001
      Body.rotate(w1, bodyRotation)

      textBlock.style.transform =
        'translate( ' +
        body.position.x / 2 +
        'px, ' +
        body.position.y / 2 +
        'px )'
      textBlock.style.transform += 'rotate( ' + body.angle / 4 + 'rad )'
      raf = requestAnimationFrame(update.bind(this))
    }
    update()
    var runner = Runner.create()
    Runner.run(runner, engine)
  }

  render() {
    return (
      <div className="App">
        <div className="info">
          <img ref="logo" className="logo" alt="Suprlus+ logo" src={logo} />
          <p ref="info">
            As an anti-capitalist creative business center, our practice is
            mission-driven and we think and make as a collective. We are
            streeeeeetchy, and we seek to work against the reproduction of harm
            by redistributing wealth and labor. For us, advocating for Black
            lives matter also means supporting Black creativity and expressions,
            therefore a percentage of every payment we receive will go towards
            fully subsidizing studio space(s) in Soft Surplus for Black
            artist(s). You can learn more about our redistribution plan by
            visiting the Surplus+ financial report.{' '}
          </p>
        </div>
        <div ref="scene" style={{ width: '100%', height: '100%' }} />
      </div>
    )
  }
}
export default Scene
