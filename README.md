# Project initialization

- Run ```yarn``` in the terminal
- Create a DB: https://railway.app/
- Copy the env sample file
- Paste the connection link in the env file
- Run every DB migration: ```npx prisma migrate reset```
- Run ```yarn dev```

# Database

*Reset the DB and apply every migration*
```
npx prisma migrate reset
```

*Execute a new migration*
```
npx prisma migrate dev --name init
```
