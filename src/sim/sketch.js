import Rectangle from './rectangle.js'
import QuadTree from './quadtree.js'
import Point from './point.js'
import * as d3 from 'd3'


export default class Virusim {

    static runsim() {
        //using d3
        let boundary;

        let qt;
        let points;

        //params
        let timeStep=1;
        let width = 400;
        let height = 400;
        let number_nodes = 100;
        let number_infected_start = 1;
        let number_vaccinated_start = 0;
        let dot_radius = 4;
        let fps = 120;
        let velocity_scale = .5;
        //----------

        let center_x = width/2;
        let center_y = height/2;
        let setup_complete = false;


        boundary = new Rectangle(center_x, center_y, width/2, height/2)
        qt = new QuadTree(boundary, 8)
        points = [];

        //initializes the points
        for(let i=0; i<number_nodes; i++) {
            let p = new Point(Math.random()*width, Math.random()*height, dot_radius, (Math.random()-.5)*velocity_scale, (Math.random()-.5)*velocity_scale);
            points.push(p);
            qt.insert(p);
        }

        //sets up infected and vaccinated points
        QuadTree.infectSetup(points, number_infected_start);
        QuadTree.vaccinateSetup(points, number_vaccinated_start);

        //gets initial counts
        qt.countPoints(points)
        this.printCounts(qt)

        //does the initial drawing
        this.circles(points)


        var svg = d3.select(".canvas")
            .attr("width", width)
            .attr("height", height)
            .attr("x", width/2)
            .attr("y", height/2)
            .style("background", "white")
            .style("border-width", "2px")
            .style("border-color", "gray")

        setInterval(function(){
            this.wipe()
            qt.advance(timeStep, points, width, height);
            this.printCounts();
            //qt.checkCollision(width, height);
            qt = new QuadTree(boundary, 6);
            for(let p of points) {
                qt.insert(p);
            }
            this.circles(points)
        }, 1000/fps);

    }

    printCounts(qt) {
        this.printIndividualCount("count_not", "■ Healthy: ", qt.count_not)
        this.printIndividualCount("count_inf", "■ Infected: ",qt.count_inf)
        this.printIndividualCount("count_rec", "■ Recovered: ", qt.count_rec)
        this.printIndividualCount("count_dead", "■ Dead: ", qt.count_dead)
        this.printIndividualCount("count_vac", "■ Vaccinated: ", qt.count_vac)
    }

    printIndividualCount(count_name, label, count_num) {
        document.getElementById(count_name).innerHTML = label + String(count_num)
    }

    wipe() {
        d3.selectAll(".circle").remove();
    }

    circles(points) { 
        d3.select(".canvas")
        .selectAll(".circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("cx", function(p) {return p.x})
        .attr("cy", function(p) {return p.y})
        .attr("r", function(p) {return p.r})
        .attr("fill", function(p) {return p.color})
        .attr("class", "circle")
    }

}