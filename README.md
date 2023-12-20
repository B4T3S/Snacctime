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
    USER ||--o{ ORDER : starts
    USER }o--|| ARTICLE_IN_ORDER : adds
    ORDER ||--|{ ARTICLE_IN_ORDER : has
    ARTICLE_IN_ORDER ||--|| ARTICLE : has
    CATEGORY ||--|{ ARTICLE : contains

    USER {
        string email
        string name
        file avatar
    }

    ORDER {
        user creator
        bool completed
    }

    ARTICLE {
        string name
        float price
        file image
    }

    ARTICLE_IN_ORDER {
        int quantity
        int quantity_done
        string note
    }

    CATEGORY {
        string name
    }
```
