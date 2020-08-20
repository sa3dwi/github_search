const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const redis = require('redis');

// Setup port constants
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_CACHE_EXPIRY = process.env.REDIS_CACHE_EXPIRY || 7200;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
const GITHUB_API_USERS = process.env.GITHUB_API_USERS || 'https://api.github.com/search/users';
const GITHUB_API_REPOSITORIES = process.env.GITHUB_API_REPOSITORIES || 'https://api.github.com/search/repositories';

// Configure redis client
const redisClient = redis.createClient(REDIS_PORT);

// Check if redis is running
redisClient.on('error', function(err) {
    console.log('redis is not running');
    console.log(err);
});
redisClient.on('ready', function() {
    console.log('redis is running');
});

// Flush redis cache
const clearRedisCache = (req, res, next) => {
    redisClient.flushdb((err, success) => {
        if (err) {
          throw new Error(err);
        }
        res.send(`Redis Cache has been cleared`);
      });
}

// Middleware Function to Check Redis Cache
const redisCache = (req, res, next) => {
  const { q: searchQuery, type } = req.body;

  redisClient.get(searchQuery+type, (err, data) => {
    if (err) res.status(500).send(err);

    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      //proceed to next middleware function
      next();
    }
  });
}

// Make request to Github for data
async function githubSearch(req, res, next) {
    try {
      console.log('Fetching Data...');
      
      const { q: searchQuery, type } = req.body;
  
      console.log(searchQuery);
      console.log(type);
      
      let apiUrl = '';
      switch(type) {
        case 'repositories':
          apiUrl = GITHUB_API_REPOSITORIES;
          break;
        case 'users':
          default:
            apiUrl = GITHUB_API_USERS;
      }
      
      const response = await fetch(encodeURI(`${apiUrl}?q=${searchQuery}`));
  
      const data = await response.json();
  
      const repos = data.items;
  
      // Set key and data to Redis
      redisClient.setex(searchQuery+type, REDIS_CACHE_EXPIRY, JSON.stringify(repos));
  
      res.send(repos);
    } catch (err) {
      console.error(err);
      res.status(500).json(error);
    }
  }

// Allow CORS 
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Endpoint:  POST //api/search/
// @desc Return search data and cache in redis
router.post('/search', redisCache, githubSearch);
  
// Endpoint:  GET //api/clear-cache/
// @desc redis cache cleared
router.get('/clear-cache', clearRedisCache);

module.exports = router;
