This README.md introduces the Learning Management System (LMS) Backend, a powerful API that provides authentication, authorization, and Razorpay payment gateway integration. The backend is built using Express, a popular web framework for Node.js, along with various essential packages to enhance functionality and security. The MongoDB database is used to store user information, courses, and lectures.

# 1. Authentication:
The LMS backend offers robust authentication capabilities, allowing users to register, login, logout, reset their password, update their profile, and change their password. For registration, users provide their essential details like name, email, and password, which are then securely hashed using bcrypt before being stored in the MongoDB database. The login process validates the user's credentials and generates a JSON Web Token (JWT) for subsequent authorized requests.

# 2. Authorization:
The backend employs a sophisticated authorization mechanism to ensure that only admin users have access to specific endpoints. Admin users are granted privileges to add, edit, and update courses and lectures. This authorization logic is enforced through middleware, checking the user's role stored in the JWT against the required permissions for each API endpoint.

# 3. Razorpay Payment Gateway Integration:
To enable seamless payment processing, the LMS backend integrates the Razorpay payment gateway. This allows users to make secure online payments for course enrollment. When a user initiates a payment request, the backend communicates with Razorpay's API, verifies the payment status, and processes the enrollment accordingly.

# 4. Essential Packages:
The backend utilizes several essential Node.js packages to enhance functionality and security. These packages include:

## nodemon:
Used for automatic server restarts during development to improve the development workflow.
## nodemailer: 
Enables sending emails for actions like password reset and account verification.
## multer: 
Handles file uploads for course materials, allowing users to upload lecture resources.
## morgan: 
Provides logging capabilities for API requests and responses, facilitating debugging and monitoring.
## mongoose: 
Acts as the Object Data Modeling (ODM) library, simplifying interactions with the MongoDB database.
## jsonwebtoken: 
Used for creating and verifying JSON Web Tokens, enabling secure authentication.
## email-validator:
Ensures valid email addresses during registration and verification processes.
## dotenv: 
Facilitates the use of environment variables for sensitive configurations, enhancing security.
## cors: 
Implements Cross-Origin Resource Sharing (CORS) to handle cross-origin requests securely.
## cookie-parser: 
Parses cookies from incoming requests, enhancing user session management.
## cloudinary: 
Integrates with the Cloudinary service to handle image and media storage for course materials.
## bcrypt: 
Used for hashing passwords before storing them in the database, ensuring user data security.
# 5. MongoDB Database:
The backend utilizes MongoDB, a NoSQL database, to store user data, course details, lecture materials, and payment information. MongoDB's flexibility and scalability make it an ideal choice for managing the data in an LMS application.

# Implemented Routes and Controllers:

## Authentication:

• **Register:** POST request to create a new user account.

• **Login:** POST request to authenticate and log in the user.

• **Logout:** POST request to invalidate the user session and log out.

• **Reset Password:** POST request to reset the user's password.

• **Update User:** PUT request to update user information.

• **Change Password:** PUT request to change the user's password.

• **Get Profile:** GET request to retrieve the user's profile information.

## Authorization:

Only admin users are authorized to access the following APIs:

• **Add Course:** POST request to create a new course.

• **Edit Course:** PUT request to update an existing course.

• **Update Course:** PATCH request to modify specific attributes of a course.

• **Add Lecture:** POST request to add a new lecture to a course.

• **Edit Lecture:** PUT request to update an existing lecture.

• **Update Lecture:** PATCH request to modify specific attributes of a lecture.

## Razorpay Payment:

• **Razorpay Integration:**
The Razorpay package is incorporated into the backend to integrate the Razorpay payment gateway. This package allows for secure payment transactions and offers a seamless checkout experience for users. The backend handles API calls to Razorpay, both for generating payment keys and verifying payment statuses.

• **Razorpay Key Management:**
The backend exposes an API endpoint to fetch the Razorpay API key, which is required for client-side interactions with the payment gateway. This API ensures that the client application securely receives the key for initializing the payment process.

• **Course Subscription | Buying:**
The LMS backend provides an API endpoint to handle course subscription or buying requests from users. When a user intends to subscribe or purchase a course, they send a request to this endpoint, which initiates the payment process through Razorpay. Upon successful payment, the user gains access to the subscribed course content.

• **Payment Verification:**
After the payment process is completed, the backend verifies the payment status with Razorpay. This ensures that only authenticated and successful payment transactions are considered valid, and users can access the subscribed course content.

• **Course Unsubscription:**
In addition to subscription, the backend also provides an API endpoint for handling course unsubscription. If a user decides to unsubscribe from a course or requests a refund, the backend communicates with Razorpay to process the refund, if applicable, and revokes the user's access to the course content.
