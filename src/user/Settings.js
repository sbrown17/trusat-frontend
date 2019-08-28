import React, { useState } from "react";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";

export default function AccountDetails() {
  const { isAuth, authType, jwt, address, burner } = useAuthState();
  const [username, setUsername] = useState("BobTheCryptoNoob");
  const [email, setEmail] = useState("bobthecryptonoob@gmail.com");
  const [bio, setBio] = useState("yada yada yada Im amazing");
  const [location, setLocation] = useState("Brooklyn, NY");

  const submitEdit = () => {
    axios
      .post(
        `https://api.consensys.space:8080/editProfile`,
        JSON.stringify({
          jwt: jwt,
          address: address,
          username: "bob the crypto noob",
          email: email,
          bio: bio,
          location: location,
          // TODO - check if this boolean key makes sense with Kenan
          // privacy by default? What can we expose and not expose in a private profile?
          public: false
        })
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  const burnWallet = () => {
    localStorage.clear();
    window.location.reload();
  };

  const exportWallet = () => {
    alert(`
Copy your private key: 

${burner.signingKey.privateKey}

and follow instructions to import into MetaMask
    `);
  };

  const renderBurnerOptions = () => {
    return (
      <React.Fragment>
        <button
          style={{
            border: "1px solid black",
            display: "inline-block",
            margin: "1em",
            padding: "1em"
          }}
          onClick={burnWallet}
        >
          BURN WALLET
        </button>
        <button
          style={{
            border: "1px solid black",
            display: "inline-block",
            margin: "1em",
            padding: "1em"
          }}
          onClick={exportWallet}
        >
          EXPORT WALLET
        </button>
      </React.Fragment>
    );
  };

  return (
    <section>
      <React.Fragment>
        <section style={{ border: "1px solid white", margin: "1em" }}>
          <h1>Account Settings</h1>
          <div style={{ margin: "1em" }}>
            Username <button onClick={() => submitEdit()}>change</button>
            <p>{username}</p>
          </div>
          <label style={{ margin: "1em" }}>
            ETH address
            <p>{address}</p>
          </label>
          <div style={{ margin: "1em" }}>
            Email <button>change</button>
            <p>email here...</p>
          </div>
          <div style={{ margin: "1em" }}>
            Location <button>change</button>
            <p>{location}</p>
          </div>
          <div style={{ margin: "1em" }}>
            Bio <button>change</button>
            <p>{bio}</p>
          </div>
        </section>

        <section style={{ border: "1px solid white", margin: "1em" }}>
          <p>[Note to prompt user to go the full MetaMask route]</p>

          {authType === "burner" ? renderBurnerOptions() : null}

          <span>Get MetaMask</span>
        </section>

        <section style={{ border: "1px solid white", margin: "1em" }}>
          Got more than one station?
          <a>Email us</a> and we'll combine into one account
        </section>
      </React.Fragment>
    </section>
  );
}
