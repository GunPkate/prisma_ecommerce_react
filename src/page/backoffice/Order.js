import { useEffect, useState } from "react";
import BackOffice from "../../components/BackOffice";
import axios from "axios";
import config from "../../config";
import dayjs from "dayjs";
import Modal from "../../components/Modal";

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
            
        }
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
                    <th> Action </th>
                </tr>
            </thead>
            <tbody>
                {billsale? billsale.map( (x) =>{
                    return <tr>
                        <td>{x.customerName}</td> 
                        <td>{x.customerPhone}</td>
                        <td>{x.address}</td>
                        <td>{dayjs(x.payDate).format('DD/MM/YYYY')}</td>
                        <td>{x.payTime}</td>
                        <td className="row">
                            <div className="orderBtn">
                                <button 
                                    data-toggle="modal" data-target="#modalOrderDetail" 
                                    onClick={(e)=>{viewDetail(x.id)}}
                                    className="btn btn-success"
                                >
                                <i className="fa fa-box mr-2"></i>
                                    view
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