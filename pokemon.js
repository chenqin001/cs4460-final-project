
d3.csv('pokemon.csv',function(d) {
    //console.log(d); 
    let svg = d3.select("body").append("svg")
    .attr("width", 700)
    .attr("height", 600);


    let features = ["attack","defense","hp","sp_attack","sp_defense","speed"];
    let data = [
        //{attack:185,defense:230,hp:255,sp_attack:194,sp_defense:230,speed:180},
        // {attack:5,defense:5,hp:1,sp_attack:10,sp_defense:20,speed:5},
        {attack:49,defense:49,hp:45,sp_attack:65,sp_defense:65,speed:45},
        {attack:100,defense:120,hp:75,sp_attack:25,sp_defense:65,speed:65},
    ];
    console.log(data);


    let radialScale = d3.scale.linear()
        .domain([0,255])
        .range([0,250]);
    
    //let ticks = [15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255];
    let ticks = [15,75,135,195,255];

    ticks.forEach(t =>
        svg.append("circle")
        .attr("cx", 300)
        .attr("cy", 300)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", radialScale(t))
    );

    ticks.forEach(t =>
        svg.append("text")
        .attr("x", 300)
        .attr("y", 300 - radialScale(t))
        .text(t.toString())
    );

    function angleToCoordinate(angle, value){
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {"x": 300 + x, "y": 300 - y};
    }

    for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        let line_coordinate = angleToCoordinate(angle, 270);
        let label_coordinate = angleToCoordinate(angle, 280);

        //draw axis line
        svg.append("line")
        .attr("x1", 300)
        .attr("y1", 300)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke","black");

        //draw axis label
        svg.append("text")
        .attr("x", label_coordinate.x)
        .attr("y", label_coordinate.y)
        .text(ft_name);
    }

    let line = d3.svg.line()
        .x(d => d.x)
        .y(d => d.y);
    let colors = ["darkorange", "gray", "navy"];

    function getPathCoordinates(data_point){
        let coordinates = [];
        for (var i = 0; i < features.length; i++){
            let ft_name = features[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
            coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
        }
        return coordinates;
    }

    for (var i = 0; i < data.length; i ++){
        let d = data[i];
        let color = colors[i];
        let coordinates = getPathCoordinates(d);

        //draw the path element
        svg.append("path")
        .datum(coordinates)
        .attr("d",line)
        .attr("stroke-width", 3)
        .attr("stroke", color)
        .attr("fill", color)
        .attr("stroke-opacity", 1)
        .attr("opacity", 0.5);
    }
});

