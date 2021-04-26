import React from "react";
import Header from "./Header.jsx";
import NavBar from "./NavBar.jsx";
import Search from "./Search.jsx";
import "../../html-scss/styles.scss";

// Component just renders the header and navbar inside a main for styling.
export default function Home() {
  return (
    <main>
      <Header />
      <NavBar />
      <div id="biggiantdiv">
        {" "}
        <img
        id="wunderpus"
          src="https://lh3.googleusercontent.com/proxy/nNyL1QLv-ea4PGVQmGIYUVccD47aL3TM3f26Aj8eV1bto73zJE5599zEiP-YnOov6Gg8QVMHWrLdI3gIFkf2q2cI61Mk1mKMvAMKAzn2mOTr7fF-VgjqwD9-uf6hD7OGrMP0X4dK"
          height="150px"
          width="250px"
        />
      </div>
    </main>
  );
}
