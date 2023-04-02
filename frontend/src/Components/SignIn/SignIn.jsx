import { useState } from 'react';
import axios from 'axios';
import LoginImg from './Assets/Login.jpg';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', { email, password })
    .then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.acessToken);
      localStorage.setItem('userid', res.data.userid);
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <section className="Login" style={{ backgroundColor: '#b1eef1' }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="row g-0">
                  <div class="col-12" style={{ backgroundColor: `#b1eef1`, height: '5vh', width: '100vw' }}></div>
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={LoginImg}
                      padding="300px"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: '1rem 0 0 1rem', paddingTop: '100px' }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body pt-40 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                          <span className="h1 fw-bold mb-0 text-left">Welcome back!</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            placeholder='Enter email'
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => {
                              if (!validateEmail(email)) {
                                setEmailError('Please enter a valid email address.');
                              } else {
                                setEmailError('');
                              }
                            }}
                            required
                          />
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                          {emailError && (
                            <div className="text-danger">{emailError}</div>
                          )}
                        </div>


                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            placeholder='Enter password'
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-custom btn-lg btn-block" type="submit" style={{ width: '40%' }}>
                            Login
                          </button>
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                          Don't have an account? <a href="/SignUp" style={{ color: '#393f81' }}>
                            Register here
                          </a></p>
                        <a href="#!" class="small text-muted">Terms of use.</a>
                        <a href="/Privacy" class="small text-muted"> Privacy policy</a>
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

export default SignIn;
