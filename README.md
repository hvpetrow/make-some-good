# makeSomeGood

Make Some Good 2022 - https://makesomegood-73a4d.web.app/

![Printscreen-Website](https://github.com/hvpetrow/make-some-good/blob/main/src/assets/homePageDocumentation.png)
![Printscreen-Website](https://github.com/hvpetrow/make-some-good/blob/main/src/assets/photosForDocumentation.png)
![Printscreen-Website](https://github.com/hvpetrow/make-some-good/blob/main/src/assets/testPhotosForDocumentation2.png)

Web app for users easily share good causes, discuss them and make good things.
Front-end is built with HTML, CSS, React. For Back-end uses Firebase.

Short info and functionalities:

## Architecture

Components:

-   Authentication: Login, Register, Logout ,ChangePassword, ForgotPassword components.
-   Causes: Catalog, Comments, CreateCause, Details, EditCause, MyCauses(which contains JoinedCauses and MyCreatedCauses components) and RemoveCause components.
-   Home: Home, CardTemplate, HeroOfMonth components.
-   Layout: Footer, Header components.
-   Pages: Donate, Page404 (static)components.
-   Search: Search, SearchElement components.
-   User: ForeignProfile, MyProfile components.
-   Shared: CarouselItem, Slider, BackToTheTopButton, Spinner.

    -   Catalog - logic and implementation for loading all causes in app.
    -   CreateCause - logic,form and implementation for creation of a new cause.
    -   EditCause - logic,form and implementation for editing a cause.
    -   Details - shows details of a cause(joins,comments,additional info for the cause), comments and joins logic and implementation.
    -   Comments - logic,form and implementation for additing,editing and deleting of the comments.
    -   MyCreatedCauses - logic and implementation for personally created causes of the user.
    -   JoinedCauses - logic and implementation for personally joined causes of the user.
    -   RemoveCause - contains logic for removing a cause.
    -   Home - Home page which contains template for causes, carousel with latest 3 causes and heroes of the month(users with the most publications).

    -   Donate - page for donating.
    -   Search - logic,search bar and implementation for the searching.
    -   ForeignProfile - profile page of another user.
    -   MyProfile - profile page of the user.

    -   services - causesService, commentsService and crudService.
    -   guards - AuthenticatedGuard,UnAuthenticatedGuard, OwnerGuard.
    -   custom hooks -useChange, useInput, useTitle.

Visitors can:

-   Login/Register theirselves.
-   Recover their password on the forgot password page.
-   Latest 3 causes and heroes of the month on home page.
-   All causes on catalog page.
-   Also can searching causes on search page.
-   See additional info for the cause(details).
-   Donate on the donate Page.
-   See another users profiles.

Registered / Logged-in Users can also:

-   Create and edit/delete their causes.
-   See all comments; add, edit, delete their comments below each post.
-   Join cause and cancel their participation for the cause.
-   See their own created and joined causes.
-   See another users profiles and their own profiles.
-   Search causes by title.
-   Change their password.
-   Logout theirselves.

### General Functionality

-   Authenticate users via Firebase
-   CRUD Causes
-   CRUD Comments on causes
-   Join/Cancel Causes
-   GET and display list of causes
-   Latest 3 causes
-   All causes
-   My causes
-   Joined causes
-   Another user profile
-   My profile
-   Add, Change profile picture
-   Change user password
-   Recover user password
-   Hero of month
-   Search for title keywords and display Causes
