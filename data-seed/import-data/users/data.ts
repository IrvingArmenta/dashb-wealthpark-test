import { seedUser } from '../../../src/api';
import { getObjectId } from '../../helpers';

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

export default users;