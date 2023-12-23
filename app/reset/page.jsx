"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";

const page = () => {
  const [username, setUsername] = useState("");
  const { push } = useRouter();
  const [isCorrect, setisCorrect] = useState("");

  const handleResetPass = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, username)
      .then((data) => {
        alert("Check your Mailbox to reset your password");
        setisCorrect("");
        push("/signin");
      })
      .catch((err) => {
        // alert("Could not send mail to reset password: ", err.code)
        setisCorrect(
          "Could not send mail to reset password, check the entered email"
        );
      });
    // console.log(username);
    // console.log(auth);
  };

  return (
    <main>
      <div className="relative p-6 flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="relative grid place-items-center w-full blob-container  z-2">
          <svg
            className={`top-[3rem] right-[2rem] left-[55rem] bottom-[-2rem] blob w-20 h-20 rounded-full bg-primary absolute transform z-1`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
          >
            <path
              fill="orange"
              d="M37.5,-57.5C48.4,-45.6,55.2,-30.7,61.4,-15.6C67.6,-0.5,73.1,14.8,68.3,25.2C63.5,35.6,48.4,41,34.1,45.5C19.8,50,6.2,53.7,-9.3,56.4C-24.8,59.1,-49.6,60.8,-66.7,52C-83.7,43.3,-93.1,24,-96.7,6.5C-100.3,-11.1,-98.1,-26.6,-87.2,-40.6C-76.3,-54.6,-56.7,-67.1,-39.3,-72.9C-21.8,-78.6,-6.5,-77.6,8.9,-73.3C24.3,-68.9,48.5,-61.3,63.6,-50.3C78.8,-39.4,84.8,-25.2,89.2,-9.3C93.5,6.6,96.2,22.5,92.2,34.6C88.2,46.7,77.5,55,65.5,64.1C53.5,73.2,40.2,83,26.1,82.6C12,82.2,-2.8,71.7,-16.3,62.5C-29.7,53.3,-41.8,45.4,-53.1,35.4C-64.3,25.3,-74.6,13.2,-80.7,-0.2C-86.8,-13.7,-88.7,-27.5,-80.1,-39.4C-71.6,-51.3,-52.6,-61.4,-36.6,-69.5C-20.7,-77.6,-7.9,-83.7,4.9,-82.9C17.6,-82.1,35.2,-74.4,37.5,-57.5Z"
              transform="translate(100 100)"
            />
          </svg>
          <div className="w-full p-6 lg:max-w-xl sm:w-11/12 backdrop-filter backdrop-blur-lg bg-primary/10 bg-opacity-30 rounded-lg p-6 mt-6 shadow-inner border-2 text-white relative z-2">
            <form onSubmit={handleResetPass} className="max-w-md mx-auto mt-8">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className=" block text-primary text-sm font-bold mb-2"
                >
                  Registered Email:
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                  autoComplete="off"
                />
              </div>
              <div className="mb-4 text-left">
                <p className="text-sm text-primary">{isCorrect}</p>
              </div>
              <button
                type="submit"
                className="w-full lg:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

// Mark the component as a client component
page.clientProps = {
  // client props go here if needed
};

export default page;
