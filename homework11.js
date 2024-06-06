function myJSONParse(jsonString) {
    function tokenize(json) { // Tokenize input JSON string
        const tokens = [];
        // Regex for matching JSON tokens
        const tokenRegExp = /\s*(true|false|null|[{}\[\],:]|"(?:[^"\\]|\\.)*"|-?\d+(\.\d+)?)/g;
        let match;
        
        // Extracting the tokens
        while (match = tokenRegExp.exec(json)) {
            tokens.push(match[0].trim());
        }
        
        return tokens;
    }

    // Parse values from tokens
    function parseValue(tokens) {
        if (tokens.length === 0) {
            throw new SyntaxError('Unexpected end of JSON input');
        }

        const token = tokens.shift();

        if (token === '{') { // Parse object
            const obj = {};
            if (tokens[0] === '}') {
                tokens.shift();
                return obj;
            }
            while (true) {
                if (tokens[0] === '}') {
                    tokens.shift();
                    break;
                }
                const key = parseValue(tokens); // Parse key
                if (typeof key !== 'string') {
                    throw new SyntaxError('Expected string key');
                }
                if (tokens.shift() !== ':') { // Expect :
                    throw new SyntaxError('Expected ":" after key');
                }
                const value = parseValue(tokens); // Parse value
                obj[key] = value;
                if (tokens[0] === '}') {
                    tokens.shift();
                    break;
                }
                if (tokens.shift() !== ',') { // Expect , or end of object
                    throw new SyntaxError('Expected "," or "}" after value');
                }
            }
            return obj;
        } else if (token === '[') { // Parse array
            const arr = [];
            if (tokens[0] === ']') {
                tokens.shift();
                return arr;
            }
            while (true) {
                arr.push(parseValue(tokens)); // Parse elements
                if (tokens[0] === ']') {
                    tokens.shift();
                    break;
                }
                if (tokens.shift() !== ',') { // Expect , or end of array
                    throw new SyntaxError('Expected "," or "]" after value');
                }
            }
            return arr;
        } else if (token === 'true') { // Parse true
            return true;
        } else if (token === 'false') { // Parse false
            return false;
        } else if (token === 'null') { // Parse null
            return null;
        } else if (/^-?\d+(\.\d+)?$/.test(token)) { // Parse number
            return Number(token);
        } else if (/^"(?:\\.|[^\\"])*"$/.test(token)) { // Parse string
            return JSON.parse(token);  // Use native JSON.parse to handle string escaping
        } else {
            throw new SyntaxError('Unexpected token: ' + token);
        }
    }

    const tokens = tokenize(jsonString);
    const result = parseValue(tokens);

    if (tokens.length !== 0) {
        throw new SyntaxError('Unexpected token after JSON input');
    }

    return result;
}

const jsonString = '{"name": "John", "age": 30, "city": "New York"}';

const jsonObject = myJSONParse(jsonString);

console.log(jsonObject); // Should output the parsed JavaScript object.