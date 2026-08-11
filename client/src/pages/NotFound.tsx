import { useNavigate } from 'react-router-dom';

function NotFound() {
    const Navigate = useNavigate()

    return (
        <>
        <section>
      <div className="container d-flex justify-content-center align-items-center flex-wrap">
        <div className="my-4" style={{ borderRadius: "25px" }}>
          <div className="p-md-5 row justify-content-center">
            <div className="col-md-10 col-lg-6 col-12 d-flex flex-column align-items-center">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Page Not Found
              </p>
              <h5 className="my-2">Maybe the Link is broken or something went wrong</h5>
            <button onClick={()=>Navigate('/')} className="my-2 btn btn-dark">Return to Home Page</button>
            
            </div>
            <div className="col-md-10 col-lg-6 col-12 d-flex align-items-center">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-3702359-3119148.png"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
     </> );
}

export default NotFound;