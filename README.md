# API

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
