let simplex = new window.SimplexNoise()

const app = () => {

    let canvas = document.querySelector('#myCanvas')
    let dpr = window.devicePixelRatio

    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.maxWidth = window.innerWidth / 2 + "px"
    canvas.style.maxHeight = window.innerHeight / 2 + "px"

    const cw = canvas.width
    const ch = canvas.height
    const cw2 = cw / 2
    const ch2 = ch / 2

    let ctx = canvas.getContext('2d')

    window.addEventListener('mousemove', (evt) => {
        mouseX = evt.x * dpr
        mouseY = evt.y * dpr
    })

    class Point {
        constructor(x, y, size = 10, color) {
            this.x = x
            this.y = y
            this.size = size
            this.color = color
            this.lifespan = 2
        }
        draw() {
            this.update()
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.arc(0, 0, this.size, 0, Math.PI * 2, true)
            ctx.fill()
            ctx.closePath()
            ctx.restore()
        }
        update() {
            this.lifespan -= 0.01
        }
    }

    let size = 8
    let radius = 100
    let points = []
    let steps = 100
    let scale = 100
    let frequency = 0.1

    const update = () => {
        requestAnimationFrame(update)
        let time = Date.now() / 1000;
        ctx.clearRect(0, 0, cw, ch);

        degreesTab = [-135, -90, -45, 0, 45, 90, 135, 180];
        colorTab = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'violet', 'black'];

        ctx.save()
        ctx.translate(cw2, ch2);
        drawRandomCircle()
        ctx.restore()

        ctx.save()
        ctx.translate(0, 0);
        let point1 = new Point(Math.cos(time) * radius * 1, 0, size, 'red')
        point1.draw()
        ctx.restore()

        ctx.save()
        ctx.translate(cw, 0);
        let point4 = new Point(Math.cos(time) * radius * 1, ch, size, 'red')
        point4.draw()
        ctx.restore()

        ctx.save()
        ctx.translate(0, 0);
        let point2 = new Point(Math.cos(time) * radius * 1, ch, size, 'red')
        point2.draw()
        ctx.restore()

        ctx.save()
        ctx.translate(cw, 0);
        let point5 = new Point(Math.cos(time) * radius * 1, 0, size, 'red')
        point5.draw()
        ctx.restore()

        if (size < 700) {
            size += 2
        } else {
            points = []
            size = 0
        }

        ctx.beginPath()
        ctx.strokeStyle = 'white'

        ctx.moveTo(0, simplex.noise2D(0, time) * scale)
        for (let x = 0; x < steps; x++) {
            ctx.lineTo((x / steps) * cw, simplex.noise2D((x * frequency), time) * scale)
        }
        ctx.stroke()
        ctx.closePath()
        ctx.restore()

    }
    requestAnimationFrame(update)

    function drawRandomCircle() {

        let x = Math.random() * cw - cw2
        let y = Math.random() * ch - ch2
        let sizeP = Math.random() * 10
        let tabColor = ['blue', 'green', 'yellow', 'orange', 'purple', 'grey']

        if (size < 500) {
            point = new Point(x, y, sizeP, 'white')
        } else {
            point = new Point(x, y, Math.random() * 40, tabColor[Math.floor(Math.random() * tabColor.length)])
        }

        points.push(point)
        points.forEach(point => {
            point.draw()
        })
        points = points.filter(point => point.lifespan > 0)
    }

}

document.addEventListener('DOMContentLoaded', () => {
    app()
})