import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import thaiGeo from "../componentMap/thai.geo.json"
// https://stackblitz.com/edit/d3map-hdmhhx?file=index.ts,assets%2Fjapan.geo.json
export default function D3Map(prop){

    // append the svg object to the body of the page
    const ref = useRef();
    const svgX = 700;
    const svgY = 700;
    const margin = {left:30, right:30, top:10, bottom: 10}
    let sum = 0
    //JP cordinate
    // const centerPos = [137.0, 38.2];
    const data = [
        {   id: 1, name: "TT", totalOrder: 3, totalValue: 58000, location: 3,},
        {   id: 2, name: "TT", totalOrder: 3, totalValue: 20000, location: 46,},
        {   id: 3, name: "GP", totalOrder: 3, totalValue: 1000, location: 4 },
        {   id: 4, name: "TT", totalOrder: 3, totalValue: 8000, location: 5,},

    ]

    const setOpacityMap = () => {
        data.forEach(x=> sum += x.totalValue);
        console.log(sum);
    }

    const createMap = ( centerPosInput, scaleInput, maxOpacity) =>{
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
            for(let i =0; i < data.length; i++){
                if(item.geometry.index === data[i].location){
                    return `#DC143C`
                }
            }
            return `#2566CC` 
        })
        .attr(`fill-opacity`, (item) => {
            // console.log(item)
            for(let i =0; i < data.length; i++){
                if(item.geometry.index === data[i].location){
                    let opac = data[i].totalValue/maxOpacity/10;
                    opac += .6 +opac*4
                    console.log("opac", opac)
                    return  opac;   
                }
            }
            return .8;
        })
        .attr(`id`, (item) => { return item.properties.name })
        .attr(`class`, (item) => { return item.geometry.index })
        .on('click', (item) => {
            let text = document.getElementById("info").innerHTML 
            setLabel(item.target.id)
            setSaleID(item.target.getAttribute('class'))
        });
    }

    useEffect(() => {
        let sum = 0; 
        data.forEach(x => sum += x.totalValue);
        console.log("sum",sum);
        setsaleSum(sum)
        createMap([100.0, 12.2],2000, sum) 
    },[])
    
    const [label,setLabel] = useState("Click");
    const [sale,setSale] = useState([ {   id: 0, name: "", totalOrder: 0, totalValue: 0, location: 0 }]);
    const [saleId,setSaleID] = useState( 0 );
    const [saleSum,setsaleSum] = useState( 0 );

   const setSaleUI = () =>{
        console.log(saleId)
        const temp = {   id: 0, name: "", totalOrder: 0, totalValue: 0, location: 0 }
        for (let i = 0; i < data.length; i++) {
            if(saleId == data[i].location){
                temp.id = data[i].id
                temp.location = data[i].location
                temp.totalOrder = data[i].totalOrder
                temp.totalValue = data[i].totalValue
                // console.log(data[i])
            }  
        }
        setSale([temp])
    }

    return <>
        <div className="text-center">
            {prop.children}
            <div>
                {/* <button onClick={()=>{zoom()}}>Zoom</button>
                <button onClick={()=>{moveMap('L')}}>Left</button> */}
            </div>
            <div >
                
                <div className="row text-center my-auto">
                    <div className="col-3">

                        <table className="mb-3">
                            <tr>
                                <th className="col-1">Rank</th>
                                <th className="col-7">Location</th>
                                <th className="col-4">Order</th>
                            </tr>
                            {data.map(x=>{
                                return <tr>
                                     <td>  {x.id}</td>
                                    {/* <div>  {x.name}</div> */}
                                    <td colSpan={3}>  {x.location}</td>
                                    <td>  {x.totalOrder}</td>
                                    {/* <div> Sales {x.totalValue} </div> */}
                                    {/* <div> Sales { Number.parseFloat( x.totalValue/saleSum*100 ).toFixed(2)} % </div> */}
                                </tr>
                            })}
                        </table>

                        <div className="mx-2 px-2 py-2 bg-info" id="info">{label}</div>
                        <div className="mt-4 ">
                            {sale.map(x=> {
                                if(x.location !== 0){
                                    return <div className="mx-2 px-2 mt-4  bg-info" style={{ opacity: 1}}>
                                        <div>
                                            <div> Rank {x.id}</div>
                                            {/* <div>  {x.name}</div> */}
                                            <div> Order {x.totalOrder}</div>
                                            <div> Sales {x.totalValue} </div>
                                            <div> Sales { Number.parseFloat( x.totalValue/saleSum*100 ).toFixed(2)} % </div>
                                            <div> LocationId {x.location}</div>
                                        </div>
                                    </div>
                                }else{
                                    return <div className="mx-2 px-2 mt-4  bg-info" style={{ opacity: 0.01}}>
                                    <div >
                                        <div> Rank </div>
                                        {/* <div>  {x.name}</div> */}
                                        <div> Order </div>
                                        <div> Sales  </div>
                                        <div> Sales  % </div>
                                        <div> LocationId </div>
                                    </div>
                                </div>
                                }
                            } )}
                        </div>
        
                        </div>
                        <div className="col-8">
                            <svg width={svgX} height={svgY} id="map-container" onClick={()=>{setSaleUI()}} ref={ref} />
                        </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </div>

    </>
}