// go to localhost:3000/Test to check the socket demo

// tslint:disable:typedef
import * as React from "react";
import * as socketIOClient from "socket.io-client";

interface ITestState {
  endpoint?: string;
  color?: string;
}
export default class Test extends React.Component<{}, ITestState> {
  constructor() {
    super();

    this.state = {
      endpoint: "http://localhost:8081", // this is where we are connecting to with sockets
      color: "white"
    };
  }

  // method for emitting a socket.io event
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("change color", this.state.color); // change 'red' to this.state.color

    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.
  }

  // adding the function
  setColor = color => {
    this.setState({ color });
  }
  // render method that renders in code if the state is updated
  render() {
    // within the render method, we will be checking for any sockets.
    // we do it in the render method because it is ran very often.
    const socket = socketIOClient(this.state.endpoint);
    socket.on("change color", (col) => {
        document.body.style.backgroundColor = col;
      });
    return (
        <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send() }>Change Color</button>

        {/* adding the two buttons, also, remove all of the comments in the JSX section. */}
        <button id="blue" onClick={() => this.setColor("blue")}>Blue</button>
        <button id="red" onClick={() => this.setColor("red")}>Red</button>
        ///

      </div>
    );
  }
}
