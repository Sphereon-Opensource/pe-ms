import { randomBytes } from 'crypto';

import { Request } from 'express';
import { MongoClient, ObjectID } from 'mongodb';

import { DATABASE_NAME, MONGODB_URL } from '../../environment';
import { ApiError } from '../controllers/error_handler/errorHandler';
import { ThreadEntity } from '../entity/threadEntity';

export const generateDefinitionsResponseBody = (req: Request, thread: ThreadEntity) => {
  return {
    thread: { id: thread.id },
    challenge: thread.challenge,
    definition_url: `${req.protocol}://${req.headers.host}${req.baseUrl}/definitions/${req.body.presentation_definition.id}/`,
  };
};

export const updateChallengeToken = async (thread?: ThreadEntity): Promise<ThreadEntity> => {
  const client = new MongoClient(MONGODB_URL);
  try {
    await client.connect();
    const result = await client
      .db(DATABASE_NAME)
      .collection('thread')
      .findOneAndUpdate(
        {
          $and: [{ _id: new ObjectID(thread?.id) }, { 'challenge.token': thread?.challenge.token }],
        },
        { $set: { 'challenge.token': randomBytes(16).toString('hex') } },
        { returnOriginal: false }
      );
    if (!result.value) {
      throw new ApiError('Invalid thread id or challenge token');
    }
    return Promise.resolve({ id: result.value._id, challenge: result.value.challenge });
  } finally {
    if (client.isConnected()) {
      await client.close();
    }
  }
};
