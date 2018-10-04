import React from 'react';

import './SearchForm.scss';

export class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.query = React.createRef();
  }

  onSubmit(event) {
    event.preventDefault();
    this._onSubmit(this.query.current.value);
  }

  render() {
    const {
      query,
      onSubmit,
    } = this.props;
    this._onSubmit = onSubmit;

    return (
      <form className="search" onSubmit={event => this.onSubmit(event)}>
        <label htmlFor="search">Search</label>
        <input type="search" name="search" placeholder="Search" ref={this.query} defaultValue={query} />
        <input type="submit" value="Search" />
      </form>
    );
  }
};

SearchForm.propTypes = {
};
