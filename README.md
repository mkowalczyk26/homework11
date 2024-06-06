# Custom JSON.parse

This project is implementation of simplified JSON.parse function.
Using regular expressions was necessary for tokenization, main challenge was correctly handling different JSON elements. It was important for carefull management of tokens to get correct JSON structure.

___


## Tokenization
tokenize function uses regex to split JSON string into tokens. Regex matches: true, false, null, structural characters, strings and numbers. 

## Parsing
parseValue function process tokens to construct object or array. It handles different types of values.

## Error handling
function throws expextions when it encouter issues.


___


## Usage


```javascript
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';

const jsonObject = myJSONParse(jsonString);

console.log(jsonObject);
```


___


## Running the application

Run `homework11.js` file using node

```bash
node homework11.js
````