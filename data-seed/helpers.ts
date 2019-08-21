import { createHash } from 'crypto';
import { ObjectId } from 'mongodb';

export const getObjectId = (name: string): ObjectId => {
  const hash = createHash('sha1')
    .update(name, 'utf8')
    .digest('hex');

  return new ObjectId(hash.substring(0, 24));
};
