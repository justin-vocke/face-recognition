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
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '53ebbb3ed49c49619e8b5faa03339cac'
});
const particlesOptions={
  particles: {
    number:{
      value:30,
      density:{
        enable:true,
        value_area:800
      }
    }

  }
}
class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation= (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width , height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box});
  }

  onInputChange=(event)=>{
    this.setState({
      input:event.target.value
    })
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl:this.state.input
    });

    app.models.predict(Clarifai.FACE_DETECT_MODEL,
       this.state.input)
       .then(response=> this.displayFaceBox(this.calculateFaceLocation(response)))
       .catch(err=>console.log(err));

  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({
        isSignedIn: false
      })
    } else if (route === 'home'){
      this.setState({
        isSignedIn: true
      })
    }
    this.setState({
      route: route
    })
  }

  render(){

    const {isSignedIn, box, imageUrl , route } = this.state;
    return (
      <div className="App">
      <Particles className="particles"
        params={particlesOptions}
      />

      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
      { route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (
            route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
      }
      </div>
    );
  }


}

export default App;
