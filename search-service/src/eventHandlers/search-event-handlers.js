import Search from "../models/Search.js";
import logger from "../utils/logger.js";

async function invalidateSearchCache(redisClient, query) {
  const cacheKey = `post:${query}`;
  await redisClient.del(cacheKey);

  const keys = await redisClient.keys("posts:*");
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
}

async function handlePostCreated(event, redisClient) {
  try {
    const newSearchPost = new Search({
      postId: event.postId,
      userId: event.userId,
      content: event.content,
      createdAt: event.createdAt,
    });

    await newSearchPost.save();
    if (redisClient) {
      await invalidateSearchCache(redisClient, event.content);
    }
    logger.info(
      `Search post created: ${event.postId}, ${newSearchPost._id.toString()}`
    );
  } catch (e) {
    logger.error(e, "Error handling post creation event");
  }
}

async function handlePostDeleted(event, redisClient) {
  try {
    await Search.findOneAndDelete({ postId: event.postId });
    if (redisClient) {
      await invalidateSearchCache(redisClient, event.content);
    }
    logger.info(`Search post deleted: ${event.postId}}`);
  } catch (error) {
    logger.error(error, "Error handling post deletion event");
  }
}

export { handlePostCreated, handlePostDeleted };
