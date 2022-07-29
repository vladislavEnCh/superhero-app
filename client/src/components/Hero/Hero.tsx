import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroHttp from '../../http/API';
import './Hero.style.scss';
import { useQueryClient, useMutation } from 'react-query'; 
import {Rings} from "react-loader-spinner";

function Hero({ nickname, id, imageSrc }) {
  const queryClient = useQueryClient()
  let navigate = useNavigate();

  const {  mutateAsync, isLoading } = useMutation(HeroHttp.deleteHero);

 const deleteHeroHandler = async () =>{
  await mutateAsync(id)
  queryClient.invalidateQueries("HeroList")
 }

  const informationHandler = () => {
    navigate(`/hero/${id}`);
  };
  const editHandler = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <section className="hero">
      <div className="hero_title">{nickname}</div>
      <div className="hero_info">
        <div className="">
          <img
            className="hero_photo"
            src={`http://localhost:5000/${imageSrc}`}
          />
        </div>
        <div className="hero_button">
          <div className="btn" onClick={informationHandler}>
            Click for more information
          </div>
          <div className="btn" onClick={editHandler}>
            Update this hero
          </div>
          <div className="btn hero_delete" onClick={deleteHeroHandler}>
           {isLoading? <Rings color='#fff' height={10} />:'Delete this hero'} 
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
