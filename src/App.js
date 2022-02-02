import "./App.css";
import { auth } from "./Firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import { db } from "./Firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);
  const [goal, setGoal] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      return setIsUserSignedIn(false);
    } else {
      setIsUserSignedIn(true);
    }
  });

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        console.log("Logged In Successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOutAccount = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setGoal(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(goal);

    await addDoc(collection(db, "goals"), {
      primary: { goal },
    });

    setGoal("");
  };

  if (isUserSignedIn === true) {
    return (
      <div className="App">
        <div className="App_container">
          <header className="App-button">
            <div className="image">
              <img
                className="login_img"
                src="https://i.ibb.co/CsV9RYZ/login-image.png"
              />
              <button onClick={signIn}>Sign In With Google</button>
            </div>
          </header>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <button onClick={signOutAccount}>Sign Out</button>
          </header>
          <div className="goal">
            <p className="heading">Goal</p>
          </div>
          <div className="hero_container">
            <div className="hero">
              <h1>Goal</h1>
              <p>
                Select your primary Goal. What do you wnat to accomplish in the
                next few months?
              </p>
            </div>
            <div className="radios">
              <div className="each">
                <input
                  type="radio"
                  id="leaner"
                  name="Goal"
                  value="Get leaner"
                  checked={goal === "Get leaner"}
                  onChange={handleChange}
                />
                <label htmlFor="leaner">Get leaner</label>
              </div>

              <div className="each">
                <input
                  type="radio"
                  id="active"
                  name="Goal"
                  value="Get active again"
                  checked={goal === "Get active again"}
                  onChange={handleChange}
                />
                <label htmlFor="active">Get active again</label>
              </div>

              <div className="each">
                <input
                  type="radio"
                  id="reduce"
                  name="Goal"
                  value="Reduce pain and injury"
                  checked={goal === "Reduce pain and injury"}
                  onChange={handleChange}
                />
                <label htmlFor="reduce">Reduce pain and injury</label>
              </div>

              <div className="each">
                <input
                  type="radio"
                  id="cardio"
                  name="Goal"
                  value="Improve cardio or speed"
                  checked={goal === "Improve cardio or speed"}
                  onChange={handleChange}
                />
                <label htmlFor="cardio">Improve cardio or speed</label>
              </div>

              <div className="each">
                <input
                  type="radio"
                  id="sport"
                  name="Goal"
                  value="Improve sport performance"
                  checked={goal === "Improve sport performance"}
                  onChange={handleChange}
                />
                <label htmlFor="sport">Improve sport performance</label>
              </div>
              <div className="submit_button">
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
