import React from "react";
import "./App.css";
import Card from "./Components/Card";

function App() {
  return (
    <div className="App">
      <Card className="border-2 h-full min-h-32 w-3/4 flex justify-center items-end m-auto pb-2">
        <div className="relative w-full p-4">
          <textarea
            placeholder="write a message..."
            rows={5}
            cols={10}
            className="font-mono resize-none bg-gray-100 outline-none w-full p-4 pr-10 border rounded-2xl"
          />
          <i className="absolute bottom-10 right-12 text-xl text-gray-500">
            hi
          </i>
        </div>
      </Card>
    </div>
  );
}

export default App;
