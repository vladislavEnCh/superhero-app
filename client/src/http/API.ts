import { IHero } from './../shared/types/hero.types';
import { $req } from './index';

class HeroHttp {
  getData = async (limit: number) => {
    try {
      const { data } = await $req.get<IHero[]>('/', {
        params: {
          limit,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  getHero = async (id: string | undefined) => {
    try {
      const { data } = await $req.get<IHero>(`/${id}`, {
        params: {
          id,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  createHero = async (hero: IHero) => {
    console.log(hero);
    try {
      const { data } = await $req.post<IHero>('/', hero, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  editHero = async ({ id, ...newData }) => {
    try {
      const { data } = await $req.post(`/${id}`, newData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  deleteHero = async (id: string) => {
    try {
      const { data } = await $req.delete(`/delete/${id}`, {
        params: {
          id,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  editPhoto = async ({ id, ...image }) => {
    try {
      console.log(image);
      const { data } = await $req.put(`/${id}`, image, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}
let heroContainer: HeroHttp;

const initHeroContainer = () => {
  if (!heroContainer) {
    heroContainer = new HeroHttp();
  }
  return heroContainer;
};
export default initHeroContainer();
