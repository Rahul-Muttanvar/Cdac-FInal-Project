import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const init = {
  username: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return { ...state, [action.fld]: action.value };

    case "reset":
      return init;
  }
};

const sendData = (e) => {
  e.preventDefault();
};

function Login() {
  const [info, dispatch] = useReducer(reducer, init);

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const reqOptions = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  };

  fetch("http://localhost:8080/checklogin", reqOptions)
    .then((resp) => {
      if (resp.ok) return resp.text();
      // else throw new Error("Server Error");
    })
    .then((text) => (text.length ? JSON.parse(text) : {}))
    .then((obj) => {
      if (Object.keys(obj).length === 0) {
        setMsg("Wrong Username or Password");
      } else {
        if (obj.account_status === "pending") {
          alert("Request is still pending");
        } else {
          if (obj.user_type_id.user_type_id === 1) {
            navigate("/admin_home");
          } else if (obj.user_type_id.user_type_id === 2) {
            navigate("/seller_home");
          } else if (obj.user_type_id.user_type_id === 3) {
            navigate("/bidder_home");
          }
        }
      }
    });

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet? <Link to="/Signup">Sign Up</Link>
            </div>

            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control mt-1"
                value={info.username}
                onChange={(e) => {
                  dispatch({
                    type: "update",
                    fld: "username",
                    value: e.target.value,
                  });
                }}
              />
              {/* <p
                style={{
                  display:
                    state.username.touched && state.username.hasError
                      ? "block"
                      : "none",
                  color: "red",
                }}
              >
                {state.username.error}{" "}
              </p> */}
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control mt-1"
                value={info.password}
                onChange={(e) => {
                  dispatch({
                    type: "update",
                    fld: "password",
                    value: e.target.value,
                  });
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mb-3"
              onClick={(e) => {
                sendData(e);
              }}
            >
              Submit
            </button>
            <button
              type="reset"
              className="btn btn-primary mb-3"
              onClick={(e) => {
                dispatch({ type: "reset" });
              }}
            >
              Clear
            </button>

            <p className="text-center mt-2">
              <a href="#">Forgot password?</a>
            </p>
          </div>
        </form>
        {/* <p>{JSON.stringify(info)}</p>
        <p>{msg}</p> */}
      </div>
    </>
  );
}

export default Login;