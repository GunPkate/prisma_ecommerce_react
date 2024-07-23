import { useEffect, useState } from "react";
import BackOffice from "../../components/BackOffice";
import axios from "axios";
import config from "../../config";
import dayjs from "dayjs";

export default function Order(){
    const [billsale,setBillSale] = useState();
    useEffect(() => {fetchData()},[])

    const fetchData = async () =>{
        const res = await axios.get(config.apiPath+'/sale/order')
        if(res.data){
            setBillSale(res.data.result)
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
                        <td><i className="fa fa-box"></i></td>
                    </tr>
                }):
                <div className="text-center">
                    No Data
                </div>
                }
            </tbody>
        </table>
    </BackOffice>
}