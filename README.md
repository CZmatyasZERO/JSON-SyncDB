# JSON-syncDB
- simple solution for database for very small projects
- works on base of recursive Proxy() watching Object for changes, then changes writes into file

## Examples
### Example of usage
```javascript
const { JSONDB } = require("json-syncdb")
var db = new JSONDB("./data.json")

db.data.users = []
db.data.users.push({name: "arnold", age: 22})
```