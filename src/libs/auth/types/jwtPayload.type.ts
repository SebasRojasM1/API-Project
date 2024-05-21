export type JwtPayload = {
  sub: number;
  name: string;
  email: string;
  role: string;
  type: 'user' | 'business';
};

export type UserJwtPayload = JwtPayload & {
  age: number;
  cellphone: number;
};

export type BusinessJwtPayload = JwtPayload & {
  address: string;
  service: string;
  description: string;
  nit: number;
  urlImg: string;
};