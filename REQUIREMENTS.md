# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index --> /products [GET]
- Show (args: product id) --> /products/:id [GET]
- Create (args: Product)[token required] -->  /products [POST]
- [OPTIONAL] Top 5 most popular products -->  /products/popular?limit=5 [GET]  default limit is 5
- [OPTIONAL] Products by category (args: product category) /products/category/:category

#### Users
- Index [token required] --> /users[GET]
- Show (args: id)[token required] --> /users/:id [GET]
- Create (args: User)[token required] --> Check Auth

#### Auth
- login --> [POST] body{email , password}
- signup --> [POST] body{first_name, last_name, email, password} // creates a new user

#### Cart
- Index  [token required] /cart            [GET]    --> returns list of products in cart
- Delete [token required] /cart/:productId [DELETE] --> removes product from cart
- Update [token required] /cart/:productId [PATCH]  --> update product quantity
- Add    [token required] /cart            [POST]   --> add product to cart  
- Order  [token required] /cart/order      [POST]   --> create order from cart 

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Schema
#### Product
- id
- name
- price
- description
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password
- email [Unique]

#### Orders
- id
- user_id ---> user
- status of order (active or complete)
- created_at
- completed_at

#### Order_Products
- order_id
- product_id
- quantity

#### Cart_Products
- owner_id --> User
- product_id --> Product
- quantity
