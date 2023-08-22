import { Link } from 'react-router-dom';
import { useState } from 'react';
import { searchForShows } from '../api/tvmaze';
import { searchForPeople } from '../api/tvmaze';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  
  
  const onSearchStrChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value)
  }

  const onSearch = async ev => {
    ev.preventDefault();

    try {
      setApiDataError(null);
      if(searchOption === 'show'){
        const result = await searchForShows(searchStr);
        setApiData(result);
      } else {
        const result = await searchForPeople(searchStr);
        setApiData(result);
      }
      
    } catch (error) {
      setApiDataError(error);
    }
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error Occured : {apiDataError.message}</div>;
    }

    if (apiData) {
      return apiData[0].show ? apiData.map(data => (
        <div key={data.show.id}>{data.show.name}</div>
      )) : apiData.map(data => (
        <div key={data.person.id}>{data.person.name}</div>
      ))
    }

    return null;
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchStrChange} />

        <label>
          Shows
          <input type="radio" name = "search-options" checked={searchOption === 'shows'} value="shows" onChange={onRadioChange} />
        </label>
        <label>
          Actors
          <input type="radio" name = "search-options" checked={searchOption === 'actors'} value="actors" onChange={onRadioChange} />
        </label>

        <button type="submit">Search</button>
      </form>
      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
