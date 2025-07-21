export class AnimatedBackground {
  constructor() {
    this.canvas = document.getElementById("backgroundCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.ripples = [];

    this.resize();
    window.addEventListener("resize", () => this.resize());
    requestAnimationFrame(() => this.animate());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  triggerRipple() {
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;
    const color = "rgba(255, 255, 255, 0.1)"; 

    this.ripples.push({
      x, y, radius: 0, max: 100 + Math.random() * 100, color
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ripples = this.ripples.filter(r => r.radius < r.max);

    for (const ripple of this.ripples) {
      this.ctx.beginPath();
      this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
      this.ctx.strokeStyle = ripple.color;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      ripple.radius += 1;
    }
    const color = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";

    requestAnimationFrame(() => this.animate());
  }
}
