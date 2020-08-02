import React from 'react';
import './signin.css';
import {connect} from 'react-redux';
import {loadUser, routeChange} from '../../redux/reducers/user.actions';

class SignIn extends React.Component{
constructor(props){
  super(props);
  this.state = {
    signInEmail: '',
    signInPassword: ''
  }
}
  onEmailChange = (event) => {
    this.setState({
      signInEmail: event.target.value
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      signInPassword: event.target.value
    })
  }

  onSubmitSignIn = () => {

const {loadUser, routeChange, onRouteChange, route} = this.props;
    fetch('https://hidden-brook-39740.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id){
        loadUser(user);
        routeChange('home');

        onRouteChange('home');
        let routed = route;
        console.log(routed);
      }
    })
  }


  render(){
    const {routeChange} = this.props;
    return (
      <div>
        <article className ="br3 shadow-4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
          <main className ="pa4 black-80">
            <div className ="measure">
              <fieldset id="sign_up" className ="ba b--transparent ph0 mh0">
                <legend className ="f1 fw6 ph0 mh0">Sign In</legend>
                <div className ="mt3">
                  <label className ="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input onChange = {this.onEmailChange} className ="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                </div>
                <div className ="mv3">
                  <label  className ="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input onChange = {this.onPasswordChange} className ="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                </div>

              </fieldset>
              <div className ="">
                <input
                  onClick={this.onSubmitSignIn}
                  className ="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
              </div>
              <div className ="lh-copy mt3">
                <p onClick={() => routeChange('register')} className ="f6 link dim black db">Register</p>

              </div>
            </div>
          </main>
        </article>
      </div>
    )
  }

}

const mapStateToProps = state => ({
route: state.user.route
})

const mapDispatchToProps = dispatch => ({
  loadUser: user => dispatch(loadUser(user)),
  routeChange: route => dispatch(routeChange(route))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
