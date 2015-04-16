This repository contains a skeleton for the frontend module of the guestbook application. [AngularJS] [1] is used as main JavaScript framework, [Bootstrap] [2] for styling, and [Grunt] [3] to assist development and run tests.

[1]: https://www.angularjs.org
[2]: http://getbootstrap.com/
[3]: http://gruntjs.com/

# Prerequisites

* [nodejs] [4] installed
* grunt-cli installed (run `npm install grunt-cli`)
* Any text editor
* A browser ready for debugging JavaScript. Chrome out of the box, or Firefox with Firebug installed.

[4]: https://nodejs.org/

# Running the webapp

* `git clone https://github.com/kmkr/angular-ws.git`
* `cd angular-ws`
* `npm install`
* `grunt serve`

A browser window will be spawned and the application displayed.

# Persistence

The application supports both mocked (fake) and service calls to the Dropwizard backend. The latter assumes Dropwizard is available via `http://0.0.0.0:8080`. All calls to `/guestbook/*` is relayed to the backend via the proxy. Ensure you don't use host:port in your XHR/Ajax calls/urls, as they will fail due to [cross origin errors] [5]. Let the proxy handle the relay from frontend to backend.

[5]: https://en.wikipedia.org/wiki/Same-origin_policy

# Running tests

Unit tests runs continuously by `grunt dev`. The server can run concurrently to get quick feedback on failing tests while developing.

Use `grunt test` for one-time test runs.

# API

(fetched from guestbook repo)

## Create
`"POST" "/guestbook" -d $'{"name":"Test"}'`

## List all
`"GET" "/guestbook/list"`

## List all Open
`"GET" "/guestbook/list/open"`

## Fetch a single
`"GET" "/guestbook/{guestBookId}"`

## Open
`"PUT" "/guestbook/{guestBookId}/open"`

## Close
`"PUT" "/guestbook/{guestBookId}/close"`

## Entry

## Create entry
`"POST" "/guestbook/{guestBookId}/entry" -d $'{"name":"Test", "email":"test@test.se","message":"Det här skriver vi"}'`

## Get entry
`"GET" "/guestbook/{guestBookId}/entry/{id}"`

## Delete entry
`"DELETE" "/guestbook/{guestBookId}/entry/{id}"`

## Update status for entry
`"PUT" "/guestbook/{guestBookId}/entry/{id}/{status}`

## List entries
`"GET" "/guestbook/{guestbookId}/entries"`

## List all readable entries
`"GET" "/guestbook/{guestbookId}/entries/readable"`

## List all unreadable entries
`"GET" "/guestbook/{guestbookId}/entries/un_readable"`
