import React from 'react';

import './SearchForm.scss';

export class SearchForm extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    this._onSubmit(event.target.value);
  }

  render() {
    const {
      query,
      onSubmit,
    } = this.props;
    this._onSubmit = onSubmit;

    const onChange = this.onSubmit.bind(this);
    return (
      <form className="search" onSubmit={onChange}>
        <label htmlFor="search">Search</label>
        <input type="search" name="search" placeholder="Search" value={query} onChange={onChange} />
        <input type="submit" value="Search" />
      </form>
    );
  }
};

SearchForm.propTypes = {
};
