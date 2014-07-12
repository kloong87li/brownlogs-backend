# Brownlogs Backend API


###Setup
* Clone repo to local machine
* ```npm install```
* ```node --harmony bin/api``` to run the server.

In mongo:
```
db.createCollection("Counters")
db.Counters.insert({collection: "Stalls", seq: 0})
db.Counters.insert({collection: "Venues", seq: 0})
db.Counters.insert({collection: "Msgs", seq: 0})
```

### References
* Based on https://github.com/koajs/api-boilerplate
* Also included: https://github.com/koajs/json-filter
