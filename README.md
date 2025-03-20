# Minimal workspace for NestJS + Next.js + Shadcn UI

Demonstration of a minimal workspace for NestJS + Next.js + Shadcn UI
+ Zod for validation - both frontend (ServerActions) and backend (ValidationPipe)
+ TailwindCSS for styling
+ Jest for testing
+ Prisma for database

## Run backend

```sh
npx nx run backend:serve 
```

## Run frontend

```sh
npx nx run frontend:dev 
```

## Install new Shadcn UI component

```sh
TS_NODE_PROJECT=tsconfig.base.json npx shadcn add <component-name>  
```


