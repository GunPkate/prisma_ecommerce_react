import axios from "axios";
import BackOffice from "../../components/BackOffice";
import Modal from "../../components/Modal";
import { useEffect, useRef, useState } from "react";
import config from "../../config";
import Swal from "sweetalert2";

function Product(){
    const [product,setProduct] = useState({});
    const [productList,setProductList] = useState([]);
    const [img,setImg] = useState();
    const refImg = useRef();
    const refExcel = useRef();
    const [fileExcel,setFileExcel] = useState();

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
            let res;
            product.img = await handleUpload();
            product.cost = parseFloat(product.cost);
            product.price = parseFloat(product.price);
            if(product.id === undefined){
                res = await axios.post(config.apiPath+"/product/create", product, config.headers())
            }else{
                res = await axios.post(config.apiPath+"/product/update", product, config.headers())
            }
            if(res.data.message ==="success"){
                Swal.fire({
                    title: "succes",
                    text: res.data.status,
                    icon: "success",
                    timer: 1000
                })
            }
            setProduct({})
            fetchData();
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error"
            })
        }

    }

    async function handleRemove(item){
        try{
            const button = await Swal.fire({
                text: "Remove Item",
                title:"Remove",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true
            })

            if(button.isConfirmed){
                const url = config.apiPath+"/product/remove/"+item.id
                const res = await axios.delete(url, config.headers())
                if(res.status === 200){
                    Swal.fire({
                        text: "Remove Success",
                        title:"Remove",
                        icon: "success",
                    })
                }

                fetchData();
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
            img: ""
        })
        setImg();
        refImg.current.value = '';
    }

    function clearFormExecl(){
        refExcel.current.value = '';
        setFileExcel();
    }

    function selectedFile(file){
        if(file !== undefined){
            if(file.length > 0){
                setImg(file[0])
            }
        }
    }

    async function handleUpload(){
        try {
            const formData = new FormData()
            formData.append('img',img)
            const res = await axios.post(config.apiPath+'/product/upload',formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    'Authorization': localStorage.getItem('token')
                }
            });
            if(res.data.newName !== undefined){
                return res.data.newName;
            }
            
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error"
            })
            return "";
        }
    }

    function selectedFileExcel(file){
        if(file !== undefined){
            if(file.length > 0){
                setFileExcel(file[0])
            }
        }
    }

    async function handleUploadExcel (){
        try {
            const formData = new FormData();
            formData.append('fileExcel',fileExcel);
            const res = await axios.post(config.apiPath+'/product/uploadExcel', formData,{
                headers: {
                    "Content-Type": 'multipart/form-data',
                    'Authorization': localStorage.getItem('token')
                }
            })

            if(res.data.message === 'success'){
                Swal.fire({
                    text: "Import Success",
                    title:"Excel Import",
                    icon: "success",
                })

                fetchData();

            }

   
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error"
            })
            return "";
        }
    }

    return <BackOffice>
        <div className="h4">Product</div>
        
        <button className="btn btn-primary" onClick={clearForm} data-toggle="modal" data-target="#modalProduct">
            <i className="fa fa-plus"></i> Add Product
        </button>
        <button className="ml-4 btn btn-success" onClick={clearFormExecl} data-toggle="modal" data-target="#modalExcel">
            <i className="fa fa-plus"></i> Import Excel
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
                            <td className="text-center">
                                {x.img?
                                    <img className="img-fluid" alt="product" style={{maxWidth:"500px"}} src={ config.apiPath+'/uploads/'+x.img }/>
                                    :<></>
                                }
                            </td>
                            <td className="text-center">{x.name}</td>
                            <td className="text-right">{x.price}</td>
                            <td className="text-right">{x.cost}</td>
                            <td className="text-center">
                                <button className="btn btn-warning" 
                                    data-toggle="modal"
                                    data-target="#modalProduct"
                                    onClick={(e)=>{setProduct(x)}}
                                >
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button className="btn btn-danger" onClick={(e)=>{handleRemove(x)}}><i className="fa fa-times"></i></button>
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
                <input ref={refImg} className="form-control" type="file" onChange={e => selectedFile(e.target.files)}/>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handelSave}>Save changes</button>
            </div>
        </Modal>

        <Modal id="modalExcel" title="Excel">
            <div>
                <div>Select File</div>
                <input className="form-control" type="file" ref={refExcel} onChange={e => selectedFileExcel(e.target.files)}/>  
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleUploadExcel}>Import Excel</button>
            </div>
        </Modal>
    </BackOffice>

}

export default Product;