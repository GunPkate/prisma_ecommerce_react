import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import thaiGeo from "../componentMap/thai.geo.json"
// https://stackblitz.com/edit/d3map-hdmhhx?file=index.ts,assets%2Fjapan.geo.json
export default function D3Map(prop){

    // append the svg object to the body of the page
    const ref = useRef();
    const svgX = 600;
    const svgY = 600;
    const margin = {left:30, right:30, top:10, bottom: 10}
    //JP cordinate
    // const centerPos = [137.0, 38.2];

    const createMap = ( centerPosInput, scaleInput) =>{
            //Thai coordinate

        let projection = d3.geoMercator()
        .center(centerPosInput)
        .translate([svgX / 2, svgY / 2])
        .scale(scaleInput);
        let path = d3.geoPath().projection(projection);
        
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
        .attr(`fill`, (item)=>{
            if(!item.properties.name.includes('Bangkok')){
                return `#2566CC`
            }else{
                return `#DC143C`
            }
        })
        .attr(`fill-opacity`, (item) => {
            // console.log(item)
            if(!item.properties.name.includes('Bangkok')){
                return Math.random();
            }else{
                return .8
            }
        })
        .attr(`id`, (item) => { return item.properties.name })
        .on('click', item => {
            let text = document.getElementById("info").innerHTML 
            setLabel(item.target.id)
            
            if(item.target.id === text){ 
                setLabel("Click") 
            }
            
            let targetColor = document.getElementById(`${item.target.id}`)
            // if(item.target.id !== text){
            //     targetColor.setAttribute("fill", "#000");
            //     targetColor.setAttribute("fill-opacity", "1");
            // }else{
            //     targetColor.setAttribute("fill", "#000");
            //     targetColor.setAttribute("fill-opacity", "1");
            // }
 
        });
    }

    useEffect(() => { createMap([100.0, 12.2],2000) },[])
    
    const [label,setLabel] = useState("Click");
    // const zoom = () => {
    //     removeMap()
    //     createMap([100.0, 12.2],4000) 
    // }

    // const moveMap = (di) => {
    //     const moveNum = 20 
    //     if(di === 'L'){
    //         // centerPos[1] += 20
    //         // console.log(centerPos)
    //     } 
    //     createMap();
    // }

    // const removeMap = () => {
    //     let d = document.getElementById("map-container")
    //     console.log(d)
    // }

    return <>
        <div className="text-center">
            {prop.children}
            <div>
                {/* <button onClick={()=>{zoom()}}>Zoom</button>
                <button onClick={()=>{moveMap('L')}}>Left</button> */}
            </div>
            <div >
                
                <div className="row text-center my-auto">
                    <div className="col-2">
                        <div className="mx-2 px-2 py-2 bg-info" id="info">{label}</div>
                        </div>
                        <div className="col-8">
                            <svg width={svgX} height={svgY} id="map-container" ref={ref} />
                        </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>

    </>
}