# structure

main app in app component, admin functionality as components.

# auth

at first two-tier authorisation was considered (special admins group), but then in accordance with bus stop info signs: the main view should be public, only one extra tier (~admins) for management and check-in.

# resources

- https://auth0.com/docs/libraries/auth0-single-page-app-sdk
- https://community.auth0.com/t/angular-and-net-6-integrated/124647 and https://auth0.com/docs/quickstart/spa/angular/02-calling-an-api?_gl=1*1ps7fdf*_gcl_au*MTQwODIzMDA1MC4xNzM0ODY5MTMx*_ga*MTY2MTE2MDI1NS4xNzM0ODY5MTMy*_ga_QKMSDV5369*MTczNTQ3OTcyMi40LjEuMTczNTQ4MzYyNC42MC4wLjA. (for authorizationt oekn/audience setup questions)/also reference from auth0 perspective as far as flows in general https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-pkce

# learnings

not always using DTOs on client side, instead relying on form functionality to shape data here and let backend take over the validation

# id-base

update forms refer to ids but it would be better to get relevant object

# changes to make application easier

remove validity start/stop as required fields on the schedule. now schedules are simply set for date/times (per stop). this lends itself to the event management idea: fewer reocurring events, more single events, however, which is a nice side effect for my purposes.