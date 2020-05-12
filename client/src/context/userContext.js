import React from "react";

export const UserContext = React.createContext();

export default class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loggedInUser: "",
      loggedInUserId: "",
      failedLogin: false,
    };
    this.createUser = this.createUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  async createUser(data) {
    const response = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    this.setState({ username: responseData.username });
  }

  async loginUser(data) {
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData);
      this.setState({
        loggedInUser: responseData.username,
        loggedInUserId: responseData._id,
        failedLogin: false,
      });
    } else if (response.status === 401) {
      this.setState({ failedLogin: true });
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          createUser: this.createUser,
          loginUser: this.loginUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export const UserConsumer = UserContext.Consumer;
