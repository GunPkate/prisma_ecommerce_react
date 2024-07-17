import BackOffice from "../../components/BackOffice";

function Product(){
    return <BackOffice>
        <div className="h4">Product</div>
        <button className="btn btn-primary">
            <i className="fa fa-plus"></i> Add Product
        </button>
    </BackOffice>
}

export default Product;