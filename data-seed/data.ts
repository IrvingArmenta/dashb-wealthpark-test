import { getObjectId } from './helpers';
import { seedUser } from '../src/api/methods';

const names = ["Hanamichi", "Rukawa", "Haruko", "Akagi", "Mitsuki"];

const users: seedUser[] = names.map((name, i) => {
  return {
    id: getObjectId(name),
    name,
    email: `${name}@email.com`,
    password: `password${i}`,
    role: 'user'
  }
});

export = users;