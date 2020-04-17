
//global vars
var gstart=1;
var gend=7;
var gtype="All Types";
var svg1 = d3.select("#scatterPlot").append("svg").attr("width", 1200).attr("height", 400);
var chartG = svg1.append('g');



function changeGeneration(values){
    var start=values[0];
    var end = values[1];
    gstart=start;
    gend=end;
    update();
}

function changeType(){
    var e = document.getElementById("type");
    var type = e.options[e.selectedIndex].value;
    gtype=type;
    update();
}

function update(){
    //filtering 
    console.log("start: " +gstart);
    console.log("end: " +gend);
    console.log("type: " +gtype);
    var dataset = data.filter(function(d){
        var generation = parseInt(d.generation);
        var typeOne = d.type1;
        var typeTwo=d.type2;
        if(gtype=="All Types"){
            return generation>=gstart && generation<=gend;
        }
        return generation>=gstart && generation<=gend && (typeOne==gtype||typeTwo==gtype);
    });
    console.log(dataset);
   
    var pokemons = chartG.selectAll('.pokemon').data(dataset, function (d) {
        return d.name;
    }); 


    var pokemonsEnter = pokemons.enter().append('g').attr('class', 'pokemon');
        pokemonsEnter.append('image')
        .attr('height', 13)
        .attr("href", function(d){
            if(d.is_legendary==1){
                return 'leg_pokémon.png';
            }else{
                return 'pokémon.png';
            }
        })
        .attr('opacity',0.5).on('click', function(d,i) {
            console.log(d);
            openPokemon(d);
        }).attr('transform', function(pokemon){
            return 'translate('+scaleY(pokemon['base_total']) + ',' + scaleX(pokemon['capture_rate']) + ')';
        });

    pokemonsEnter.append('text')
        .attr('dy', '-0.6em')
        .text(function (pokemon) {
            return pokemon['name']; //+" 「"+pokemon['japanese_name']+"」";
            //return pokemon['generation'];
        })
        .attr('fill', 'white')
        .attr('font-size', 13)
        .attr('font-weight', 'bold').attr('transform', function (pokemon) {
            return 'translate(' + scaleY(pokemon['base_total']) + ',' + scaleX(pokemon['capture_rate']) + ')';
        }).attr( 'visibility', 'hidden');

    pokemons.merge(pokemonsEnter);
    pokemons.exit().remove();  
}

//modal
function openPokemon(pokemon){
    console.log(pokemon);
    document.getElementById("pokemonModal").style.display="inline";
    
    document.getElementById("poke_name").innerHTML=pokemon["name"]+" 「"+pokemon["japanese_name"]+"」";
    document.getElementById("poke_index").innerHTML=pokemon["pokedex_number"];
    document.getElementById("poke_generation").innerHTML=pokemon["generation"];
    document.getElementById("poke_typeOne").innerHTML=pokemon["type1"];
    document.getElementById("poke_typeTwo").innerHTML=pokemon["type2"].length===0?"/":pokemon["type2"];
    document.getElementById("poke_classfication").innerHTML=pokemon["classfication"];

    document.getElementById("poke_height").innerHTML=pokemon["height_m"];
    document.getElementById("poke_weight").innerHTML=pokemon["weight_kg"];
    document.getElementById("poke_abilities").innerHTML=pokemon["abilities"];

    var source = `POKEMON/0001.png`;
    var index = pokemon["pokedex_number"];
    if(index.length<=1){ //1-9
        source = `POKEMON/000${index}.png`;
    }else if(index.length<2){
        source = `POKEMON/00${index}.png`;
    }else{
        source = `POKEMON/0${index}.png`;
    }
    document.getElementById("poke_img").src=source;
    

}



function closeModal(){ 
    document.getElementById('pokemonModal').style.display='none';
}

//labels, scales, blabla
// **** Functions to call for scaled values ****

function scaleY(y) {
    return YScale(y);
}

function scaleX(x) {
    return XScale(x);
}

// **** Code for creating scales, axes and labels ****

var YScale = d3.scaleLinear()
    .domain([150,800]).range([40,1100]);

var XScale = d3.scaleLinear()
    .domain([0,260]).range([330,10]);



svg1.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(YScale).tickFormat(function(d){return d;}));

svg1.append('text')
    .attr('class', 'label')
    .attr('transform','translate(510,390)')
    .attr('fill','white')
    .text('Base Total');

svg1.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(40,15)')
    .call(d3.axisLeft(XScale));

svg1.append('text')
    .attr('class', 'label')
    .attr('transform','translate(11,200) rotate(270)')
    .attr('fill','white')
    .text('Capture Rate');

svg1.append('rect')
    .attr('x',880) 
    .attr('y',50)
    .attr('width',130)
    .attr('height',60)
    .attr('fill','white');

svg1.append('rect')
    .attr('x',895)
    .attr('y',65)
    .attr('width',10)
    .attr('height',10)
    .attr('fill','#FF0000');

svg1.append('rect')
    .attr('x',895)
    .attr('y',85)
    .attr('width',10)
    .attr('height',10)
    .attr('fill','#FFDE00');

svg1.append('text').attr('transform','translate(915,73)').text('Not Legendary').attr('font-size',13);
svg1.append('text').attr('transform','translate(915,93)').text('Legendary').attr('font-size',13);


