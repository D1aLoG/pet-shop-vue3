import request from '@/utils/request.js';

export function createOrder(orderData) {
  return request({
    url: '/orders',
    method: 'post',
    data: orderData,
  });
}
