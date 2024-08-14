import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function D3Chart(){
    const ref = useRef();
    var data = [
        {Country: "A", Value: .08167},
        {Country: "B", Value: .01492},
        {Country: "C", Value: .02780},
        {Country: "D", Value: .04253},
        {Country: "E", Value: .12702},
        {Country: "F", Value: .02288},
        {Country: "G", Value: .02022},
        {Country: "H", Value: .06094},
        {Country: "I", Value: .06973},
        {Country: "J", Value: .00153},
        {Country: "K", Value: .00747},
        {Country: "L", Value: .04025},
        {Country: "M", Value: .02517},
        {Country: "N", Value: .06749},
        {Country: "O", Value: .07507},
        {Country: "P", Value: .01929},
        {Country: "Q", Value: .00098},
        {Country: "R", Value: .05987},
        {Country: "S", Value: .06333},
        {Country: "T", Value: .09056},
        {Country: "U", Value: .02758},
        {Country: "V", Value: .01037},
        {Country: "W", Value: .02465},
        {Country: "X", Value: .00150},
        {Country: "Y", Value: .01971},
        {Country: "Z", Value: .00074}
      ];
    useEffect(() => {
        // set the dimensions and margins of the graph
        const margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
        
        // X axis
        const x = d3
            .scaleBand()
            .range([0, width])
            .domain(data.map((d) => d.Country))
            .padding(0.2);
        svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear().domain([0, 0.5]).range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Bars
        svg
            .selectAll("mybar")
            .data(data)
            .join("rect")
            .attr("x", (d) => x(d.Country))
            .attr("y", (d) => y(d.Value))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d.Value))
            .attr("fill", "#5f0f40");
        
    }, []);

    return <div className="text-center my-auto">
        <svg width={500} height={500} id="barchart" ref={ref} />;
    </div> 
};
