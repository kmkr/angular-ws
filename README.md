This repository contains a skeleton for the frontend module of the guestbook application. [AngularJS](angularjs.org) is used as main JavaScript framework, [Bootstrap](http://getbootstrap.com/) for styling, and [Grunt](http://gruntjs.com/) to assist development and run tests.

# Prerequisites

* [nodejs](https://nodejs.org/) installed
* grunt-cli installed (run `npm install grunt-cli`)
* Any text editor
* A browser ready for debugging JavaScript. Chrome out of the box, or Firefox with Firebug installed.

# Running the webapp

* `git clone https://github.com/kmkr/angular-ws.git`
* `cd angular-ws`
* `npm install`
* `grunt serve`

A browser window will be spawned and the application displayed.

# Running tests

`grunt dev`

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
