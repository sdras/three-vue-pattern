<template>
  <div></div>
</template>

<script>
import * as THREE from 'three'

export default {
  props: {
    shapeZoom: {
      type: Number,
      default: 3,
      required: false
    },
    numShapes: {
      type: Number,
      default: 3,
      required: false
    },
    numAxes: {
      type: Number,
      default: 12,
      required: false
    },
    scale: {
      type: Number,
      default: 900,
      required: false
    },
    wireframe: {
      type: Boolean,
      default: false,
      required: false
    },
    rainbow: {
      type: Boolean,
      default: true,
      required: false
    },
    color: {
      type: [Number, String],
      default: 0x00ffff,
      required: false
    },
    tConfig: {
      type: [Object, Number],
      default: {
        a: 2,
        b: 3,
        c: 100,
        d: 3
      },
      required: false
    }
  },
  data() {
    return {
      tileHolder: new THREE.Object3D(),
      bufferSize: 800,
      isPaused: false //at the end
    }
  },
  watch: {
    wireframe() {
      this.init()
    }
  },
  methods: {
    createShapes(allShapes, bufferScene) {
      for (var i = 0; i < this.numShapes; i++) {
        var shape = new THREE.TorusKnotGeometry(
            this.tConfig.a,
            this.tConfig.b,
            this.tConfig.c,
            this.tConfig.d
          ),
          material
        if (this.rainbow) {
          material = new THREE.MeshNormalMaterial({
            wireframe: this.wireframe
          })
        } else {
          material = new THREE.MeshPhongMaterial({
            color: this.color,
            shininess: 90,
            wireframe: this.wireframe,
            emissive: 0x6e163f
          })
        }
        //shape.attributes.position.needsUpdate = true
        //material.wireframe.needsUpdate = true

        var torusKnot = new THREE.Mesh(shape, material)
        console.log(torusKnot)
        torusKnot.material.needsUpdate = true

        bufferScene.add(torusKnot)
        allShapes[i] = shape
      }
    },
    updateGridGeometry(bufferTexture, scene) {
      scene.remove(this.tileHolder)

      var theta = 0
      var numSteps = this.numAxes
      var step = 2 * Math.PI / numSteps
      var radius = 1

      var tileGeometry = new THREE.Geometry()
      tileGeometry.vertices.push(new THREE.Vector3(0, 0, 0))

      var snapStep // number of steps between simplified shape vertices
      var stepAngle
      var rotOffset

      // compute tile width
      var p1 = new THREE.Vector2(radius * Math.cos(0), radius * Math.sin(0))
      var p2 = new THREE.Vector2(
        radius * Math.cos(stepAngle),
        radius * Math.sin(stepAngle)
      )
      var dist = p1.distanceTo(p2)
      var a = dist / 2
      var c = radius
      var b = Math.sqrt(c * c - a * a)
      var tileWidth
      var tileHeight
      var tileRowOffset

      // find out if numAxes is factor of 4 or 6
      if (!(this.numAxes % 6)) {
        // factor of 6
        snapStep = this.numAxes / 6
        stepAngle = 2 * Math.PI / 6
        rotOffset = stepAngle / 2

        tileWidth = b * 2
        tileHeight = c + a
        tileRowOffset = b
      } else {
        // factor of 4
        snapStep = this.numAxes / 4
        stepAngle = 2 * Math.PI / 4
        rotOffset = 0

        tileWidth = c * 2
        tileHeight = c
        tileRowOffset = c
      }

      // add vertices
      for (var i = 0; i < numSteps; i++) {
        var mod = i % snapStep
        var ratio = mod / snapStep
        var position = Math.floor(i / snapStep)
        var angle1 = stepAngle * position
        var angle2 = stepAngle * (position + 1)
        var x, y

        if (mod == 0) {
          // standard vertex position
          x = radius * Math.cos(theta)
          y = radius * Math.sin(theta)
        } else {
          // interpolate between angle1 and angle2
          var x1 = radius * Math.cos(angle1)
          var y1 = radius * Math.sin(angle1)

          var x2 = radius * Math.cos(angle2)
          var y2 = radius * Math.sin(angle2)

          x = x1 + (x2 - x1) * ratio
          y = y1 + (y2 - y1) * ratio
        }

        tileGeometry.vertices.push(new THREE.Vector3(x, y, 0))
        theta += step
      }

      // add faces
      for (var i = 0; i < numSteps; i++) {
        var v1 = i + 1
        var v2 = i + 2
        if (v2 > numSteps) v2 = 1
        tileGeometry.faces.push(new THREE.Face3(0, v1, v2))
      }

      tileGeometry.computeBoundingSphere()
      tileGeometry.computeBoundingBox()

      // set UV mapping
      tileGeometry.faceVertexUvs[0] = []

      var mapWidth = 1 / snapStep
      var diff = 1 - mapWidth
      var mapLeft = diff / 2
      var mapRight = 1 - diff / 2

      for (i = 0; i < tileGeometry.faces.length; i++) {
        if (i % 2) {
          tileGeometry.faceVertexUvs[0].push([
            new THREE.Vector2(0.5, 0),
            new THREE.Vector2(mapLeft, 1),
            new THREE.Vector2(mapRight, 1)
          ])
        } else {
          tileGeometry.faceVertexUvs[0].push([
            new THREE.Vector2(0.5, 0),
            new THREE.Vector2(mapRight, 1),
            new THREE.Vector2(mapLeft, 1)
          ])
        }
      }

      tileGeometry.uvsNeedUpdate = true

      var tileRow = new THREE.Object3D()
      this.tileHolder.add(tileRow)

      //this is the scale
      var scale = this.scale / 3

      var tileMat = new THREE.MeshBasicMaterial({
        //main object
        map: bufferTexture,
        side: THREE.DoubleSide
      })

      var tileMesh = new THREE.Mesh(tileGeometry, tileMat)
      tileMesh.scale.set(scale, scale, 1)
      tileMesh.rotation.z = rotOffset
      tileRow.add(tileMesh)

      var tileCountX = 15
      for (var i = 0; i < tileCountX; i++) {
        var tileMeshLeft = tileMesh.clone()
        tileMeshLeft.position.x -= tileWidth * scale * (i + 1)
        tileRow.add(tileMeshLeft)

        var tileMeshRight = tileMesh.clone()
        tileMeshRight.position.x += tileWidth * scale * (i + 1)
        tileRow.add(tileMeshRight)
      }

      var tileCountY = 10
      for (var i = 0; i < tileCountY; i++) {
        var tileRowTop = tileRow.clone()
        tileRowTop.position.y += tileHeight * scale * (i + 1)
        if (!(i % 2)) tileRowTop.position.x += tileRowOffset * scale
        this.tileHolder.add(tileRowTop)

        var tileRowBottom = tileRow.clone()
        tileRowBottom.position.y -= tileHeight * scale * (i + 1)
        if (!(i % 2)) tileRowBottom.position.x += tileRowOffset * scale
        this.tileHolder.add(tileRowBottom)
      }

      scene.add(this.tileHolder)
    },
    init() {
      var scene = new THREE.Scene()

      var bufferCamera = new THREE.PerspectiveCamera(
        75,
        this.bufferSize / this.bufferSize,
        0.1,
        1000
      )
      bufferCamera.position.z = this.shapeZoom

      //you may need to alter the targets here
      var bufferTexture = new THREE.WebGLRenderTarget(
        this.bufferSize,
        this.bufferSize,
        {
          minFilter: THREE.LinearMipMapLinearFilter,
          magFilter: THREE.LinearFilter,
          antialias: true
        }
      )

      var camera = new THREE.OrthographicCamera(
        window.innerWidth / -2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerHeight / -2,
        0.1,
        1000
      )
      camera.position.z = 5

      var renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)

      var bufferScene = new THREE.Scene()

      /// buffer scene objects

      var allShapes = []
      this.createShapes(allShapes, bufferScene)

      var pointLight = new THREE.PointLight(0x404040)
      pointLight.position.set(0, 50, -200)
      bufferScene.add(pointLight)

      /// main scene objects
      var ambientLight = new THREE.AmbientLight(0x404040)
      scene.add(ambientLight)

      var pointLight3 = new THREE.PointLight(0xffffff)
      pointLight3.position.set(-100, 200, 100)
      scene.add(pointLight3)

      this.updateGridGeometry(bufferTexture, scene)

      //animate the scene
      function animate() {
        requestAnimationFrame(animate)

        bufferScene.rotation.x += 0.01
        bufferScene.rotation.y += 0.02

        renderer.render(bufferScene, bufferCamera, bufferTexture)
        renderer.render(scene, camera)
      }
      animate()

      //update the canvas
      window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth
        var HEIGHT = window.innerHeight
        renderer.setSize(WIDTH, HEIGHT)

        camera.left = window.innerWidth / -2
        camera.right = window.innerWidth / 2
        camera.top = window.innerHeight / 2
        camera.bottom = window.innerHeight / -2
        camera.updateProjectionMatrix()
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>