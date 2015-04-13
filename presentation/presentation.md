

















# Historie

    0.9.0 -------- 1.0.0 -------- 1.3.15

    2010            2012           2015
































# Angular

- Rammeverk for single page webapp
- MV*
- Two-way databinding via _scopes_
- Egen Ajax-abstraksjon
- Egen routing
- Dependency injection
- Templating med _expressions_








































# Angular kodeeksempler

1. Expressions
    context, forgiving, ingen loops/exceptions
2. Controller med ng-model / ng-click
3. Controller med sub-controller (child scope / scope inheritance)

































# Konsepter

- Model / view
    Det som skjer i modellen oppdateres automatisk i view
- Arkitektur
    !arkitektur.png!









































# Konsepter 2







## Modul

Gruppering av komponenter

Typisk gruppering:

- Komponenter som tilsammen løser problem X
- Komponenter som tilbyr feature Y

```javascript
    angular.module('guestbookApp', [
        'guestbooksModule',
        'entriesModule'
    ]);
```

## Controller

- Knytning mellom view og business-logikk
- Ingen DOM-manipulering i controllers

## `guestbooks/guestbooks-controller.js`

```javascript
    angular.module('guestbooksModule')
    .controller('GuestbooksController', function () {
        this.guestbooks = [
            { id: 1, name: 'A guestbook' },
            { id: 2, name: 'Another guestbook' },
        ]
    });
```

## Oppgave 1: Vis liste over guestbooks

Hint:

- Bruk gjerne mappe "guestbooks" og modul "guestbooksModule".
- Husk `ng-app` i `index.html`
- Tilgang til controller (fra `index.html`):

```html
<div ng-controller="GuestbooksController as guestbooksCtrl"></div>
```

- Bruk `ng-repeat` til å skrive ut navn på hver guestbook:

```html
<ul>
    <li ng-repeat="guestbook in guestbooksCtrl.guestbooks">
        {{guestbook.name}}
    </li>
</ul>
```


























## Service

- View-uavhengig business-logikk
- Enkelt å teste
- Husk single-responsibility-principle

### `guestbooks/guestbook-service.js`

```javascript
angular.module('guestbooksModule')
.service('GuestbookService', function ($http) {
    this.get = function () {
        return $http.get('/guestbook/list')
            .then(function (response) {
                return response.data;
            });
    };
});
```

## Oppgave 2: Hent guestbooks asynkront

- Innfør en `service` til å hente data i stedet for å bruke hardkodet guestbook-array
- Husk at service returnerer et promise og ikke dataen direkte
- Utnytt angulars `$http`-service
- Utnytt dependency injection til å få tak i service:
- Sett gjerne opp mockdata, eller bruk faktisk backend


### `test/mock/guestbook-app-mock.js`

```javascript
angular.module('guestbookAppMock', ['guestbookApp', 'ngMockE2E'])
    .run(function ($httpBackend) {
        $httpBackend.whenGET('/guestbook').respond([
            {
                id: 1,
                name: 'My guestbook'
            },
            {
                id: 2,
                name: 'My other guestbook'
            }
        ]);
        $httpBackend.whenGET(/.*/).passThrough();
        $httpBackend.whenPOST(/.*/).passThrough();
    });
```


















## Oppgave 3: Opprett nye guestbooks

- Utvid `index.html` med mulighet til å opprette nye guestbooks
- Utvid `guestbook-service` med en metode `create()` som sender til backend
- Konfigurer mock for POST til `/guestbook`
- Oppdater intern guestbook-struktur i controller ved suksess

### `index.html`

```html
<!-- more -->
<form ng-submit="guestbooksCtrl.create()">
    <div class="form-group">
        <label>
            Navn
            <input ng-model="guestbooksCtrl.newGuestbook.name" />
        </label>
    </div>
    <button type="submit">Opprett</button>
</form>
<!-- more -->
```
### `guestbooks/guestbook-service.js`

```javascript
angular.module('guestbooksModule')
.service('GuestbookService', function ($http) {
    this.get = // ...

    this.create = function (guestbook) {
        return $http.post('/guestbook', guestbook);
    };
});
```

### `guestbooks/guestbooks-controller.js`

```javascript
angular.module('guestbooksModule')
.controller('GuestbooksController', function (GuestbookService) {
    var ctrl = this;

    // ...

    this.create = function () {
        GuestbookService.create(ctrl.newGuestbook)
            .then(function () {
                ctrl.guestbooks.push(ctrl.newGuestbook);
                delete ctrl.newGuestbook;
            });
    };
});
```

















# Routing

!routes.png!

- HTML5 (`/my-route`) eller hash (`/#my-route`)
- Egen modul/JavaScript-fil `angular-route`

### `guestbook-routing.js`

```javascript
angular.module('guestbookApp')
.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/guestbooks', {
            templateUrl: 'guestbooks/guestbooks.html',
            controller: 'GuestbooksController',
            controllerAs: 'guestbooksCtrl'
        })
        .otherwise({
            redirectTo: '/guestbooks'
        });
    }
]);
```


## Oppgave 4: Innfør routing

Hint:

- Lag en template av dagens guestbook-visning, `guestbooks/guestbooks.html`
- Bruk i stedet `<ng-view></ng-view>` i `index.html`
- Opprett fil `guestbook-routing.js` med routeoppsett


Rakk du ikke oppgave 3? Kjør:

`git stash -u`
`git checkout task_4`














## Routing 2 - resolving data


```javascript
// ..
.when('/guestbooks', // ...)
.when('/guestbooks/:id', {
    templateUrl: 'entries/entries.html',
    controller: 'EntriesController',
    controllerAs: 'entriesCtrl',
    resolve: {
        entries: function (EntryService, $routeParams) {
            return EntryService.get($route.current.params.id);
        }
    }
})
.otherwise(//...)
```

## Oppgave 5: Innfør "entries"

- Bruk gjerne mappe "entries" og modulen "entriesModule"
- Entries er tilknyttet en guestbook-instans, lag en `service` for å hente entries
- Sett gjerne opp mockdata, eller bruk faktisk backend
- Lag en `EntriesController` som henter entries ved hjelp av resolve via `service` du nettopp laget
- Utvid `guestbooks.html` med en lenke for hvert element:

```html
<a ng-href="#guestbooks/{{guestbook.id}}">
    {{guestbook.name}}
</a>
```


Rakk du ikke oppgave 4? Kjør:

`git stash -u`
`git checkout task_5`

















## Directive

- Gjenbrukbare view-komponenter
- Gjerne med business-logikk
- DOM-manipulering kan gjøres i directives

### `entries/entry-directive.js`

```javascript
angular.module('entriesModule')
.directive('entry', function () {
    return {
        link: function (scope) {
            console.log('Hello from ', scope.entry);
        },
        templateUrl: 'entries/entry.html',
        scope: {
            'entry': '='
        }
    };
});
```

### `entries/entry.html`

```html
<div>
    <h2>{{entry.name}}</h2>

    <p>{{entry.message}}</p>
</div>
```

## Oppgave 6: lag entry som et directive

- Vis "name" og "message" for hver entry ved hjelp av `directive` du nettopp laget.

Rakk du ikke oppgave 5? Kjør:

`git stash -u`
`git checkout task_6`

```html
<ul>
    <li ng-repeat="entry in entriesController.entries">
        <div entry="entry"></entry>
    </li>
</ul>
```

























## Oppgave 7: Oppdater entry

- Utvid `entry.html` med en form. Benytt `ng-model` til å knytte entry fra directive til template.

Rakk du ikke oppgave 6? Kjør:

`git stash -u`
`git checkout task_7`

```html
<div>
    <form ng-submit="update()">
        <h2>{{entry.name}}</h2>

        <textarea cols="50" rows="5" ng-model="entry.message"></textarea>
        <button type="submit">Oppdater</button>
    </form>
</div>
```

- Utvid `EntriesService` med en update-funksjon.
- Eksponer en `update()` funksjon i directive som delegerer til service

```javascript
angular.module('entriesModule')
.directive('entry', function (EntriesService) {
    return {
        link: function (scope) {
            scope.update = function () {
                EntriesService.update(scope.entry)
                    .then(function (response) {
                        alert('Successfully updated!');
                    })
                    .catch(function (err) {
                        alert('Oh no!');
                    });
            }
        },
        templateUrl: 'entries/entry.html',
        scope: {
            'entry': '='
        }
    };
});
```









# Ekstraoppgaver


1. Skriv jasmine-tester for `guestbook-service.js`, bruk `guestbook-app-test.js` som eksempel
2. Implementer lukking av guestbook. Se "Close" i `README.md`
3. Implementer statusoppdatering av entry. Se "Update status for entry" i `README.md`
4. Skriv jasmine-tester for `entry-directive.js`. Se "Testing directives" på [](https://docs.angularjs.org/guide/unit-testing)






















## Konsepter 3




Ting vi ikke rakk

- Factory
- Provider
- Constant
- Filter
- Integrasjonstesting med Protractor
- Animasjoner (ngAnimate)
- Flere angular-apps på samme webside
- I18n (angular-i18n)













# Angular fremover

Angular 2

- ATScript
- (Vesentlige) API-endringer
- Forbedre performance
- Bedre routing
- Økt grad av modularisering









