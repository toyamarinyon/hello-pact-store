# Consumer-driven Contract Testing Demo

## Development

### Setup

1. Clone the repo

   ```sh
   git clone https://github.com/toyamarinyon/sat0shi-store
   ```

1. Go to the project folder

   ```sh
   cd sat0shi-store
   ```

1. Copy `.env.example` to `.env`

   ```sh
   cp apps/storefront/.env.example apps/storefront/.env
   cp apps/api/.env.example apps/api/.env
   cp packages/prisma/.env.example packages/prisma/.env
   ```

1. Install packages with yarn

   ```sh
   yarn
   ```

#### Quick start with `yarn dx`

> - **Requires Docker and Docker Compose to be installed**
> - Will start a local Postgres instance with a few test users - the credentials will be logged in the console

```sh
yarn dx
```

### Testing

```sh
# In first terminal
yarn dx
# In second terminal
yarn workspace @sat0shi-store/storefront cypress open
```

### Provider Testing

```
yarn workspace @satoshi-store/api jest
```
