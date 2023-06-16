import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";

const Home = () => {
  const navigate = useNavigate();
  const [loadData, setLoadData] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    setTimeout(() => {
      const verifyCookie = async () => {
        if (!cookies.token) {
          navigate("/login");
        }
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        setLoadData(true);
        return status
          ? toast(`Hello ${user}`, {
              position: "top-right",
            })
          : (removeCookie("token"), navigate("/login"));
      };
      verifyCookie();
    }, 2000);
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      {!loadData ? (
        <ReactLoading
          type="spinningBubbles"
          color="#090580"
          height={100}
          width={100}
        />
      ) : (
        <>
          <div className="home_page">
            <h4>
              {" "}
              Welcome <span>{username}</span>
            </h4>
            <button onClick={Logout}>LOGOUT</button>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default Home;
