
import Link from "next/link";

const NotConnected = () => {


  return (
    <>

      <div className="container text-center">
        <div className="row justify-center">
          <div className="sm:col-10 md:col-8 lg:col-6">

            <h1 className="h2 mb-4">Page Not Available</h1>
            <div className="content">
              <p>
                We're sorry, but it seems like the page you are looking for is
                temporarily unavailable.
              </p>
              <p>
                <strong>
                  To access this page, you need to connect to a wallet first.
                </strong>{" "} 
                {/* <br /> */}
                {/* If you haven't connected to a wallet yet, please do so to proceed.
                Once connected, you can access the content on this page. */}
              </p>
            </div>
            {/* <Link href="/" className="btn btn-primary mt-8">
              Back to Home
            </Link> */}
          </div>
        </div>
      </div>


    </>
  );
};

export default NotConnected;
