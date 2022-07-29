import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeroHttp from '../../http/API';
import { useQuery, useMutation, useQueryClient } from 'react-query';

function HeroPage() {
  let params = useParams();
  const [image, setImage] = useState<string>('');
  const queryClient = useQueryClient();
  const {  data } = useQuery(
    ['oneHero', params.id],
    async () => {
      const data = await HeroHttp.getHero(params.id);
      return data;
    }, 
    {
      enabled: !!params.id,
      onError: (error:Error) => {
        alert(error.message);
      },
    }
  );
  const { mutateAsync, isLoading: isMutating } = useMutation(
    HeroHttp.editPhoto
  );

  const photoEditorHandler = async (e:React.ChangeEvent<any>) => {
    e.preventDefault();
    const id = params.id;
    if (data?.imageSrc) {
      setImage('');
      await mutateAsync({ id, image });
    } else {
      await mutateAsync({ id, image });
    }
    queryClient.invalidateQueries('oneHero');
  };

  const onFileUpload = (event:React.ChangeEvent<any>) => {
    const file = event.target.files[0];
    const reader:FileReader = new FileReader();
    reader.readAsDataURL(file);
    setImage(file);
  };

  return (
    <section className="hero">
      {' '}
      <Link className="btn" to="/">
        Back to the main page
      </Link>
      <div className="hero_title">
        <span className="hero_text">NickName:</span>
        {data?.nickname}
      </div>
      <div className="hero_title">
        <span className="hero_text">Real Name:</span>
        {data?.real_name}
      </div>
      <div className="hero_info">
        <div className="hero_photo">
          <img
            className="hero_photo"
            src={`http://localhost:5000/${data?.imageSrc}`}
          />
        </div>
        <div className="hero_button">
          <div onClick={photoEditorHandler} className="btn">
            {data?.imageSrc ? 'delete photo' : 'Add photo'}
          </div>
          {!data?.imageSrc && (
            <input
              id="imageSrc"
              name="imageSrc"
              type="file"
              onChange={onFileUpload}
            />
          )}

          <div>
            <span className="hero_text">Superpower:</span>
            {data?.superpowers}
          </div>
          <div>
            <span className="hero_text">Phrase:</span>
            {data?.catch_phrase}
          </div>
          <div>
            <span className="hero_text">Description:</span>
            {data?.origin_description}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroPage;
