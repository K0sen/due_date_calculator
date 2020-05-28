# due_date_calculator

Usage:
  - init with `npm i`
  - run the server `npm start`
  - send a request to the server (for example with curl: `curl -X GET 'http://127.0.0.1:3000/api/calculate?date=1590406518488&turnaround=-1'`)

*Notice:*
  - server expects GET request on '/api/calculate' endpoint with 'date' and 'turnaround' parameters
  - 'date' should be a valid timestamp value
  - 'turnaround' should be a positive number starting from 0
  
 
