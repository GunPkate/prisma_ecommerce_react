import Navbar from "../../src/components/Navbar"
import Footer from "../../src/components/Footer"
import Sidebar from "../../src/components/Sidebar"
import ControlSideBar from "../../src/components/ControlSideBar"

export default function BackOffice(props) {
    return <>
        <div className="wrapper">
            <Navbar/>
            <Sidebar/>
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                                {props.children}

                    </div>
                </div>
            </div>
            <Footer/>
            <ControlSideBar/>
        </div>
    </>
}