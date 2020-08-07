export default class Point {
    constructor(x,y,r,speedx,speedy) {
        this.x = x
        this.y = y
        this.r = r
        this.speedx = speedx
        this.speedy = speedy
        this.collided = false
        this.status = 'not' //statuses: not, inf, rec, dead, vac
        this.timeInfected = 0
        this.color = null;
        this.mask = false;
        this.updateColor()
    }

    updateColor() {
        if(this.isNotInfected()) {this.color = "#0AD48B"}
        else if(this.isInfected()) {this.color = "#C70039"}
        else if(this.isRecovered()) {this.color = "#004785"}
        else if(this.isDead()) {this.color = "#FF9933"}
        else if(this.isVaccinated()) {this.color = "#C0C0C0"}
    }

    isNotInfected() {
        if(this.status==='not') {return true}
        else {return false}
    }
    isInfected() {
        if(this.status==='inf') {return true}
        else {return false}
    }
    isRecovered() {
        if (this.status==='rec') {return true}
        else {return false}
    }
    isDead() {
        if(this.status==='dead') {return true}
        else {return false}
    }
    isVaccinated() {
        if(this.status==='vac') {return true}
        else {return false}
    }

    isMasked() {
        return(this.mask)
    }

    infect() {this.status = 'inf'}

    recover(infectionDuration, lethalityRate, fps) {
        if(!this.isInfected()) {return}
        else if(this.isInfected() && this.timeInfected < infectionDuration * fps) {this.timeInfected++}
        else {
            if(Math.random()*100 < 100-lethalityRate) {
                this.status='rec'
            } else {this.status='dead'}
            this.updateColor()
        }
    }
    
    vaccinate() {this.status='vac'}

    maskOn() {this.mask = true}
}