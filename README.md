# Project initialization

- Run ```yarn``` in the terminal
- Create a DB: https://railway.app/
- Copy the env sample file
- Paste the connection link in the env file
- Run every DB migration: ```npx prisma migrate reset```
- Run ```yarn dev```

# Database

*Apply every migration to the DB*
```
npx prisma migrate dev
```

*Apply the last changes to the database without effecting the migrations*
```
npx prisma db push
```

*Execute a new migration with all the changes made*
```
npx prisma migrate dev --name init
```
