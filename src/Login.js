import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './App.css'
import Axios from 'axios';
import Navbar from './Navbar';

const api_url = "http://localhost:8080/"
var datap

async function getapi(api_url) {
    const response = await fetch(api_url)
    var data = await response.json()
    showdata(data)
}

function showdata(data) {
    console.log(data.data)
    datap = data.username
}

getapi(api_url)

function Login() {
    let navigate = useNavigate()

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [usernameLogin, setUsernameLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const register = () => {
        Axios.post(api_url + "register", {
            username: usernameReg,
            password: passwordReg
        }).then((response) => {
            console.log(response)
        })
    }

    const login = () => {
        Axios.post(api_url + "login", {
            username: usernameLogin,
            password: passwordLogin
        }).then((response) => {
            if (response.data.count == 0) {
                alert("no use found")
            }
            if (response.data.count == 1) {
                navigate('/main')
            }
        })
    }

    return (

        // <main class="form-signin w-100 m-auto">
        //     <form>
        //         <img class="mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
        //         <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        //         <div class="form-floating">
        //         <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        //         <label for="floatingInput">Email address</label>
        //         </div>
        //         <div class="form-floating">
        //         <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        //         <label for="floatingPassword">Password</label>
        //         </div>

        //         <div class="checkbox mb-3">
        //         <label>
        //             <input type="checkbox" value="remember-me"> Remember me
        //         </label>
        //         </div>
        //         <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        //         <p class="mt-5 mb-3 text-muted">© 2017–2022</p>
        //     </form>
        // </main>

        <div className='form-signin w-50 m-auto'>
            <Navbar />
            <h1 className='h4 mt-2 mb-2'>Login</h1>

            <div class="form-floating">
                <input class="form-control" id="floatingUL" type="text" value={usernameLogin} placeholder="enter text" onChange={(e) => setUsernameLogin(e.target.value)} ></input>
                <label for="floatingUL">username</label>
            </div>

            <br />

            <div class="form-floating">
                <input class="form-control" id="floatingPL" type="password" value={passwordLogin} placeholder="enter text" onChange={(e) => setPasswordLogin(e.target.value)}></input>
                <label for="floatingPL">password</label>
            </div>

            <br/>

            <button class="w-100 btn btn-lg btn-primary" onClick={(login)}>login</button>

            <br /><br /><br />

            <h1 className='h4 mt-2 mb-2'>Register</h1>

            <div class="form-floating">
                <input class="form-control" id="floatingUR" type="text" value={usernameReg} placeholder="enter text" onChange={(e) => setUsernameReg(e.target.value)} ></input>
                <label for="floatingUR">username</label>
            </div>

            <br />

            <div class="form-floating">
                <input class="form-control" id="floatingPR" type="password" value={passwordReg} placeholder="enter text" onChange={(e) => setPasswordReg(e.target.value)}></input>
                <label for="floatingPR">password</label>
            </div>

            <br />

            <button class="w-100 btn btn-lg btn-success" onClick={(register)}>register</button>
        </div>

    );
}

export default Login;