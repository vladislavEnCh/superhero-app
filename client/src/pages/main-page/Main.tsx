import React, { useState } from 'react';
import Hero from '../../components/Hero/Hero';
import HeroHttp from '../../http/API';
import './Main.style.scss';
import { useQuery } from 'react-query';
import { IHero } from '../../shared/types/hero.types';

function Main() {
  const [selectedOption, setSelectedOption] = useState<number>(5);

  const { isLoading, data, error } = useQuery(['HeroList', selectedOption], async () => {
    const data = await HeroHttp.getData(selectedOption)
    return data
  },{
    enabled: !!selectedOption,
    onError:(error:Error) =>{
      alert(error.message)
    } 
  } 
  );
  
  const selectHandler = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="main">
      <div className="main_wrapper">
        {error && <div className="error">{error}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.map((hero:IHero) => (
            <Hero
              key={hero._id}
              id={hero._id}
              imageSrc={hero.imageSrc}
              nickname={hero.nickname}
            />
          ))
        )}
      </div>
      <div className="main_pagination">
        <span>
          Rows per page:{' '}
          <select
            defaultValue="5"
            onChange={(event:React.ChangeEvent<HTMLSelectElement>) => selectHandler(event)}
            name="select "
            className="custom-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </span>
      </div>
    </div>
  );
}

export default Main;
