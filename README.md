
## Installation

```bash
$ npm install
```
## Add Configuration 
 - Create config folder at root
 - Run following command
```
    cd config
    touch default.yml
    touch development.yml
```
 - copy following code in ```default.yml```
```
server:
  port: --
db:
  type: --
  database: --
jwt:
  expiresIn: --
```
 - copy following code in ```development.yml```
```
db:
  host: --
  username: --
  password: --
jwt:
  secret: --
```
 - Add your configuration setting in respective files
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
