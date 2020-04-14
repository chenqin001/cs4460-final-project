    
    var set = new Set(); 
    
    var svg2 = d3.select("#radarChart").append("svg")
        .attr("width", 700)
        .attr("height", 600);

    var features = ["attack","defense","hp","sp_attack","sp_defense","speed"];


    let radialScale = d3.scaleLinear()
        .domain([0,255])
        .range([0,250]);
    let ticks = [15,75,135,195,255];

    ticks.forEach(t =>
        svg2.append("circle")
        .attr("cx", 300)
        .attr("cy", 300)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", radialScale(t))
    );

    ticks.forEach(t =>
        svg2.append("text")
        .attr("x", 300)
        .attr("y", 300 - radialScale(t))
        .text(t.toString()).attr('fill','white')
    );

    function angleToCoordinate(angle, value){
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {"x": 300 + x, "y": 300 - y};
    }

    for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        let line_coordinate = angleToCoordinate(angle, 255);
        let label_coordinate = angleToCoordinate(angle, 280);

        //draw axis line
        svg2.append("line")
        .attr("x1", 300)
        .attr("y1", 300)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke","white");

        //draw axis label
        svg2.append("text")
        .attr("x", label_coordinate.x)
        .attr("y", label_coordinate.y)
        .text(ft_name)
        .attr('fill','white');
    }
   

function addToChart(){

   
    var curr = Number(document.getElementById("pokedex_enter").value)
    if(curr!=NaN && curr>0 && curr<=801 && !set.has(curr)){
        console.log(data[curr-1]);
        set.add(curr);
        draw(data[curr-1]);
        document.getElementById("pokedex_enter").value="";
    }
}


function draw(pokemon){
        let line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
        
        let colors = ["#FF0000", "#CC0000", "#3B4CCA","#FFDE00",'#B3A125'];

        console.log(svg2);
        let data ={attack:pokemon["attack"],defense:pokemon["defense"],hp:pokemon["hp"],sp_attack:pokemon["sp_attack"],sp_defense:pokemon["sp_defense"],speed:pokemon["speed"]};
    
        let d = data;
        let coordinates = getPathCoordinates(d);
        let color=getRandomColor();
        svg2.append("path")
        .datum(coordinates)
        .attr("d",line)
        .attr("stroke-width", 3)
        .attr("stroke", color)
        .attr("fill", color)
        .attr("stroke-opacity", 1)
        .attr("opacity", 0.5)
        .attr('class', 'hhh');
}

function getPathCoordinates(data_point){
    let coordinates = [];
    for (var i = 0; i < features.length; i++){
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function emptyPath(){
  
  var r = document.getElementsByClassName("hhh");
  while(r.length > 0) {
    r[0].remove();
    }
    set.clear();
}