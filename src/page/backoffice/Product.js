import axios from "axios";
import BackOffice from "../../components/BackOffice";
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import config from "../../config";
import Swal from "sweetalert2";

function Product(){
    const [product,setProduct] = useState({});
    const [productList,setProductList] = useState([]);

    useEffect(()=>{fetchData()},[])

    async function fetchData(){
        try {
            const res = await axios.get(config.apiPath+"/product/list",config.headers())
            
            if(res.status === 200){
                setProductList(res.data.result)
            }
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error"
            })
        }
    }

    async function handelSave(){
        try {
            product.img = "";
            product.cost = parseFloat(product.cost);
            product.price = parseFloat(product.price);
            const res = await axios.post(config.apiPath+"/product/create", product, config.headers())
            if(res.data.message ==="success"){
                Swal.fire({
                    title: "succes",
                    text: res.data.status,
                    icon: "success",
                    timer: 1000
                })
            }
            
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error"
            })
        }

    }

    function clearForm(){
        setProduct({
            name: "",
            price: "",
            cost: "",
            image: ""
        })
    }

    return <BackOffice>
        <div className="h4">Product</div>
        
        <button className="btn btn-primary" onClick={clearForm} data-toggle="modal" data-target="#modalProduct">
            <i className="fa fa-plus"></i> Add Product
        </button>

        <table width={"100%"} className="mt-2 table table-border table-striped">
            <thead>
                <tr>
                    <td className="text-center">Item</td>
                    <td className="text-center">Name</td>
                    <td className="text-center">Price</td>
                    <td className="text-center">Cost</td>
                    <td className="text-center">Action</td>
                </tr>
            </thead>
            <tbody>
                {productList.length >0 ? productList.map((x,i)=>
                        <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-center">{x.name}</td>
                            <td className="text-right">{x.price}</td>
                            <td className="text-right">{x.cost}</td>
                            <td className="text-center">
                                <button className="btn btn-warning"><i className="fa fa-edit"></i></button>
                                <button className="btn btn-danger"><i className="fa fa-times"></i></button>
                            </td>
                        </tr>
                ) : <></>}
            </tbody>
        </table>
        <Modal id="modalProduct" title="Product">
            <div className="mt-3">
                <div>Name</div>
                <input value={product.name} className="form-control" onChange={(e)=>{setProduct({...product, name: e.target.value})}}/>
            </div>
            <div className="mt-3">
                <div>Cost</div>
                <input value={product.cost} className="form-control" onChange={(e)=>{setProduct({...product, cost: e.target.value})}}/>
            </div>
            <div className="mt-3">
                <div>Price</div>
                <input value={product.price} className="form-control" onChange={(e)=>{setProduct({...product, price: e.target.value})}}/>
            </div>
            <div className="mt-3">
                <div>Image</div>
                <input value={product.image} className="form-control" type="file"/>
            </div>

            <div className="modal-footer">

                <button type="button" className="btn btn-primary" onClick={handelSave}>Save changes</button>
            </div>
        </Modal>
    </BackOffice>

}

export default Product;