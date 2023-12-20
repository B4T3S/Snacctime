# snacctime

## Roadmap
- [x] Set up PocketBase
- [x] Create basic database layout (might need some tweaks)
- [ ] Create tables in PocketBase
- [ ] Setup login and user creation
- [ ] Setup CI/CD for android builds
- [ ] Setup basic app functionality
    - [ ] Create orders
    - [ ] Add articles to orders
    - [ ] Complete Orders
- [ ] Release V1 :tada:

## Database Layout
```mermaid
erDiagram
    User ||--o{ Order : starts
    Order ||--|{ ArticleInOrder : has
    ArticleInOrder ||--|| Article : has
    Category ||--|{ Article : contains

    User {
        string email
        string name
        file avatar
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
```
