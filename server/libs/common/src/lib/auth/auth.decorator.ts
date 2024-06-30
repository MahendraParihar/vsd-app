import { SetMetadata } from '@nestjs/common';

export const AUTH_SCOPE = 'AUTH_SCOPE';
export const PUBLIC_API = 'PUBLIC_API';
export const Public = () => SetMetadata(AUTH_SCOPE, PUBLIC_API);
