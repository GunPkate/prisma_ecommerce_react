import Navbar from "../../src/components/Navbar"
import Footer from "../../src/components/Footer"
import Sidebar from "../../src/components/Sidebar"
import ControlSideBar from "../../src/components/ControlSideBar"

export default function BackOffice(props) {
    return <>
        <div className="wrapper">
            <Navbar/>
            <Sidebar/>
                <div className="wrapper-content">
                    {props.children}
                </div>
            <Footer/>
            <ControlSideBar/>
        </div>
    </>
}