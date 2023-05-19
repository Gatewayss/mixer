const db = require('../config/db');
const { User, Post, Challenge } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const challengeSeeds = require('./challengeSeeds.json')

db.once('open', async () => {
  try {
    await Post.deleteMany({});
    await User.deleteMany({});
    await Challenge.deleteMany({});

    await User.create(userSeeds);
    await Challenge.create(challengeSeeds);

    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, postAuthor } = await Post.create(postSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: postAuthor },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});