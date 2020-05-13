import React from "react";

export const GameContext = React.createContext();

export default class GameProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      allResults: [],
    };
    this.getGames = this.getGames.bind(this);
    this.getAllResults = this.getAllResults.bind(this);
    this.createPost = this.createPost.bind(this);
    this.deleteResult = this.deleteResult.bind(this);
    this.editPost = this.editPost.bind(this);
  }

  componentDidMount() {
    this.getGames();
    this.getAllResults();
  }

  async getGames() {
    try {
      const response = await fetch("http://localhost:5000/games/", {});
      const data = await response.json();
      this.setState({ games: data });
    } catch {
      console.log("Error");
    }
  }
  async getAllResults() {
    try {
      const response = await fetch("http://localhost:5000/games/results", {});
      const data = await response.json();
      this.setState({ allResults: data });
    } catch {
      console.log("Error");
    }
  }

  async createPost(userId, gameId, value) {
    const response = await fetch(
      `http://localhost:5000/games/${gameId}/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }
    );
    console.log(response);
    this.getAllResults();
  }

  async editPost(gameId, value) {
    const response = await fetch(`http://localhost:5000/games/${gameId}`, {
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

  async deleteResult(id) {
    try {
      const response = await fetch(`http://localhost:5000/games/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.getAllResults();
    } catch {
      console.log("Error");
    }
  }

  render() {
    return (
      <GameContext.Provider
        value={{
          state: this.state,
          createPost: this.createPost,
          editPost: this.editPost,
          deleteResult: this.deleteResult,
        }}
      >
        {this.props.children}
      </GameContext.Provider>
    );
  }
}
export const GameConsumer = GameContext.Consumer;
