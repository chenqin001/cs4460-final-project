d3.csv('pokemon.csv').then(function(dataset) {

    var pokemonG = svg.selectAll('.pokemon')
        .data(dataset)
        .enter()
        .append('g')    
        .attr('transform', function(pokemon){
            return 'translate('+scaleYear(pokemon['base_total']) + ',' + scaleHomeruns(pokemon['capture_rate']) + ')';
        }).attr('class','pokemon') ;
              

    pokemonG.append('circle')
        .attr('r', 4.5).style("stroke", "white")
        .style("stroke-width", 0.4)
        .style('fill',function(d){
            if(d.is_legendary==1){
                return '#FFCB05';
            }else{
                return '#3D7DCA';
             }
        })
        .attr('opacity',0.5);

    pokemonG.append('text')
        .attr('dy', '-0.6em')
        .text(function(pokemon){
            return pokemon['name']+" 「"+pokemon['japanese_name']+"」";
        })
        .attr('fill','white')
        .attr('font-size',13)
        .attr('font-weight','bold')
        .attr( 'visibility', 'hidden');
        
});



// **** Functions to call for scaled values ****

function scaleYear(year) {
    return yearScale(year);
}

function scaleHomeruns(homeruns) {
    return hrScale(homeruns);
}

// **** Code for creating scales, axes and labels ****

var yearScale = d3.scaleLinear()
    .domain([150,800]).range([60,1000]);

var hrScale = d3.scaleLinear()
    .domain([0,300]).range([340,20]);

var svg = d3.select("#scatterPlot").append("svg").attr("width", 1200).attr("height", 600);

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(yearScale).tickFormat(function(d){return d;}));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(360,390)')
    .attr('fill','white')
    .text('Base Total');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(hrScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(12,200) rotate(270)')
    .attr('fill','white')
    .text('Capture Rate');

svg.append('text')
    .attr('class', 'title')
    .attr('transform','translate(250,12)')
    .attr('fill','white')
    .text('Pokémon Base Total vs. Capture Rate');



svg.append('rect')
    .attr('id','label')
    .attr('x',755)
    .attr('y',50)
    .attr('width',110)
    .attr('height',60)
    .attr('fill','white');

svg.append('rect')
    .attr('x',770)
    .attr('y',65)
    .attr('width',10)
    .attr('height',10)
    .attr('fill','#3D7DCA');

svg.append('rect')
    .attr('x',770)
    .attr('y',85)
    .attr('width',10)
    .attr('height',10)
    .attr('fill','#FFCB05');

svg.append('text').attr('transform','translate(790,73)').text('Normal').attr('font-size',13);
svg.append('text').attr('transform','translate(790,93)').text('Legendary').attr('font-size',13);



