import Navbar from "../Components/NavBar";
import Routing from "../Router/router";

function Index() {
    return ( 
    <>
      <Navbar/>
        <div style={{minHeight:'50vh'}}>
          <Routing/>
        </div>
    </> )
}

export default Index;