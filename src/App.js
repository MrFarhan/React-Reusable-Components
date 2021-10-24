import React from "react";
import "./App.css";
import CopyTextButton from "./components/CopyTextButton";
import StarRating from "./components/StarRating";
import TextInput from "./components/TextInput";
import Textarea from "./components/Textarea";
import Loader from "./components/Loader";
import FileUpload from "./components/FileUpload";
import Modal from "./components/Modal";

function App() {
  const code = "Copy Text / Code Button";
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="App">
      <div style={{ width: "300px", height: "100px" }}>
        Copy Button
        <CopyTextButton title="Button Text" code={code} />
      </div>
      <div style={{ width: "300px", height: "100px" }}>
        Button Component
        <StarRating itemRating={3} />
      </div>
      <div style={{ width: "300px" }}>
        Input Components
        <TextInput
          type="date"
          title="Button Text"
          onChange={(e) => console.log("Selected date is ", e)}
        />
        <TextInput type="text" title="Button Text" placeHolder="Text Input" />
        <TextInput
          type="number"
          title="Button Text"
          placeHolder="Number Input"
        />
        <Textarea title="Button Text" />
        <FileUpload title="Button Text" />
      </div>
      <span onClick={() => setShowDetails(true)}>Click to show modal</span>
      {showDetails && (
        <Modal
          onClose={() => setShowDetails(false)}
          child={"hello world"}
          showCloseBtn
          height="440px"
          width="650px"
        />
      )}
      <div style={{ width: "300px", height: "200px" }}>
        Loader Component
        <div style={{ display: "flex" }}>
          <Loader />
          <Loader type="spin" />{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
