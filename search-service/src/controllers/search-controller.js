import Search from "../models/Search.js";
import logger from "../utils/logger.js";

//implement caching here for 2 to 5 min
const searchPostController = async (req, res) => {
  logger.info("Search endpoint hit!");
  try {
    const { query } = req.query;
    const cacheKey = `post:${query}`;
    const cachedPost = await req.redisClient.get(cacheKey);

    if (cachedPost) {
      return res.json(JSON.parse(cachedPost));
    }

    const results = await Search.find(
      {
        $text: { $search: query },
      },
      {
        score: { $meta: "textScore" },
      }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10);

    // Save results to Redis cache with 5-minute expiration (300 seconds)
    await req.redisClient.setex(cacheKey, 300, JSON.stringify(results));

    res.json(results);
  } catch (e) {
    logger.error("Error while searching post", e);
    res.status(500).json({
      success: false,
      message: "Error while searching post",
    });
  }
};

export { searchPostController };
