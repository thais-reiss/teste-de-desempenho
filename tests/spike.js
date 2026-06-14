import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  
    { duration: '10s', target: 300 }, 
    { duration: '1m', target: 300 },  
    { duration: '10s', target: 10 },  
  ],
};

export default function () {
  const url = 'http://localhost:3000/checkout/simple';
  
  const payload = JSON.stringify({
    cartId: Math.floor(Math.random() * 10000),
    amount: 199.90
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
  });

  sleep(1);
}