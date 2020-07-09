import Rectangle from './rectangle.js'
import Physics from './physics.js'

export default class QuadTree {
    constructor(boundary, n, dot_radius) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
        this.count_not = 0;
        this.count_inf = 0;
        this.count_rec = 0;
        this.count_dead = 0;
        this.count_vac = 0;
        this.dot_radius = dot_radius
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let ne = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.northeast = new QuadTree(ne, this.capacity, this.dot_radius);
        let nw = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        this.northwest = new QuadTree(nw, this.capacity, this.dot_radius);
        let se = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        this.southeast = new QuadTree(se, this.capacity, this.dot_radius);
        let sw = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        this.southwest = new QuadTree(sw, this.capacity, this.dot_radius);

        this.divided = true;
    }

    insert(point) {
        if(!this.boundary.contains(point)) {
            return;
        }

        //if it is not at capacity and is a leaf node, insert it
        if (this.points.length < this.capacity && !this.divided) {
            this.points.push(point);
        //either at capacity and needs to split OR
        //not a leaf node and needs to be passed down further
        } else {
            if(!this.divided) {
                this.subdivide();
            }

            //adds new point to leaves
            this.northeast.insert(point);
            this.northwest.insert(point);
            this.southeast.insert(point);
            this.southwest.insert(point);

            //moves old points to new leaves
            for(let p of this.points) {
                this.northeast.insert(p);
                this.northwest.insert(p);
                this.southeast.insert(p);
                this.southwest.insert(p);
            }

            //deletes old points
            this.points = [];
            
        }
    }

    countPoints(points) {
        for (let p of points) {
            this.count_not+=p.isNotInfected();
            this.count_inf+=p.isInfected();
            this.count_rec+=p.isRecovered();
            this.count_dead+=p.isDead();
            this.count_vac+=p.isVaccinated();
        }
    }

    resetCount() {
        this.count_not=0;
        this.count_inf=0;
        this.count_rec=0;
        this.count_dead=0;
        this.count_vac=0;
    }

    static checkTransmission(p1, p2) {
        if(p1.isInfected() || p2.isInfected()) {
            if(p1.isNotInfected() || p2.isNotInfected()) {
                p1.infect();
                p2.infect();
                p1.updateColor();
                p2.updateColor();
            }
        }
        
    }

    checkCollision(width, height) {
        let dot_radius = this.dot_radius
        if(this.divided) {
            this.northeast.checkCollision(width, height);
            this.northwest.checkCollision(width, height);
            this.southwest.checkCollision(width, height);
            this.southeast.checkCollision(width, height);
        } else {
            if(this.points.length < 1) { return }
            for(let p of this.points) {

                //check for wall collisions
                if(p.x > width - dot_radius) { p.speedx = -Math.abs(p.speedx) }
                if(p.x < dot_radius) { p.speedx = Math.abs(p.speedx) }
                if(p.y > height - dot_radius) { p.speedy = -Math.abs(p.speedy) }
                if(p.y < dot_radius) { p.speedy = Math.abs(p.speedy) }

                for(let pcomp of this.points) { //check if colliding with any other points in this leaf node
                    if(p === pcomp || p.collided == true || pcomp.collided == true) { continue } //skip if they've already had a collision this frame
                    
                    //initiates collision if balls are close enough
                    if( Math.sqrt( Math.pow( Math.abs( p.x - pcomp.x ), 2 ) + 
                                    Math.pow( Math.abs( p.y - pcomp.y ), 2) ) < 2*dot_radius ) {
                        // let tempx = p.speedx;
                        // let tempy = p.speedy;
                        // p.speedx = pcomp.speedx;
                        // p.speedy = pcomp.speedy;
                        // pcomp.speedx = tempx;
                        // pcomp.speedy = tempy;
                        // p.collided = true;
                        // pcomp.collided = true;
                        // p.x += (p.x > pcomp.x)*2+-1;
                        // p.y += (p.y > pcomp.y)*2+-1;
                    
                        Physics.collision(p, pcomp)
                        QuadTree.checkTransmission(p, pcomp);
                        p.recover();
                    }
                }
            }
            //prevents circles from being colliding twice per frame
            for(let p of this.points) {
                p.collided = false;
            }
        }
    }

    advance(timeStep, points, width, height) {
        this.resetCount();
        this.countPoints(points);
        this.checkCollision(width, height);
        for(let p of points){
            p.x += p.speedx * timeStep;
            p.y += p.speedy * timeStep;
            p.recover();
        }
        
    }

    static infectSetup(points, number) {
        let number_infected = 0;
        for (let p of points) {
            if(number_infected>=number){return}
            else if(p.isNotInfected()) {
                p.infect()
                p.updateColor()
                number_infected++
            }

        }
    }

    static vaccinateSetup(points, number) {
        let number_vaccinated = 0;
        for (let p of points) {
            if(number_vaccinated>=number){return}
            else if(p.isNotInfected()) {
                p.vaccinate()
                p.updateColor()
                number_vaccinated++
            }

        }
    }

}