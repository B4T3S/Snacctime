# Snacctime

> [!warning]
> This project is very much in early development right now.
> There is currently no stable release yet and there will be lots of breaking changes!

## Roadmap
- [x] Set up PocketBase
- [x] Create basic database layout (might need some tweaks)
- [x] Create tables in PocketBase
- [x] Setup login
- [ ] Setup user creation
- [ ] Setup CI/CD for android builds
- [ ] Setup basic app functionality
    - [x] Create orders
    - [ ] Add articles to orders
    - [ ] Complete Orders
- [ ] Release V1 :tada:

- [ ] Add Grouping system
- [ ] Add Room information

## Design Philosphy
- Text: ![#EAE9FC](https://placehold.co/15x15/EAE9FC/EAE9FC.png) `#EAE9FC`
- Background: ![#140047](https://placehold.co/15x15/140047/140047.png) `#140047`
- Primary: ![#FCAD64](https://placehold.co/15x15/FCAD64/FCAD64.png) `#FCAD64`
- Secondary: ![#020024](https://placehold.co/15x15/020024/020024.png) `#020024`
- Accent: ![#FF808E](https://placehold.co/15x15/FF808E/FF808E.png) `#FF808E`
  
[RealtimeColors pallette](https://www.realtimecolors.com/dashboard?colors=eae9fc-140047-fcad64-020024-ff808e&fonts=Poppins-Poppins)

## Database Layout
```mermaid
erDiagram
    User ||--o{ Order : starts
    User ||--|| Group : has
    Order ||--|{ ArticleInOrder : has
    ArticleInOrder ||--|| Article : has
    Article ||--o{ Tag : has
    Category ||--|{ Article : contains

    User {
        string email
        string name
        file avatar
    }

    Group {
        string name
        file icon
        bool public
    }

    Order {
        user creator
        bool completed
    }

    Article {
        string name
        float price
        file image
    }

    ArticleInOrder {
        int quantity
        int quantity_done
        string note
    }

    Category {
        string name
    }

    Tag {
        string name
    }
```
