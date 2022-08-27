# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 


## API Endpoints
#### Products
- Index --> /products [GET]
- Show (args: product id) --> /products/:id [GET]
- Create (args: Product)[token required] -->  /products [POST] body{price:number, name:string, category:string}
- [OPTIONAL] Top 5 most popular products -->  /products/popular?limit=5 [GET]  default limit is 5
- [OPTIONAL] Products by category (args: product category) /products/category/:category [GET]

#### Users
- Index [token required] --> /users[GET] // will hide password
- Show (args: id)[token required] --> /users/:id [GET] // will hide password
- Create (args: User) --> signup Check Auth Section below

#### Auth
- login --> /auth/login [POST] body{email , password} 
- signup --> /auth/signup [POST] body{first_name, last_name, email, password} // creates a new user // email is unique password is more than 6 chars


#### Cart
- Index  [token required] /cart            [GET]    --> returns list of products in cart
- Delete [token required] /cart/:productId [DELETE] --> removes product from cart
- Update [token required] /cart/:productId [PATCH]  --> update product quantity ---> body{quantity}
- Add    [token required] /cart            [POST]   --> add product to cart  ---> body{quantity,productid}
- Order  [token required] /cart/order      [POST]   --> create order from cart ---> body{}

#### Orders 
- Orders by user [token required] /orders [Get] 
- Complete an Order [token required] /orders/:orderid/complete [POST] // this may be not right however we don't have admins so i added it to test changing order state
- [OPTIONAL] Completed Orders by user [token required] /orders/completed [Get] 

## Schema
#### Product
- id [integer]
- name [varchar]
- price [decimal(10,2)]
- [OPTIONAL] category [varchar]

#### User
- id [integer]
- firstName [varchar]
- lastName [varchar]
- password [varchar]
- email [varchar] [Unique]

#### Orders
- id [integer]
- user_id [integer] ---> user
- status of order (active or complete) [integer]
- created_at [date]
- completed_at [date]

#### Order_Products
- order_id [integer]
- product_id [integer]
- quantity [integer]

#### Cart_Products
- owner_id [integer] --> User
- product_id [integer] --> Product
- quantity [integer]
