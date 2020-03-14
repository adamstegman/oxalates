import React from 'react';

import './SearchForm.scss';

export class SearchForm extends React.Component {
  onSubmit = event => {
    event.preventDefault();
    this._onSubmit(this.query);
  }

  onChange = event => {
    event.preventDefault();
    this.query = event.target.value;
    this._onSubmit(this.query);
  }

  render() {
    const {
      query,
      onSubmit,
    } = this.props;
    this._onSubmit = onSubmit;

    return (
      <form className="search" onSubmit={this.onSubmit}>
        <label htmlFor="search">Search</label>
        <input type="search" name="search" placeholder="Search" value={query} onChange={this.onChange} />
        <input type="submit" value="Search" />
      </form>
    );
  }
};

SearchForm.propTypes = {
};
