import { useState } from 'react';
import { useSearchStr } from '../lib/useSearchStr';

const SearchForm = ({ onSearch }) => {
  const [searchStr, setSearchStr] = useSearchStr('');
  const [searchOption, setSearchOption] = useState('shows');

  const onSearchStrChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const options = {
      q: searchStr,
      searchOption
    };

    onSearch(options);
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={searchStr} onChange={onSearchStrChange} />

      <label>
        Shows
        <input
          type="radio"
          name="search-options"
          checked={searchOption === 'shows'}
          value="shows"
          onChange={onRadioChange}
        />
      </label>
      <label>
        Actors
        <input
          type="radio"
          name="search-options"
          checked={searchOption === 'actors'}
          value="actors"
          onChange={onRadioChange}
        />
      </label>

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
