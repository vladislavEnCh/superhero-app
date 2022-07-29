import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroHttp from '../../http/API';
import { basicSchema } from '../../shared/schemas';
import { useMutation } from 'react-query';
import './CreatePage.style.scss';
import { IHero } from '../../shared/types/hero.types';

function CreatePage() {
  const [imagePreview, setImagePreview] = useState<any>();
  const [image, setImage] = useState();

  const { mutateAsync, isLoading: isMutating } = useMutation(
    HeroHttp.createHero
  );

  let navigate = useNavigate();
  const onSubmit = async (values:IHero, actions:any) => {
    const newData:Object = {
      ...values,
      image,
    };
    await mutateAsync(newData);
    actions.resetForm();
    navigate('/');
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      nickname: '',
      real_name: '',
      origin_description: '',
      superpowers: '',
      catch_phrase: '',
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  const onFileUpload = (event) => {
    const file = event.target.files[0];

    const reader:FileReader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <Link className="btn" to="/">
        Back to the main page
      </Link>
      {imagePreview && (
        <img
          className=""
          width={200}
          height={100}
          src={imagePreview}
          alt="prev"
        />
      )}

      <div className="create_input">
        <input
          id="nickname"
          name="nickname"
          placeholder="nickname"
          type="text"
          onBlur={handleBlur}
          value={values.nickname}
          onChange={handleChange}
          className={errors.nickname && touched.nickname ? 'input-error' : ''}
        />
      </div>
      <div className="create_input">
        <input
          id="real_name"
          name="real_name"
          placeholder="real_name"
          type="text"
          onBlur={handleBlur}
          value={values.real_name}
          onChange={handleChange}
          className={errors.real_name && touched.real_name ? 'input-error' : ''}
        />
      </div>
      <div className="create_input">
        <input
          id="origin_description"
          name="origin_description"
          placeholder="origin_description"
          type="text"
          onBlur={handleBlur}
          value={values.origin_description}
          onChange={handleChange}
          className={
            errors.origin_description && touched.origin_description
              ? 'input-error'
              : ''
          }
        />
      </div>
      <div className="create_input">
        <input
          id="superpowers"
          name="superpowers"
          placeholder="superpowers"
          type="text"
          onBlur={handleBlur}
          value={values.superpowers}
          onChange={handleChange}
          className={
            errors.superpowers && touched.superpowers ? 'input-error' : ''
          }
        />
      </div>
      <div className="create_input">
        <input
          id="catch_phrase"
          name="catch_phrase"
          placeholder="catch_phrase"
          type="text"
          onBlur={handleBlur}
          value={values.catch_phrase}
          onChange={handleChange}
          className={
            errors.catch_phrase && touched.catch_phrase ? 'input-error' : ''
          }
        />
      </div>

      <input
        id="imageSrc"
        name="imageSrc"
        type="file"
        onChange={onFileUpload}
      />
      <button
        disabled={isSubmitting}
        type="submit"
        className="create_button btn">
        Create
      </button>
    </form>
  );
}

export default CreatePage;
