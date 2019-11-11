import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {FetchService} from '../helpers/fetch/services/service';
import createHistory from "history/createBrowserHistory"
import './css/login.css';
import {uRouteNtoE} from '../helpers/fetch/urlConstants';
const history = createHistory()
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: '',
                   password: '',
                   tempToken:'',
                   wotOption:'N',
                  
                   errorMsg:''};

    this.baseState = this.state
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitFormHandler = this.submitFormHandler.bind(this);
    this.resetFormHandler = this.resetFormHandler.bind(this);
    this.wotOptionHandler = this.wotOptionHandler.bind(this);
    this.fetchServiceHandler = new FetchService();
  }

  usernameChangeHandler(event) {
    this.setState({userId: event.target.value});
  }
  passwordChangeHandler(event) {
    this.setState({password: event.target.value});
  }
  wotOptionHandler(event) {
    this.setState({wotOption: event.target.value});
  }
  submitFormHandler(event) {
    event.preventDefault();
    if(this.state.userId ==='' || this.state.password===''){
      return;
    }
    let user = {
      user:  this.state.userId,
      pass: this.state.password,
  };
 
  
  this.fetchServiceHandler.getWorkOrderLoginService(user).then(response => response.data)
  .then(token=>{
   
    if(token==='fail'){
      alert("Login failed");
      history.push("/login");
      history.go();
      return;
    }
       localStorage.setItem('user', token);
       localStorage.setItem('admin', token);
       history.push("/order");
       history.go();
      
    
   });
}

resetFormHandler(event) {
    this.setState(this.baseState);
  }

  render() {
    return (
      <div className='app'>
     <div className="login">
      <div id="login_contents">
      <div class="row">
        <div class="col">
          <div className="container">
          <label >{this.errorMsg} </label><br/>
          <label  class="loginlbl" > Login Information</label>
            <div className="form-group">
              <form>
              <table id="loginTable">
              
                <tr>
                  <td><label id="username_label" >User Name  </label></td>
                  <td>:</td>
                  <td>  <input type="text"  id="input_username" placeholder="user" className="lognInput"
                      value={this.state.userId}
                      onChange={this.usernameChangeHandler}/></td>
                </tr>
                <tr>
                  <td>  <label id="pswd_label">Password  </label></td>
                  <td>:</td>
                  <td>  <input type="password"  id="input_pswd" placeholder="Password" className="lognInput"
                    value={this.state.password}
                      onChange={this.passwordChangeHandler}/></td>
                      <br/>
                </tr>
                </table>
               <div>&nbsp;</div>
                <button type="submit" id="login_btn" onClick={this.submitFormHandler} >Login</button>
                <button type="reset" id="clear_btn" onClick={this.resetFormHandler}>Clear</button>
              </form>
              </div>
          </div>
        </div>
        
      </div>
      </div>
    </div>
    </div>
    );
  }
}

export default Login;
