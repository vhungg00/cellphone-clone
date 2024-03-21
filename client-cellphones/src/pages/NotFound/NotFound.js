import { Link } from "react-router-dom";
import images from "~/assets/images";
import { routes } from "~/config";

const NotFound = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">Page Not Found</h4>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src={images.notFound}
            alt="Not-found"
          />
          <button className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">
            <Link to={routes.home} className="text-white text-decoration-none">
              Trang chủ
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
