import { ObjectId } from 'mongodb';
import { createHash } from 'crypto';

export const getObjectId = (name: string): ObjectId => {
  const hash = createHash('sha1')
    .update(name, 'utf8')
    .digest('hex');

  return new ObjectId(hash.substring(0, 24));
};
