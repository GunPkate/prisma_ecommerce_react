import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function D3Map(){

    // append the svg object to the body of the page
    const ref = useRef();
    const width = 600;
    const height = 600;
    const margin = {left:30, right:30, top:10, bottom: 10}
    const dataGeo = d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json').then(data => {
        // const countries = feature( data, data.objects.countries )
        console.log(data)
        // console.log(countries)
    }
    )

    const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    return <>
        <div className="text-center">
            12345
            
        </div>
    </>
}