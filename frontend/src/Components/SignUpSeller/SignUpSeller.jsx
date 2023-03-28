import { useState } from "react";
import axios from "axios";
import SignupImg from "./Assets/Signup.jpg";
import "./SignUpSeller.css";

function SignUpSeller() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    isSeller: true,
    isRetailer: false,
  });

  function validateMobileNumber(mobileNumber) {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobileNumber);
  }

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";
    if (name === "email") {
      // check if email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Please enter a valid email address";
      }
    } else if (name === "mobile") {
      // check if mobile number is valid
      if (!validateMobileNumber(value)) {
        errorMessage = "Please enter a valid mobile number";
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setError(errorMessage);
  };

  return (
    <>
      <section className="Signup" style={{ backgroundColor: "#b1eef1" }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div
                    className="col-12"
                    style={{
                      backgroundColor: `#b1eef1`,
                      height: "5vh",
                      width: "100vw",
                    }}
                  ></div>
                  <div
                    className="col-md-6 col-lg-5 d-none d-md-block"
                    style={{ backgroundColor: `#74a3c6` }}
                  >
                    <img
                      src={SignupImg}
                      alt="signup form"
                      className="img-fluid"
                      style={{ borderRadius: "0 0 0 0", paddingTop: "180px" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body pt-40 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0 text-left">
                            Welcome to Moo-Magic!
                          </span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Create your Seller account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Full Name"
                            className="form-control form-control-lg"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="name">
                            Name
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="form-control form-control-lg"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                          {error && (
                            <div className="invalid-feedback">{error}</div>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            className="form-control form-control-lg"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            placeholder="Enter Mobile Number"
                            className="form-control form-control-lg"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="mobile">
                            Mobile Number
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-custom btn-lg btn-block"
                            type="submit"
                            style={{ width: "40%" }}
                          >
                            Sign Up
                          </button>
                        </div>

                        {error && (
                          <div className="alert alert-danger">{error}</div>
                        )}

                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Already have an account?{" "}
                          <a href="/SignIn" style={{ color: "#393f81" }}>
                            Login here
                          </a>
                        </p>
                        <a href="#!" class="small text-muted">
                          Terms of use.
                        </a>
                        <a href="/Privacy" class="small text-muted">
                          {" "}
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUpSeller;
