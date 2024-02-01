import "./App.css";
import contractABI from "./abi.json";
import { useState } from "react";

const ethers = require("ethers");
const contractAddress = "0xa7B6AE7004c7Ce070D92404a9e71b51c53d87dD7";
function App() {
  const [ageInput, setAgeInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getContractEntity() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const message = await contract.getEntityDetails();

        // alert the message
        console.log(message);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  const modifyName = async () => {
    if (!nameInput) return;

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const txn = await contract.updateName(nameInput);
        await txn.wait();
        console.log("New Name Set!");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };
  const modifyAge = async () => {
    if (!ageInput) return;

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const txn = await contract.updateAge(ageInput);
        await txn.wait();
        console.log("New Age Set!");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Simple Registry</h1>
        <p>Simple Registry</p>
      </div>
      <div>
        <h2>View Details</h2>
        <button onClick={getContractEntity}>Read User Registry</button>
      </div>
      <hr />
      <div>
        <h2>Set Details</h2>
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(event) => setNameInput(event.target.value)}
          />
        </div>
        <button onClick={modifyName}>Modify Name Record</button>

        <div>
          <input
            type="text"
            placeholder="Enter your Age"
            onChange={(event) => setAgeInput(event.target.value)}
          />
        </div>
        <button onClick={modifyAge}>Modify Age Record</button>
      </div>
    </div>
  );
}

export default App;
