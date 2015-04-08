# Prerequisites

* [node](https://nodejs.org/) installed and available on PATH.
* grunt-cli installed and available on PATH (see below).
* Text editor (e.g. Sublime, Vim, Emacs, IntelliJ, Webstorm, ...)
* Non-IE browser.

# Installing grunt-cli

* `npm install -g grunt-cli`

# How to run

`git clone https://github.com/kmkr/angular-ws.git`
`cd angular-ws`
`npm install`
`grunt serve`

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
