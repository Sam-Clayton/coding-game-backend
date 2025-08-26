import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.token' });
const apiKey = process.env.apiKey

const userSubmission = `function addNumbers(a, b) {
    return a + b
}
    
console.log(addNumbers(1, 2) === 3 ? 'PASS' : 'FAIL')`

const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions',
  params: {
    base64_encoded: 'true',
    wait: 'true',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    language_id: 63,
    source_code: Buffer.from(userSubmission).toString("base64")
  }
};

try {
	const response = await axios.request(options);
    //console logs for testing purposes - remove before going live
    console.log(response.data);
	console.log(Buffer.from(response.data.stdout, "base64").toString("utf-8"));
} catch (error) {
	console.error(error);
}