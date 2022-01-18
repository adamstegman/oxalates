import React from 'react';
import PropTypes from 'prop-types';

export class SearchForm extends React.Component {
  onSubmit = event => {
    const { query } = this.props;
    event.preventDefault();
    this._onSubmit(query);
  }

  onChange = event => {
    event.preventDefault();
    this._onSubmit(event.target.value);
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
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.string,
};
