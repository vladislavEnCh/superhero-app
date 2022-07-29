const requested = require('supertest');
const app = require('./app');

describe('Hero API', () => {
  it('GET hero --> array Heroes', () => {
    return requested(app)
      .get('/api/heroes')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              nickname: expect.any(String),
              real_name: expect.any(String),
              origin_description: expect.any(String),
              superpowers: expect.any(String),
              catch_phrase: expect.any(String),
            }),
          ])
        );
      });
  });
  it('GET hero by ID -->  Heroes by ID', () => {
    return requested(app)
      .get('/api/heroes/62e0db25b4fb11c5d2ef3ac6')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            nickname: expect.any(String),
            real_name: expect.any(String),
            origin_description: expect.any(String),
            superpowers: expect.any(String),
            catch_phrase: expect.any(String),
          })
        );
      });
  });
  it('POST CREATE hero --> array Heroes', () => {
    return requested(app)
      .post('/api/heroes')
      .send({
        nickname: 'Superman',
        real_name: 'Superman',
        origin_description: 'Superman',
        superpowers: 'Superman',
        catch_phrase: 'Superman',
      })
      .expect('Content-Type', /json/)
      .expect(201);
  });
  it('DELETE hero --> string', () => {
    return requested(app)
      .delete('/api/heroes/delete/62e13637e8575ad137d60279')
      .expect((res) => {
        expect(res.body.message).toEqual('the hero has been deleted');
      })
      .expect(200);
  });
  it(' UPDATE hero -->  Hero', () => {
    return requested(app)
      .post('/api/heroes/62e0db25b4fb11c5d2ef3ac6')
      .send({
        nickname: 'Superman',
        real_name: 'Superman',
        origin_description: 'Superman',
        superpowers: 'Superman',
        catch_phrase: 'Superman',
        
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            nickname: expect.any(String),
            real_name: expect.any(String),
            origin_description: expect.any(String),
            superpowers: expect.any(String),
            catch_phrase: expect.any(String),
            imageSrc:expect.any(String),
          })
        );
      });
  });
  it(' UPDATE photo -->  Hero', () => {
    return requested(app)
      .put('/api/heroes/62e13637e8575ad137d60279')
      .send({
        imageSrc: '',
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toEqual('Photo has been updated');
      })
      .expect(201);
  });
});
