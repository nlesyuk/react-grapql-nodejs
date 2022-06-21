const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const db = {
  users: [
    { id: 1, username: 'John Doe', age: 30 },
    { id: 2, username: 'Meth Be', age: 31 },
    { id: 3, username: 'Ro nin', age: 32 },
  ]
}

const rootResolver = {
  getAllUsers: () => db.users,
  getUser: ({ id }) => db.users.find(user => user.id === +id),
  createUser: ({ input }) => {
    console.log(input)
    const user = {
      id: Date.now(),
      ...input
    }
    db.users.push(user)
    return user
  }
}

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: rootResolver
}))

app.listen(5000, () => console.log('server app works on port 5000'));