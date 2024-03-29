# Overview

[Fillout.com](http://Fillout.com) is a powerful form builder, which stores responses to your online form submissions. Create a simple REST API server which interacts with [Fillout.com’s API](https://www.fillout.com/help/fillout-rest-api)  to fetch form responses, but with an option to filter based on certain answers. Afterwards, host it on any free hosting provider of your choice (we like [render.com](http://render.com) or https://railway.app/), so we can test it.

Please use the following API key to fetch responses from a demo account we’ve set up: `sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912`, with this demo form ID: `cLZojxk94ous`

## Server specifications

Your server only needs to implement one endpoint, for fetching responses from a form, but with filters. Your endpoint should mirror the [existing responses endpoint of our API](https://www.fillout.com/help/fillout-rest-api#d8b24260dddd4aaa955f85e54f4ddb4d), except will have a new parameter for filtering. Please use NodeJS. We prefer Express.js, but you can use other frameworks if you’d like.


## Start the node server
- Install the dependencies: `npm install`
- Start the server: `npm start`

### **Request:**

- Path: `/{formId}/filteredResponses`
- Method: `GET`
- Query parameters: same as our [responses endpoint](https://www.fillout.com/help/fillout-rest-api#d8b24260dddd4aaa955f85e54f4ddb4d), except for a new `filters` parameter (JSON stringified):

```
type FilterClauseType = {
	id: string;
	condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
	value: number | string;
}

// each of these filters should be applied like an AND in a "where" clause
// in SQL
type ResponseFiltersType = ResponseFilter[];
```
​
💡
Note: Fillout forms sometimes have things other than question answers in the responses, but you can assume for this assignment, that the ids to filter by will only ever correspond to form questions, where the values are either string, number, or strings which are ISO dates

### Response:

Same response type as the Fillout Rest API Responses endpoint, just filtering out the responses that don’t match the filters.

Note that this means you’ll need to make sure the pagination still works, in the response (i.e. the `totalResponses` and `pageCount` )

## Example:

Given a sample list of responses like this (this response doesn’t match the ones you have on the test account exactly):

```tsx
{
	"responses": [
		{
			"questions": [
				{
					"id": "nameId",
					"name": "What's your name?",
					"type": "ShortAnswer",
					"value": "Timmy"
				},
				{
					"id": "birthdayId",
					"name": "What is your birthday?",
					"type": "DatePicker",
					"value": "2024-02-22T05:01:47.691Z"
				},
			],
			"submissionId": "abc",
			"submissionTime": "2024-05-16T23:20:05.324Z"
			// please include any additional keys
		},
	],
	"totalResponses": 1,
	"pageCount": 1
}

```

**Input:**

```
[
	{
		id: "nameId",
		condition: "equals",
		value: "Timmy",
	},
	{
		id: "birthdayId",
		condition: "greater_than",
		value: "2024-02-23T05:01:47.691Z"
	}
]

```

Output:
No responses are returned, because even though Timmy matches the name, but the birthday is not greater than the one in our filter.