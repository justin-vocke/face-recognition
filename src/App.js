import React from 'react';

import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/signin/signin';
import Register from './components/register/register';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { loadUser, routeChange, setImageUrl, setSignInStatus, setBox, setCount } from './redux/reducers/user.actions';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }

  }
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    }
  }

  calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }



  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onButtonSubmit = () => {

    const { user, entries, imageUrl, setImageUrl, setBox, setCount } = this.props;
    setImageUrl(this.state.input);
    console.log("input wehn button is pressed it " + this.state.input);

    console.log("imgUrl is " + this.props.imageUrl)
    fetch('https://hidden-brook-39740.herokuapp.com/imageurl',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        console.log("response is " + response);
        if (response) {
          fetch('https://hidden-brook-39740.herokuapp.com/image',
            {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              setCount(count)
            })
            .catch(err => console.log('Data error'));
        }
        console.log(response);
        console.log("inside submit button");
        let boxLocations = (this.calculateFaceLocation(response));
        console.log(boxLocations);
        setBox(boxLocations);
        console.log(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));

  }

  onRouteChange = (route) => {

    const { setSignInStatus, routeChange } = this.props;
    console.log("onroutechange is called and route is " + route)
    if (route === 'signout') {
      console.log("signout is called");
      setSignInStatus(false);
    } else if (route === 'home') {
      console.log("setSignInStatus is caled");
      setSignInStatus(true);
    }
    routeChange(route);
    console.log(this.props.route);
  }


  //return values


  render() {
    console.log('app is rendered');
    const { route, isSignedIn, imageUrl, box, loadUser, routeChange, user } = this.props;

    return (
      <div className="App">
        {console.log(this.state.input)}
        <Particles className="particles"
          params={particlesOptions}
        />

        <Navigation onRouteChange={this.onRouteChange} routeChange={routeChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank name={user.name} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <SignIn onRouteChange={this.onRouteChange} />
              : (
                route === 'signout'
                  ? <SignIn onRouteChange={this.onRouteChange} />
                  : <Register loadUser={loadUser} onRouteChange={this.onRouteChange} />
              )
          )
        }
      </div>
    );
  }

}

const mapStateToProps = state => ({
  isSignedIn: state.user.isSignedIn,
  box: state.user.box,
  imageUrl: state.user.imageUrl,
  route: state.user.route,
  user: state.user.user,
  entries: state.user.user.entries
})

const mapDispatchToProps = dispatch => ({
  loadUser: user => dispatch(loadUser(user)),
  routeChange: route => dispatch(routeChange(route)),
  setImageUrl: image => dispatch(setImageUrl(image)),
  setSignInStatus: data => dispatch(setSignInStatus(data)),
  setBox: value => dispatch(setBox(value)),
  setCount: count => dispatch(setCount(count))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
