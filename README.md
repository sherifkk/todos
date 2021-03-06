## Todos
A simple Todo App using Ruby on Rails and React

### Local Development Setup

#### Prerequisites:
##### General Software Requirements
- Install the latest [Node.js](https://nodejs.org) version. Make sure that [npm](https://www.npmjs.com/) is installed with it as well.
- Install [yarn](https://yarnpkg.com/en/docs/install)
- Install [Ruby version 2.7.2](https://www.ruby-lang.org/en/news/2019/10/01/ruby-2-6-5-released/)
- Install [Postgres](https://postgresapp.com)
- Install [Redis](https://redis.io/download)
- Install [ImageMagick](https://imagemagick.org/script/download.php)

##### Installation steps on mac OS
- Install [Homebrew](https://brew.sh).
- Install the latest [Node.js](https://nodejs.org) version. Make sure that [npm](https://www.npmjs.com/) is installed with it as well.
- Install [RVM](https://rvm.io/rvm/install)
- Install Ruby 2.7.2 using RVM
  ```
  rvm install 2.7.2
  ```

  To make 2.7.2 as default and current version execute
  ```
  rvm --default use 2.7.2
  ```
- Install PostgreSQL using Homebrew.
   ```
   brew install postgresql
   ```

   Once postgresql is installed to start the server daemon run
   ```
   brew services start postgresql
   ```
- Install Redis
  ```
  brew install redis
  ```

  Launch Redis server daemon through Homebrew
  ```
  brew services start redis
  ```

  To ensure server is up, ping the server and confirm that we get a response.
  ```
  redis-cli ping
  PONG
  ```
- Install Yarn
  ```
  brew install yarn
  ```
- Install ImageMagick
  ```
  brew install imagemagick vips
  ```

#### Bundle Install and Setup DB
```
bundle install
bundle exec rake setup
```

#### Execute yarn
```
bin/yarn
```

#### Spinning up the App
```
foreman start
```

#### Login as Admin in the app
* visit http://localhost:3000
* login as admin, user name: `hello@example.com`, password: `helloworld`
