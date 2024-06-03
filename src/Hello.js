import { useState } from "react"

export default function Hello(){

    const [product, setProduct] = useState(['Java','PHP','C#']);
    // const changeName = () =>{
    //     setProduct("GunP")
    // }
    return <>
        {product.map(x=>
        <>
            <div><i className="fa fa-home"/></div>
            <div> name {x} </div>
        </>
        )}
        {/* <button onClick={()=>{changeName()}}>Name</button> */}
    </>
}