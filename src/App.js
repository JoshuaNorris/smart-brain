import React, { useState, useEffect } from "react";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import ParticlesBg from 'particles-bg'


function App() {

  const [input, setInput] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  // route keeps track of where we are on the page
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    });
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : clarifaiFace.left_col.toFixed(3) * width,
      topRow : clarifaiFace.top_row.toFixed(3) * height,
      rightCol : width - (clarifaiFace.right_col.toFixed(3) * width),
      bottomRow : height - (clarifaiFace.bottom_row.toFixed(3) * height),
    }
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = (event) => {
    setBox({});
    setImageURL(input);
    getAPI(input);
  }

  const onRouteChange = (route) => {
    if (route === 'signin') { setIsSignedIn(false) }
    else if (route === 'home') {setIsSignedIn(true)} 
    setRoute(route);
  }


  const getAPI = (imageURL) => {

    const PAT = 'e53f23ed7b07471caf0bec6692c20a1d';
    const USER_ID = 'norris52';       
    const APP_ID = 'smart-brain';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageURL;
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => { 
      if (result) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            setUser({
              id: user.id,
              name: user.name,
              email: user.email,
              entries: count,
              joined: user.joined
            })
          })
      }
      const box = calculateFaceLocation(result);
      displayFaceBox(box);
    })
    .catch(error => console.log('error', error));
  }
  return (
    <div className="App">
      {/* <ParticlesBg color="#ffffff" type="cobweb" bg={true} /> */}
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
      { route === 'home'
        ? <div> 
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputChange={onInputChange}
                          onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition imageURL={imageURL} box={box}/>
          </div>
        : route === 'signin'
          ? <Signin onRouteChange={onRouteChange} loadUser={loadUser}/> 
          : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
      }
    </div>
  );
}
///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

export default App;