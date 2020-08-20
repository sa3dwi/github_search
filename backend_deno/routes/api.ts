import { Router } from 'https://deno.land/x/opine@0.12.0/mod.ts';
import { config } from "https://deno.land/x/dotenv/mod.ts";

const users = new Router();

// users routes
users.get('/me', (req, res) => {
  res.render('users/me', { title: 'My Profile', user: res.app.locals.user });
});

export default users;

// Setup port constants
const REDIS_PORT = config().REDIS_PORT || 6379;
const REDIS_CACHE_EXPIRY = config().REDIS_CACHE_EXPIRY || 7200;
const ALLOWED_ORIGIN = config().ALLOWED_ORIGIN || 'http://localhost:3000';
const GITHUB_API_USERS = config().GITHUB_API_USERS || 'https://api.github.com/search/users';
const GITHUB_API_REPOSITORIES = config().GITHUB_API_REPOSITORIES || 'https://api.github.com/search/repositories';

