import {test, expect, request} from '@playwright/test'

const baseURL='https://api.restful-api.dev/objects';

test ('get api', async({request})=>{
    const response = await request.get('https://api.restful-api.dev/objects');
    let responseBody = await response.json();
    let responseHeader = response.headers();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody[0].id).toBe('1');
    console.log(responseHeader);
    expect(responseHeader['content-type']).toContain('application/json');
})

test ('post api', async({request})=>{
   const payload = {
    
  "name": "Apple MacBook Pro 16",
  "data": {
    "year": 2019,
    "price": 1849.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB"
  }
   }
   const response = await request.post(baseURL, {
    data:payload
   })
   let responseBody = await response.json();
   console.log(responseBody);
   // id: 'ff8081819d82fab6019ebc540b837b48'
})

test ('put api', async({request})=>{
   const payload = {
    
  "name": "Apple MacBook Pro 11",
  "data": {
    "year": 2019,
    "price": 1849.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB"
  }
   }
   const response = await request.put(baseURL + '/' + 'ff8081819d82fab6019ebc540b837b48', {
    data:payload
   })
   let responseBody = await response.json();
   console.log(responseBody);
   expect(response.status()).toBe(200);
   expect(responseBody.name).toContain(payload.name);
   // id: 'ff8081819d82fab6019ebc540b837b48'
})


test ('patch api', async({request})=>{
   const payload = {
  "name": "Apple MacBook Pro 16 (Updated Name)"
}
   const response = await request.patch(baseURL + '/' + 'ff8081819d82fab6019ebc540b837b48', {
    data:payload
   })
   let responseBody = await response.json();
   console.log(responseBody);
   expect(response.status()).toBe(200);
   expect(responseBody.name).toContain(payload.name);
   // id: 'ff8081819d82fab6019ebc540b837b48'
})

test ('delete api', async({request})=>{
   const response = await request.delete(baseURL + '/' + 'ff8081819d82fab6019ebc540b837b48')
   let responseBody = await response.json();
   console.log(responseBody);
   expect(response.status()).toBe(200);
   expect(responseBody.message).toContain('Object with');
   // id: 'ff8081819d82fab6019ebc540b837b48'
})


