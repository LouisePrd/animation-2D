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
        constructor(x, y, size = 10) {
            this.x = x
            this.y = y
            this.size = size
        }
        draw() {
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.beginPath()
            ctx.fillStyle = '#ffffff'
            ctx.arc(0, 0, this.size, 0, Math.PI * 2, true)
            ctx.fill()
            ctx.closePath()
            ctx.restore()
        }
    }

    let size = 10

    const update = () => {
        requestAnimationFrame(update)

        // ctx.clearRect(0, 0, cw, ch);
        ctx.save()
        ctx.translate(cw / 2, ch / 2);
        let point = new Point(0, 0, size)
        let point2 = new Point(0, 0, size - 10)
        point2.fillStyle = 'black'
        
        size += 4
        point.draw()
        point2.draw()
        ctx.restore()

        ctx.save();
        ctx.translate(cw / 2, ch / 2);
        for (let i = 0; i < 6; i++) {
            drawRandomCircle()
        }
        ;
        ctx.restore();

    }
    requestAnimationFrame(update)

    function drawRandomCircle() {
        let x = Math.random() * cw - cw2
        let y = Math.random() * ch - ch2
        let size = Math.random() * 10
        ctx.save()
        ctx.translate(x, y)
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.arc(0, 0, size, 0, Math.PI * 2, true)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

}

document.addEventListener('DOMContentLoaded', () => {
    app()
})