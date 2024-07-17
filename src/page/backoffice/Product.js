import BackOffice from "../../components/BackOffice";
import Modal from "../../components/Modal";

function Product(){
    return <BackOffice>
        <div className="h4">Product</div>
        
        <button className="btn btn-primary" data-toggle="modal" data-target="#modalProduct">
            <i className="fa fa-plus"></i> Add Product
        </button>
        <Modal id="modalProduct" title="Product"></Modal>
    </BackOffice>

}

export default Product;