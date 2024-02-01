# snacctime

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
