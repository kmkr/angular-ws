# Historie

    0.9.0 -------- 1.0.0 -------- 1.3.15

    2010            2012           2015

# Angular

- Rammeverk for single page webapp
- MV*
- Two-way databinding

# Kode-intro

- Arkitektur

Vis HTML med:

1. Expressions
2. Controller med ng-model / ng-click
3. Controller med sub-controller (child scope / scope inheritance)

# Konsepter

- Model / view
    Det som skjer i modellen oppdateres automatisk i view

# Konsepter 2

## Modul

Gruppering av komponenter. Typisk gruppering: komponenter som tilsammen løser problem X eller tilbyr feature Y.

## Controller

Knytning mellom view og business-logikk. Ingen DOM-manipulering her.

## Directive

Gjenbrukbare view-komponenter, gjerne med business-logikk. DOM-manipulering kan gjøres i directives.

## Service

View-uavhengig business-logikk.

## Andre

- Factory
- Provider
- Constant
- Filter

# Konsepter 3

- Dependency injection
- Scope

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
