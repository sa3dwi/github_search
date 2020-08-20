const { SEARCH_TYPES, USERS } = require('./../config/constants');

const PORT = process.env.PORT || 5000;

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Github Search API Docs',
    contact: {
      name: 'Ahmed Magdi',
      email: 'ahmed@saadawi.me',
      url: 'https://saadawi.me'
    }
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
      description: 'Local server'
    },
    {
      url: 'https://api_url_testing',
      description: 'Testing server'
    },
    {
      url: 'https://api_url_production',
      description: 'Production server'
    }
  ],
  tags: [
    {
      name: 'Github search'
    }
  ],
  paths: {
    '/clear-cache': {
      get: {
        tags: ['Github search'],
        description: 'clear cache',
        parameters: [],
        responses: {
            '200': {
              description: 'Redis Cache has been cleared'
            },
        }
      }
    },
    '/search': {
      post: {
        tags: ['Github search'],
        description: 'get Search results',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Search'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'Get the search results'
          },
          '400': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: [
                    {
                        "login": "sa3dwi",
                        "id": 9197412,
                        "node_id": "MDQ6VXNlcjkxOTc0MTI=",
                        "avatar_url": "https://avatars0.githubusercontent.com/u/9197412?v=4",
                        "gravatar_id": "",
                        "url": "https://api.github.com/users/sa3dwi",
                        "html_url": "https://github.com/sa3dwi",
                        "followers_url": "https://api.github.com/users/sa3dwi/followers",
                        "following_url": "https://api.github.com/users/sa3dwi/following{/other_user}",
                        "gists_url": "https://api.github.com/users/sa3dwi/gists{/gist_id}",
                        "starred_url": "https://api.github.com/users/sa3dwi/starred{/owner}{/repo}",
                        "subscriptions_url": "https://api.github.com/users/sa3dwi/subscriptions",
                        "organizations_url": "https://api.github.com/users/sa3dwi/orgs",
                        "repos_url": "https://api.github.com/users/sa3dwi/repos",
                        "events_url": "https://api.github.com/users/sa3dwi/events{/privacy}",
                        "received_events_url": "https://api.github.com/users/sa3dwi/received_events",
                        "type": "User",
                        "site_admin": false,
                        "score": 1
                    }
                ]
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      q: {
        type: 'string'
      },    
      type: {
        type: 'string',
        enum: SEARCH_TYPES,
        default: USERS
      },
      Search: {
        type: 'object',
        properties: {
          type: {
            $ref: '#/components/schemas/type'
          },
          q: {
            $ref: '#/components/schemas/q'
          }
        }
      },
    }
  }
};