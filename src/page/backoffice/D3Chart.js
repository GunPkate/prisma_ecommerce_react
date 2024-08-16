import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function D3Chart(){
    let ref = useRef();

    var data = [
        {Country: "A", Value: .08167 * 100},
        {Country: "B", Value: .01492 * 100},
        {Country: "C", Value: .02780 * 100},
        {Country: "D", Value: .04253 * 100},
        {Country: "E", Value: .12702 * 100},
        {Country: "F", Value: .02288 * 100},
        {Country: "G", Value: .02022 * 100},
        {Country: "H", Value: .06094 * 100},
        {Country: "I", Value: .06973 * 100},
        {Country: "J", Value: .00153 * 100},
        {Country: "K", Value: .00747 * 100},
      
      ];

    const data2 = data.filter(x=>x);
    const [tempD,setTempD] = useState(data)
    useEffect(() => { createChart(tempD) }, []);

    // const max = Math.max(...data.map(i=>i.Value)) +10;
    const max = 20;
    const svgX = 900;
    const svgY = 600;

    const createChart = (dataInput) =>{

        // set the dimensions and margins of the graph
        const margin = { top: 30, right: 60, bottom: 70, left: 60 },
        width = svgX - margin.left - margin.right,
        height = svgY - margin.top - margin.bottom;

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
            .domain(dataInput.map((d) => d.Country))
            .padding(.6);
        svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear().domain([0, max]).range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Bars
        svg
            .selectAll("mybar")
            .data(dataInput)
            .join("rect")
            .attr("x", (d) => x(d.Country))
            .attr("y", (d) => y(d.Value))
            .attr("width", 60)
            .attr("height", (d) => height - y(d.Value))
            .attr("fill", "#5f0f40");

        //threshold
        svg.append('line')
            .style("stroke", "red")
            .style("stroke-width", 2)
            .attr("x1",0)
            .attr("y1",y(max * (20/100)))
            .attr("x2",width)
            .attr("y2",y(max * (20/100)))
        
        svg.append("text")
            .attr("class", "myText")
            .attr("x", width )
            .attr("y", y(max * (20/100)))
            .attr("dominant-baseline", "ideographic")
            .text("Low20%" );

        svg.append('line')
            .style("stroke", "black")
            .style("stroke-width", 2)
            .attr("x1",0)
            .attr("y1",y(max * (60/100)))
            .attr("x2",width)
            .attr("y2",y(max * (60/100)))
        
        svg.append("text")
            .attr("class", "myText")
            .attr("x", width )
            .attr("y", y(max * (60/100)))
            .attr("dominant-baseline", "ideographic")
            .text("Warning " + max * (60/100));
    }

    const sortChart = () => {
        let sortD = tempD
        sortD.sort((u,v)=>u.Value-v.Value)
        // setTempD(sortD);
        clearChart();
        createChart(sortD);
    }

    const resetChart = () => {
        // setTempD(data2);
        clearChart();
        createChart(data2);
    }

    const clearChart = () => {
        let d = document.getElementById("barchart")
        d.firstChild.remove();
    }

  
    return <div >
        <div className="text-center my-auto">
            <button onClick={sortChart}>Sort</button>
            <button onClick={resetChart}>Reset</button>
        </div>
        <div className="text-center my-auto">
            <svg width={svgX} height={svgY} id="barchart" ref={ref} />
        </div>
    </div> 
};
