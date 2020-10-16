# Sip Fizzy

Sip Fizzy, is a platform (app? tool? idk...) that will allow seltzer fans to share their thoughts on seltzers, connect with other enthusiasts, and get curated recommendations.

## Why does this exist?

If I said I had great aspirations of starting a seltzer-review empire, I would be lying. I'm working on this project for two simple reasons: I want to help out my friends, and I want to grow as an engineer.

### Reason 1 - Get my friends off of Google Sheets

Well I have some friends that take detailed notes on their favorite (and least favorite) seltzers in a Google Sheets document. Don't get me wrong, Google Sheets is great and it was a good place to start, but it wasn't built as a review platform. I knew and know that I could build something easier to use and nicer to look at. Also, having a group of friends in mind makes it way easier to sift through merge conflicts or cryptic Typescript errors.

### Reason 2 - Learning is fun

If I won the lottery tomorrow, I'd go back to school and learn as much as I could. Sadly, I don't expect to win the lottery any time soon, so I've resorted to building odd side projects as a way to drive my own growth as an engineer.

1. Authentication
2. Authorization
3. Backend servers: Node + Express
4. Databases: MongoDB + Mongoose (MongoDB Atlas b.c. it's free)
5. Typescript - *I'm sold*
6. Testing Frontend
   1. Unit - Jest
   2. Integration - Jest + react testing library?
   3. Visual - Look at Chromatic + Storybook?

I love to learn, and I thought it was time to learn more about backend tech and frontend best practices.

I started this project in plain old Javascript, but I figured that I should take this time to learn Typescript, so this past week, I converted the entire frontend to Typescript.

That was really fun, and I can see why people love it. I still have a lot to learn, and I have used `any` or `<any>` far more than I'd like to admit... That will be fixed in due time.

## How to run

Well, while I was tempted to put my private keys in this repo, I realized that it wasn't a great idea.

To run this app, you will need to set up some auxiliary things.

In the server directory, add a `.env` that contains:

```
# Your MongoDB Atlas database access username
MONGO_ATLAS_USER="XxM0ng0_M4st3rxX"

# The password for the above username
MONGO_ATLAS_PASS="420_n0-5c0p3-XYZ"

# The name of the DB you want to connect to. If starting from empty, you may need to add a collection before connecting for the first time.
MONGO_ATLAS_DB=""

# The port this server will listen on.
PORT=""

# Pino log level - fatal, error, warn, info, debug, trace or silent
LOG_LEVEL="debug for dev, info for prod?"

# Key used for signing and verifying auth tokens
JWT_PRIVATE_KEY=""
```

In the client directory, add a `.env.local` file that contains the following:
```
# The API endpoint. This port should match the port in the server .env file
REACT_APP_API_URL="http://localhost:8080"
# The KEY for where you store your JWT key in local storage
REACT_APP_API_TOKEN_KEY=""
```

If you see anything above that screams "security worst practice", please let me know. I'm just trying to learn, and I probably (definitely) made some mistakes along the way!




---

# What comes next?

## CI/CD

I want to learn more about CI/CD pipelines, so I will use this project as a guinea pig for that. Sure, a project with one dev and currently 0 users may not **need** this treatment, but as I said before, learning takes precedence.

## Testing

A part of the aforementioned CI/CD pipeline will be automated tests. This is something I have little experience with, and I really like the sound of it. Having more confidence in what I'm writing will definitely help me sleep easier if this ever has more than ~5 users.

I want to use Storybook for visual regression testing. I've come across Storybook before (Nivo docs) and I love the look, feel, and power it gives to devs + designers.

I will probably user Jest + React Testing Library for all my react testing. In an effort to write better unit tests, I will need to reorganize some of my code. I have mixed too much of the business logic and presentation together. I know Jest + add-ons can handle these cases, but I'd like to make the code cleaner and easier to test.

I will look into end-to-end testing, mainly because it sounds cool, but I don't need to start that until I've created the MVP.

And that's just the frontend. Honestly, I need to read into how to best test my Express backend server. I love Postman, and I know it has some functionality in that realm, so I'll start by looking there.

## Better Auth

I had never rolled my own authentication and authorization before, so I figured I'd do that with this project. With this being my first attempt at it, I doubt I got things 100% correct, so before people other than myself start to use this, I want to switch to using a proper Auth-as-a-service provider. I know this will cost more, but I don't want to be as liable with personal data and I don't want to focus as much on this part of the stack.
