import axios from "axios";
import { useEffect, useState } from "react"
import config from "../config";
import Swal from "sweetalert2";
import { useNavigate,Link } from "react-router-dom";

export default function Sidebar(){

    useEffect(()=>{fetchData()},[])
    const [user,setUser] = useState({ name: "" });
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath+'/user/info',config.headers()) 
            if(res.data.result !== undefined){
                setUser(res.data.result);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                icon: 'error',
                text: e.message
            })
        }
    }

    const handleSignOut = async () => {
        const btnSignOut = await Swal.fire({
            title: "Sign Out",
            text: "Confirm Sign Out?",
            icon: "question",
            showConfirmButton: true,
            showCancelButton: true

        }) 
        console.log(btnSignOut)
        if(btnSignOut.isConfirmed){
            localStorage.removeItem('token');
            navigate("/");
        }
    }
    return <>

  <aside className="main-sidebar sidebar-dark-primary elevation-4">

        <a href="/home" className="brand-link">
        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: .8}}/>
        <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
                
        <div className="sidebar">

        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
            </div>
            <div className="info">
            <Link to="#" className="d-block">{user.name}</Link>
            </div>
            <button className="btn btn-danger" onClick={handleSignOut}>
                <i className="fas fa-times fa-fw"></i>
            </button>
        </div>

        
        <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
            <div className="input-group-append">
                <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw"></i>
                </button>
            </div>
            </div>
        </div>


        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
            <li className="nav-item menu-open">
                <Link to="/product" className="nav-link">
                <i className="nav-icon fas fa-box"></i>
                <p>
                    Products
                    <span className="right badge badge-danger">New</span>
                </p>
                </Link>
            </li>
            
            <li className="nav-item menu-open">
                <Link to="/order" className="nav-link">
                <i className="nav-icon fas fa-box"></i>
                <p>
                    Sale Order
                    {/* <span className="right badge badge-danger">New</span> */}
                </p>
                </Link>
            </li>

            <li className="nav-item menu-open">
                <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-box"></i>
                <p>
                    Dashboard
                </p>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-chart-pie"></i>
                <p>
                    Charts
                    <i className="right fas fa-angle-left"></i>
                </p>
                </Link>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <Link to="pages/charts/chartjs.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>ChartJS</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/charts/flot.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Flot</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/charts/inline.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Inline</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/charts/uplot.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>uPlot</p>
                    </Link>
                </li>
                </ul>
            </li>
            <li className="nav-item">
                <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-tree"></i>
                <p>
                    UI Elements
                    <i className="fas fa-angle-left right"></i>
                </p>
                </Link>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <Link to="pages/UI/general.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>General</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/UI/icons.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Icons</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/UI/buttons.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Buttons</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/UI/sliders.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Sliders</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/UI/modals.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Modals & Alerts</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/UI/navbar.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Navbar & Tabs</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/UI/timeline.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Timeline</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/UI/ribbons.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Ribbons</p>
                    </Link>
                </li>
                </ul>
            </li>
            <li className="nav-item">
                <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-edit"></i>
                <p>
                    Forms
                    <i className="fas fa-angle-left right"></i>
                </p>
                </Link>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <Link to="pages/forms/general.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>General Elements</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/forms/Linkdvanced.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Advanced Elements</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/forms/editors.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Editors</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/forms/validation.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Validation</p>
                    </Link>
                </li>
                </ul>
            </li>
            <li className="nav-item">
                <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-table"></i>
                <p>
                    Tables
                    <i className="fas fa-angle-left right"></i>
                </p>
                </Link>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <Link to="pages/tables/simple.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Simple Tables</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/tables/data.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>DataTables</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="pages/tables/jsgrid.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>jsGrid</p>
                    </Link>
                </li>
                </ul>
            </li>
           
            </ul>
        </nav>

        </div>
        
    </aside>
    </>
}