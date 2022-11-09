const app = () => {

    let canvas = document.querySelector('#myCanvas')
    let dpr = window.devicePixelRatio

    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.maxWidth = window.innerWidth + "px"
    canvas.style.maxHeight = window.innerHeight + "px"

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

    const update = () => {
        requestAnimationFrame(update)
        let time = Date.now() / 1000;
        ctx.clearRect(0, 0, cw, ch);

        ctx.save()
        ctx.translate(cw2, ch2);
        drawRandomCircle()
        ctx.restore()

        ctx.save()
        ctx.translate(0, 0);
        let point1 = new Point(Math.cos(time) * radius * 2, 0, size, 'red')
        point1.draw()
        ctx.restore()

        ctx.save()
        ctx.translate(cw, 0);
        let point4 = new Point(Math.cos(time) * radius * 2, ch, size, 'pink')
        point4.draw()
        ctx.restore()

        ctx.save()
        ctx.translate(0, 0);
        let point2 = new Point(Math.cos(time) * radius * 2, ch, size, 'red')
        point2.draw()
        ctx.restore()

        ctx.save()
        ctx.translate(cw, 0);
        let point5 = new Point(Math.cos(time) * radius * 2, 0, size, 'pink')
        point5.draw()
        ctx.restore()

        if (size < 700) {
            size += 2
        } else {
            size = 0
        }

        // time = Date.now() / 1000;
        // ctx.save();
        // ctx.translate(cw / 2, ch / 2);
        // ctx.beginPath();
        // ctx.fillStyle = 'white';
        // ctx.arc(Math.cos(time) * radius, Math.sin(time) * radius, 10, 0, 2 * Math.PI);
        // ctx.fill();
        // ctx.closePath();
        // ctx.restore();

    }
    requestAnimationFrame(update)

    function drawRandomCircle() {
        ctx.clearRect(0, 0, cw, ch);
        let x = Math.random() * cw - cw2
        let y = Math.random() * ch - ch2
        let sizeP = Math.random() * 10
        let tabColor = ['red', 'blue', 'green', 'yellow', 'pink', 'orange', 'purple', 'grey']

        if (size < 500) {
            point = new Point(x, y, sizeP, 'white')
        } else {
            point = new Point(x, y, Math.random() * 30, tabColor[Math.floor(Math.random() * tabColor.length)])
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