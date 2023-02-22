# armwrestlingBook

Armwrestlingbook 2022

![Printscreen-Website](https://github.com/hvpetrow/Angular/blob/main/armwrestlingbook/client/src/assets/Printscreen2.png)

Small forum,blog,info web app about armwrestling.
Using Angular for front-end, Firebase as backend, css files for styling.

Short info and functionalities:

## Architecture

Components:

-   Authentication: auth module - contains Login, Register and MyTopics components.
-   Contests: contest module - contains AllTopics,Comments,Create,Details,Edit,Search and TopicTemplate components.

    -   AllTopics - logic and implementation for loading all topics in app.
    -   Create - logic,form and implementation for creation of new topic.
    -   Edit - logic,form and implementation for editing a topic.
    -   Details - shows details of a topic(likes,comments,additional info for the topic) and likes logic and implementation.
    -   Comments - logic,form and implementation for additing and deleting of the comments.
    -   Search - logic,search bar and implementation for the searching.
    -   TopicTemplate - template of the topic.

-   Core: core module - contains Footer ,Header components and guards.
-   Home: home module - contains Home and TopicCard components.
-   Pages: page module - contains PageNotFound component.
-   Shared: shared module - contains date-transform pipe.
-   Others:
    -   interfaces - Topic interface.
    -   services - authService and topicService.

Visitors can see:

-   Latest topics on home page.
-   All topics on all topics page.
-   Also can searching topics on search page.
-   See additional info for the topic(with hovering on the picture).
-   Login/Register theirselves.

Registered / Logged-in Users can also:

-   Add topics and edit/delete their topics.
-   See all comments; add/delete their comments below each post.
-   Like topic and cancel their likes for the topic.
-   See their own topics(my-topics).
-   Search topics by title.
-   Logout theirselves.

### General Functionality

-   Authenticate users via Firebase
-   CRUD Topics
-   CR\*D Comments on topics (no updating implemented)
-   GET and display list of topics
-   My Topics
-   Search for keywords in Topic titles
