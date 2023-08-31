import { Link } from 'react-router-dom';
import { useState } from 'react';
import { searchForShows } from '../api/tvmaze';
import { searchForPeople } from '../api/tvmaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorGrid from '../components/actors/ActorGrid';

const Home = () => {
  const [apiDataError, setApiDataError] = useState(null);
  const [apiData, setApiData] = useState(null);

  const onSearch = async ({ q, searchOption }) => {
    try {
      setApiDataError(null);
      if (searchOption === 'show') {
        const result = await searchForShows(q);
        setApiData (result);
      } else {
        const result = await searchForPeople(q);
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

    if(apiData?.length === 0){
      return <div>Not Found</div>
    }
    
    if (apiData) {
      return apiData[0].show
        ? <ShowGrid shows ={apiData}/>
        : <ActorGrid actors ={apiData}/>;
    }

    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
