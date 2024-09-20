import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Card from "./Components/Card";

const App: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    // Automatically focus on the textarea when the component is mounted
    ref?.current?.focus();
  }, []);

  return (
    <div className="App">
      <Card className="border-2 h-full min-h-32 w-3/4 flex justify-center items-end m-auto pb-2">
        <div className="relative w-full p-4">
          <textarea
            ref={ref}
            placeholder="Write a message..."
            rows={5}
            cols={10}
            className="font-mono resize-none bg-gray-100 outline-none w-full p-4 pr-10 border rounded-2xl"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {/* Hi icon */}
          <i
            onClick={() => {
              console.log("Hi clicked"); // Debugging to check click is working
              setShowModal(true); // Show modal when hi icon is clicked
            }}
            className={`cursor-pointer absolute bottom-10 right-12 text-xl text-gray-500 transition-opacity duration-300 ${
              isFocused ? "visible" : "invisible"
            }`}
          >
            hi
          </i>
        </div>
      </Card>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)} // Close the modal when clicking outside
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside modal content
          >
            <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
            <p className="text-gray-600">This is your modal content.</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
