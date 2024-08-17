import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { feature } from "topojson";

export default function D3Map(){

    // append the svg object to the body of the page
    const ref = useRef();
    const svgX = 600;
    const svgY = 600;
    const margin = {left:30, right:30, top:10, bottom: 10}

    // const svg = d3.select('svg')
    const projection = d3.geoMercator();
    const geoPath = d3.geoPath().projection(projection);
    const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", svgX + margin.left + margin.right)
        .attr("height", svgY + margin.top + margin.bottom)

    const dataGeo = d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json').then(data => {
        const countries = feature( data, data.objects.countries )
        // console.log(data)
        // console.log(countries)
        svg.selectAll('path').data(countries.features).enter().append('path').attr('d',geoPath)
    }
    )


    return <>
        <div className="text-center">
            12345
            <div className="text-center my-auto">
                <svg width={svgX} height={svgY} id="map" ref={ref} />
            </div>
        </div>
    </>
}