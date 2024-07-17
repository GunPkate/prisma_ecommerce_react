import Navbar from "../../src/components/Navbar"
import Footer from "../../src/components/Footer"
import Sidebar from "../../src/components/Sidebar"
import ControlSideBar from "../../src/components/ControlSideBar"

export default function BackOffice(props) {
    return <>
        <div className="wrapper">
            <Navbar/>
            <Sidebar/>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        {props.children}
                    </div>
                </div>
            </div>
            <Footer/>
            <ControlSideBar/>
        </div>
    </>
}