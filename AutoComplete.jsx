import React from "react";

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: ""
    };
  }

  handleOnChange = e => {
    let value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      suggestions = this.props.items.sort().filter(v => regex.test(v));
    }
    this.setState({
      suggestions,
      text: value
    });
  };

  displaySuggestion() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) return null;
    return (
      <datalist id="countriesList">
        {suggestions.map(item => (
          <option value={item} onClick={() => this.suggestionsSelected(item)} />
        ))}
      </datalist>
    );
  }

  suggestionsSelected(value) {
    this.setState({
      text: value,
      suggestions: []
    });
  }

  render() {
    return (
      <div>
        <input
          list="countriesList"
          value={this.state.text}
          type="text"
          onChange={this.handleOnChange}
        />
        {this.displaySuggestion()}
      </div>
    );
  }
}

export default AutoComplete;
