import { useEffect, useState } from "react";
import BackOffice from "../../components/BackOffice";
import axios from "axios";
import config from "../../config";
import dayjs from "dayjs";
import Modal from "../../components/Modal";
import Swal from "sweetalert2";

export default function Order(){
    const [billsale,setBillSale] = useState();
    const [billSaleDetail,setBillSaleDetail] = useState();
    const [sum,setSum] = useState(0);
    useEffect(() => {fetchData()},[])

    const fetchData = async () =>{
        try {
            const res = await axios.get(config.apiPath+'/sale/order')
            if(res.data){
                setBillSale(res.data.result)
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

    const viewDetail = async (id) => {
        try {
            const res = await axios.get(config.apiPath+'/sale/order/'+id)
            if(res.data){
                console.log(res.data.result)
                setBillSaleDetail(res.data.result)
                let sum = 0;
                res.data.result.forEach(x => { sum += x.price});
                setSum(sum);
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

    async function updateStatus(id,status){
        let res;
        try {     
            const btn = await Swal.fire({
                text: `Confirm ${status}`,
                title: `${status} ?` ,
                icon: status === 'Pay' ? "info": status === 'In Transit'? "question": 'error',
                showConfirmButton: true,
                showCancelButton: true
            })

            if( btn.isConfirmed){

                if(status === 'Pay'){
                    res = await axios.get(config.apiPath + '/sale/orderUpdateStatusPay/'+ id,config.headers())
                }
                else if(status === 'In Transit'){
                    res = await axios.get(config.apiPath + '/sale/orderUpdateStatusInTransit/'+ id,config.headers())
                }
                else if(status === 'Cancel'){
                    res = await axios.get(config.apiPath + '/sale/orderUpdateStatusCancel/'+ id,config.headers())
                }
                
                if(res.data.message === 'success'){
                    Swal.fire({
                        text: "Update Status Success",
                        title: `Status ${status}` ,
                        icon: "success",
                    })
                    fetchData();
                    console.log(res.data)
                }
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

    function displayStatus(text){
        let color = ''
        if(text === 'wait'){ color = 'badge bg-dark' }
        if(text === 'Pay'){ color = 'badge bg-warning' }
        if(text === 'In Transit'){ color = 'badge bg-success' }
        if(text === 'Cancel'){ color = 'badge bg-danger' }
        return <div className={`${color}`}>{text}</div>
    }

    return <BackOffice>
        Sale Orders

        <table className="table table-striped mt-2">
            <thead className="thead-dark">
                <tr>
                    <th> Customer Name </th>
                    <th> Customer Phone </th>
                    <th> Address </th>
                    <th> Pay Date </th>
                    <th> Pay Time </th>
                    <th> Status </th>
                    <th> Action </th>
                </tr>
            </thead>
            <tbody>
                {billsale? billsale.map( (x) =>{
                    return <tr>
                        <td  className="align-middle" >{x.id} {x.customerName}</td> 
                        <td  className="align-middle" >{x.customerPhone}</td>
                        <td  className="align-middle" >{x.address}</td>
                        <td  className="align-middle" >{dayjs(x.payDate).format('DD/MM/YYYY')}</td>
                        <td  className="align-middle" >{x.payTime} </td>
                        <td  className="align-middle" >{displayStatus(x.status)}</td>
                        <td className="row">
                            <div className="orderBtn">
                                <button 
                                    data-toggle="modal" data-target="#modalOrderDetail" 
                                    onClick={(e)=>{viewDetail(x.id)}}
                                    className="btn btn-info"
                                >
                                <i className="fa fa-list mr-2"></i>
                                    view
                                </button>
                            </div>

                            <div className="orderBtn">
                                <button 
                                    onClick={(e)=>{updateStatus(x.id,'Pay')}}
                                    className="btn btn-warning"
                                >
                                <i className="fa fa-check mr-2"></i>
                                    Pay
                                </button>
                            </div>

                            <div className="orderBtn">
                                <button 
                                    onClick={(e)=>{updateStatus(x.id,'In Transit')}}
                                    className="btn btn-success"
                                >
                                <i className="fa fa-truck mr-2"></i>
                                    In Transit
                                </button>
                            </div>

                            <div className="orderBtn">
                                <button 
                                    onClick={(e)=>{updateStatus(x.id,'Cancel')}}
                                    className="btn btn-danger"
                                >
                                <i className="fa fa-times mr-2"></i>
                                    Cancel
                                </button>
                            </div>

                        </td>
                    </tr>
                }):
                <div className="text-center">
                    No Data
                </div>
                }
            </tbody>
        </table>

        <Modal id="modalOrderDetail" title="Order Detail">

            <table className="table table-striped mt-2">
                <thead className="thead-dark">
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th> Price </th>
                        <th> QTY </th>

                    </tr>
                </thead>
                <tbody>
                    {billSaleDetail? billSaleDetail.map( (x) =>{
                        return <tr>
                            <td>{x.id}</td> 
                            <td>{x.Product.name}</td>
                            <td>{x.price}</td>
                            <td> 1 </td>
                        </tr>
                    }):
                    <div className="text-center">
                        No Data
                    </div>
                    }
                    <tr>
                        <td colSpan={4} className="bg-black font-weight-bold text-center"> Total Sum {sum} THB </td> 
                    </tr>
                </tbody>
            </table>

           

        </Modal>
    </BackOffice>
}