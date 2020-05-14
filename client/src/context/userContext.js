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
      failedEditUser: false,
    };
    this.createUser = this.createUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.updateRole = this.updateRole.bind(this);
  }

  componentDidMount() {
    this.getLoggedInUser();
    this.getAllUsers();
  }

  getLoggedInUser() {
    if (document.cookie) {
      let user = JSON.parse(localStorage.getItem("user"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      let role = JSON.parse(localStorage.getItem("userRole"));

      this.setState({
        loggedInUser: user,
        loggedInUserId: userId,
        userRole: role,
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

  //log in user
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
      localStorage.setItem("userRole", JSON.stringify(responseData.role));
      this.setState({
        loggedInUser: responseData.username,
        loggedInUserId: responseData._id,
        failedLogin: false,
        userRole: responseData.role,
      });
      this.getAllUsers();
    } else if (response.status === 401) {
      this.setState({ failedLogin: true });
    }
  }

  //Logout user
  async logoutUser() {
    try {
      await fetch("http://localhost:5000/users/logout", {
        method: "POST",
        credentials: "include",
      });
      this.setState({
        loggedInUser: "",
        loggedInUserId: "",
      });
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  //Get all users
  async getAllUsers() {
    if (this.state.userRole === "admin") {
      try {
        const response = await fetch("http://localhost:5000/users", {
          credentials: "include",
        });
        const data = await response.json();
        this.setState({ allUsers: data });
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async updateRole(id, role) {
    try {
      const response = await fetch(
        `http://localhost:5000/users/${id}/${role}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      this.getAllUsers();
    } catch {
      console.log("Error");
    }
  }

  async updateUser(id, value) {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      this.setState({ failedEditUser: false });
      this.getAllUsers();
    } catch {
      console.log("Error");
      this.setState({ failedEditUser: true });
    }
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
          logoutUser: this.logoutUser,
          updateRole: this.updateRole,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export const UserConsumer = UserContext.Consumer;
