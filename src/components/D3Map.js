import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { feature } from "topojson";
import thaiGeo from "../componentMap/jp.geo.json"

export default function D3Map(){

    // append the svg object to the body of the page
    const ref = useRef();
    const svgX = 600;
    const svgY = 600;
    const margin = {left:30, right:30, top:10, bottom: 10}
    const centerPos = [137.0, 38.2];
    const scale = 2000;

    const projection = d3.geoMercator()
    .center(centerPos)
    .translate([svgX / 2, svgY / 2])
    .scale(scale);
    const path = d3.geoPath().projection(projection);

    const createMap = () =>{
        const svg = d3
            .select(ref.current)

            
            svg
            .select(`#map-container`)
            .append(`svg`)
            .attr(`viewBox`, `0 0 ${svgX} ${svgY}`)
            .attr(`width`, `100%`)
            .attr(`height`, `100%`);

   
        svg.selectAll('path').data(thaiGeo.features).enter().append('path').attr('d',path).attr(`stroke`, `#666`)
        .attr(`stroke-width`, 0.25)
        .attr(`fill`, `#2566CC`)
        .attr(`fill-opacity`, (item) => {

            console.log(item)

          return Math.random();
        })
    }

    useEffect(() => { createMap() },[])

    return <>
        <div className="text-center">
            12345
            <div className="text-center my-auto">
                <svg width={svgX} height={svgY} id="map-container" ref={ref} />
            </div>
        </div>

    </>
}