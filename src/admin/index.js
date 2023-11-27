const req = require('request');

const createCard = (model = '/conf/portal/settings/dam/cfm/models/cardguide', title = 'test') => {

  const card = `{
    "properties": {
      "cq:model": "${model}",
      "title": "${title}",
      "description": "string",
    
      "elements": {
        "title": {
          "value": "Hello",
          ":type": "text/html"
          }
        },
       "titleTag" : {
        "value":"h4",
        ":type:": "text/html"
       }
    }
  }`;


};

const getCard = (fragment = 'https://author-p124331-e1227315.adobeaemcloud.com/api/assets/trane-portal/site/en/home/components/hvac-getting-started.json') => {
  // const h = context.serviceURL !== context.defaultServiceURL && !context.serviceURL.includes('publish-') ? {
  //   'Authorization': `Bearer  ${context.auth}`,
  //   'Content-Type': 'text/html'
  // } : {
  //   'Content-Type': 'text/html'
  // };

  const auth = 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MDExMDAyMjI5NjhfMDFkNmQxODEtOTJlOC00ZmU0LTkwOWEtYTRiYmQ5ODcwZjUwX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZXYtY29uc29sZS1wcm9kIiwidXNlcl9pZCI6IjgxRTYyMDAwNjMxQzA4MTUwQTQ5NUU2Q0A3ZmZmMWY2ZTYzMWMwNGNjNDk1ZmIzLmUiLCJzdGF0ZSI6IkZoR1hjN0FCdzN5YXNuRFdSTWQ2UUlXWiIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiNkI2QjM5Rjc1NkFCQjk5RTdGMDAwMTAxQGFkb2JlLmNvbSIsImN0cCI6MCwiZmciOiJYN05aTVFHT1hQUDc0SFVLSE1RVjJYQUFPWT09PT09PSIsInNpZCI6IjE3MDExMDAyMjIzOThfMzZkZGQwMmUtOGQxNS00Njc3LTk2ZTktMzdjN2U2MGVjNWZhX3V3MiIsInJ0aWQiOiIxNzAxMTAwMjIyOTY5XzRkZWMyMDkyLTI5YWMtNDE1MS1iMTNlLTRhMjg4Y2M3ODA1NF91ZTEiLCJtb2kiOiI0NjU0ZTE1MyIsInBiYSI6Ik1lZFNlY05vRVYsTG93U2VjIiwicnRlYSI6IjE3MDIzMDk4MjI5NjkiLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJjcmVhdGVkX2F0IjoiMTcwMTEwMDIyMjk2OCIsInNjb3BlIjoiQWRvYmVJRCxvcGVuaWQscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCJ9.ARoqSpd2xoaE_9ohy27Ou_7DCvqIk3znhWjD6Ck8rs90a7t3YwqO1ThbtdK3GzQzgyGn2bC7oAZxvL_TkmtvTwfdbn7i9schG2PONYgmLfah4OMXGn76hBv1ZsgE6pXQlRFUI4MABn3VUPUBgqodPK0GtOHNChBMuYuyMkRQ1vbWjKNIjdK---5ZKA-avd4zufvr9BH79Jh3hP0tvCZi2wKKfqE05GGFrgSwP_qQi_n8NFaMaLSZxY7II7bDXDKG9nVZREkbKFEsOordJcSIJcd65tueu9fgyOgdadBxn2xuVS56uIEbghUTHCnp730NYPYGSnE_P65CDo83_u0oZg';
  const options = {
    url: fragment,
    method: 'GET',
    headers: {
      'Content-Type': 'text/html',
      'Authorization': `Bearer  ${auth}`
    },
    method: 'GET',
    credentials: 'include'
};

  req(options, (error, response, body) => {
    console.log(body);
    let json = JSON.parse(body);
    console.log(json);
  });
};

getCard();