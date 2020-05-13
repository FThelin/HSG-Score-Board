import React from "react";

export const UserContext = React.createContext();

export default class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      allUsers: [],
      loggedInUser: "",
      loggedInUserId: "",
      userRole: "",
      failedLogin: false,
      failedRegister: false,
    };
    this.createUser = this.createUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    if (document.cookie) {
      let user = JSON.parse(localStorage.getItem("user"));
      let userId = JSON.parse(localStorage.getItem("userId"));

      this.setState({
        loggedInUser: user,
        loggedInUserId: userId,
      });
    } else {
      localStorage.clear();
    }
  }

  async createUser(data) {
    const response = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      const responseData = await response.json();
      this.setState({ username: responseData.username });
      this.setState({ failedRegister: false });
    } else if (response.status === 403) {
      this.setState({ failedRegister: true });
    }
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

      localStorage.setItem("user", JSON.stringify(responseData.username));
      localStorage.setItem("userId", JSON.stringify(responseData._id));
      this.setState({
        loggedInUser: responseData.username,
        loggedInUserId: responseData._id,
        failedLogin: false,
      });
    } else if (response.status === 401) {
      this.setState({ failedLogin: true });
    }
  }

  //Get all users
  async getAllUsers() {
    if (this.state.loggedInUser === "admin") {
      try {
        const response = await fetch("http://localhost:5000/users", {
          credentials: "include",
        });
        const data = await response.json();
        console.log("DATA:", data);
        this.setState({ allUsers: data });
      } catch {
        console.log("Error");
      }
    }
  }

  async updateUser(value, id) {
    const response = await fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    console.log(response);
    this.getAllResults();
  }

  async deleteUser(id) {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.getAllUsers();
    } catch {
      console.log("Error");
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          createUser: this.createUser,
          loginUser: this.loginUser,
          getAllUsers: this.getAllUsers,
          updateUser: this.updateUser,
          deleteUser: this.deleteUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export const UserConsumer = UserContext.Consumer;
