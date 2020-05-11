import React from "react";

export const GameContext = React.createContext();

export default class GameProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
    this.getGames = this.getGames.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    this.getGames();
    console.log(this.state.games);
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

  createPost(name, id, value, gameId) {
    const gameObject = {
      name,
      id,
      goals: value.goals,
      assist: value.assists,
      penalties: value.penalties,
    };

    for (const game of this.state.games) {
      if (game._id === gameId) {
        console.log("Match!!!");
      }
    }
  }

  render() {
    return (
      <GameContext.Provider
        value={{
          state: this.state,
          createPost: this.createPost,
        }}
      >
        {this.props.children}
      </GameContext.Provider>
    );
  }
}
export const GameConsumer = GameContext.Consumer;
