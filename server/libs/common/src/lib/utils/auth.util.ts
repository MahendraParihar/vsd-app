import { isEmpty } from 'lodash';

export function extractLocalJwtFromHeader(request: Request) {
  if (!isEmpty(request.headers['authorization'])) {
    return request.headers['authorization'].split(' ')[1];
  }
  return null;
}
