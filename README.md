# Snacctime

> [!warning]
> This project is very much in early development right now.
> There is currently no stable release yet and there will be lots of breaking changes!

## Roadmap
```mermaid
timeline
    title Roadmap
    section V1
    Pocketbase ✔
        : Setup ✔
        : Create basic database layout ✔
        : Create tables in PocketBase ✔
    User
        : Login UI ✔
        : Creation UI
    Functionality
        : Create orders ✔
        : Add article to order
        : Complete order
    Server managment
        : UI Elements 
        : Api service
    Automation
        : CI/CD tests
        : CI/CD build
    section V2
    User attributes 
        : Department 
        : GeoPosition (Floor, Room, etc.)
    User groups 
        : UI Elements
        : Permissions
        : Acces to order based on group
```

## Design Philosphy
- Text: `#EAE9FC` $\textcolor{#EAE9FC}{⬤}$
- Background: `#140047` $\textcolor{#140047}{⬤}$
- Primary: `#FCAD64` $\textcolor{#FCAD64}{⬤}$
- Secondary: `#020024` $\textcolor{#020024}{⬤}$
- Accent: `#FF808E` $\textcolor{#FF808E}{⬤}$
  
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
