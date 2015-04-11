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









# Konsepter 2

## Modul

Gruppering av komponenter

Typisk gruppering:

- Komponenter som tilsammen løser problem X
- Komponenter som tilbyr feature Y

```javascript
    angular.module('guestbookApp', [
        'myDependency1',
        'myDependency2'
    ]);
```

## Controller

- Knytning mellom view og business-logikk
- Ingen DOM-manipulering i controllers

```javascript
    angular.module('guestbookApp')
    .controller('ListGuestbooksController', function () {
        this.guestbooks = [
            { id: 1, name: 'A guestbook' },
            { id: 2, name: 'Another guestbook' },
        ]
    });
```

## Service

- View-uavhengig business-logikk
- Husk single-responsibility-principle
- Enkelt å teste

```javascript
    angular.module('guestbookApp')
    .service('GuestbookService', function ($http) {
        this.get = function () {
            return $http.get('/guestbook/list')
                .then(function (response) {
                    return response.data;
                });
        };
    });
```

## Directive

- Gjenbrukbare view-komponenter
- Gjerne med business-logikk
- DOM-manipulering kan gjøres i directives

```javascript
    angular.module('guestbookApp')
    .directive('guestbookLink', function (GuestbookService) {
        return {
            link: function (scope) {
                scope.clickHandler = function () {
                    alert('I was clicked');
                };
            },
            template: '<span ng-click="clickHandler()">{{guestbook.name}}</span>',
            scope: {
                'guestbook': '='
            }
        };
    });
    ```














## Andre

- Factory
- Provider
- Constant
- Filter





# Arkitektur

!arkitektur.png!








# Oppgaver

1. Lag en liste over guestbooks
    - Hent guestbook-array fra `controller`
    - Bruk `ng-repeat` til å skrive ut navn på hver guestbook

2. Hent guestbooks asynkront
    - Innfør `service` i stedet for å bruke hardkodet guestbook-array
    - Utnytt angulars `$http`-service
    - Bruk mock-data under utvikling

4. km: Legg til en lenke for hvert liste-element
    - `routing`
    (prøv og merge fra branch)

5. Lag visning av en enkelt guestbook med entries
    - `controller`
    - `service`
    - `ng-repeat`

6. Skriv et directive for hver entry
    - `directive`

7. Skriv jasmine-tester for controller X
    `karma`,  `jasmine`
    `grunt dev`

8. Skriv jasmine-tester for directive

9. Integrasjonstesting med Protractor

# Angular fremover

Angular 2

- ATScript
- (Vesentlige) API-endringer
- Forbedre performance
- Bedre routing
- Økt grad av modulariseringd
