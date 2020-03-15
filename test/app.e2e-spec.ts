import * as request from 'supertest';
import { RegisterDTO, loginDTO } from 'src/auth/auth.dto';
import { HttpStatus, Body } from '@nestjs/common';
import * as mongoose from 'mongoose';
import {app} from './constants';
import { isRegExp } from 'util';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST);
  await mongoose.connection.db.dropDatabase();
})

afterAll(async(done) => {
  await mongoose.disconnect(done);
})

describe('Auth',() => {

  const user: RegisterDTO | loginDTO = {
    username : "hello4",
    password: "admin"
  }

  const sellerRegister: RegisterDTO = {
    username : "seller",
    password: "admin",
    seller: true
  }

  const sellerLogin: loginDTO = {
    username : "seller",
    password: "admin"
  }

  let userToken: string;
  let sellerToken: string;

  it('should register user', () => {
    return request(app)
    .post('/auth/register')
    .set('Accept', 'Application/json')
    .send(user)
    .expect(({ body }) => {
      expect(body.token).toBeDefined();
      // expect(body.user.username).toEqual(user.username);
      expect(body.user.seller).toBeFalsy();
    })
    .expect(HttpStatus.CREATED);
    
  })

  it('should register seller', () => {
    return request(app)
    .post('/auth/register')
    .set('Accept', 'Application/json')
    .send(sellerRegister)
    .expect(({ body }) => {
      expect(body.token).toBeDefined();
      // expect(body.user.username).toEqual(sellerLogin.username);
      // expect(body.user.seller).toBeTruthy();
    })
    .expect(HttpStatus.CREATED);
  })

  it('should reject duplicate registration', () => {
    return request(app)
    .post('/auth/register')
    .set('Accept', 'Application/json')
    .send(user)
    .expect(({ body }) => {
      expect(body.user.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(body.user.message).toEqual('User already exist');
    })
    // .expect(HttpStatus.BAD_REQUEST);
  })

  it('should login user', () => {
    return request(app)
    .post('/auth/login')
    .set('Accept', 'application/json')
      .send(user)
      .expect(({body}) => {
        // console.log(body,"token is here")
        expect(body.token).toBeDefined();
        userToken= body.token;
      })
    .expect(HttpStatus.CREATED)
  })

  it('should login seller', () => {
    return request(app)
    .post('/auth/login')
    .set('Accept', 'application/json')
      .send(sellerLogin)
      .expect(({body}) => {
        expect(body.token).toBeDefined();
        
        sellerToken = body.token;
        console.log(sellerToken,"here is token we want");
        
      })
    .expect(HttpStatus.CREATED)
  })

  it('should respect seller token', () => {
    return request(app)
      .get('/product/mine')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(200);
  });

})
