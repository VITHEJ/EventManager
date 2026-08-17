# 🎫 EventManager

A web-based **Event Management System** designed to simplify the process of creating events, managing participants, and handling event registrations.

The application provides separate functionalities for **Coordinators** and **Participants**, making it easier to organize events and keep track of registered participants.

---

## 📌 Features

### 👤 User Authentication

* User signup and login
* Secure session-based authentication
* Role-based access for:

  * **Coordinator**
  * **Participant**

### 🎯 Coordinator Features

* Create and host events
* Edit existing events
* View event details
* Track registered participants
* Manage events through a dedicated interface

### 🙋 Participant Features

* Browse available events
* View event details
* Register for events
* Cancel event registration
* Track registered events

### 🔐 Session Management

* User sessions are maintained using cookies.
* Authentication ensures that users can access features according to their role.

### 🗄️ Database

* MongoDB is used for storing application data.
* MongoDB Atlas can be used as the cloud database.
* Event, user, and participant information is managed through database schemas.

---

## 🛠️ Tech Stack

| Technology    | Purpose                                    |
| ------------- | ------------------------------------------ |
| HTML          | Structure of web pages                     |
| CSS           | Styling and layout                         |
| JavaScript    | Client-side functionality                  |
| Bootstrap     | Responsive UI components                   |
| EJS           | Server-side HTML templating                |
| Node.js       | Backend runtime                            |
| Express.js    | Web application framework                  |
| MongoDB       | Database                                   |
| MongoDB Atlas | Cloud database                             |
| Git & GitHub  | Version control and source code management |

---

## 🏗️ Project Architecture

```text
                    ┌───────────────────┐
                    │      Browser      │
                    │ HTML / CSS / JS   │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    Express.js     │
                    │      Server       │
                    └─────────┬─────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
        ┌─────────────────┐       ┌─────────────────┐
        │      EJS        │       │   Application   │
        │     Views       │       │     Logic       │
        └─────────────────┘       └────────┬────────┘
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │     MongoDB     │
                                  │     Database    │
                                  └─────────────────┘
```

---

## 📂 Project Structure

```text
EventManager/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── schema/
│   └── Database schemas
│
├── views/
│   ├── EJS templates
│   └── UI pages
│
├── app.js
├── schema.js
├── cloudconfig.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## ⚙️ How It Works

The basic workflow of the application is:

```text
User
  ↓
Signup / Login
  ↓
Authentication
  ↓
Identify User Role
  ↓
 ┌─────────────────────┐
 │                     │
 ▼                     ▼
Coordinator         Participant
 │                     │
 ▼                     ▼
Create/Edit         Browse Events
Events              │
 │                  ▼
 ▼               Register
Track              │
Participants       ▼
                Cancel Registration
```

### Coordinator Workflow

1. Coordinator creates an account or logs in.
2. Coordinator creates an event.
3. Event information is stored in MongoDB.
4. Participants can view the event.
5. Participants register for the event.
6. Coordinator can view and track registered participants.

### Participant Workflow

1. Participant creates an account or logs in.
2. Participant browses available events.
3. Participant selects an event.
4. Participant registers for the event.
5. Registration information is stored in the database.
6. Participant can cancel the registration when required.

---

## 🗃️ Database

The application uses **MongoDB** as its database.

The database is responsible for storing information such as:

* User details
* Event details
* Event registrations
* Participant information

MongoDB is suitable for this project because its document-oriented structure works well with JavaScript and Node.js applications.

---

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/VITHEJ/EventManager.git
```

### 2. Navigate to the Project

```bash
cd EventManager
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file and add your required configuration values.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

> Never commit your `.env` file or database credentials to GitHub.

### 5. Start the Application

```bash
node app.js
```

If your project uses a development script, you can also run:

```bash
npm start
```

### 6. Open in Browser

```text
http://localhost:3000
```

---

## 🌐 Live Demo

The application can be accessed here:

**EventManager:**
https://eventmanager-1-92td.onrender.com

---

## 🔑 Main Functional Modules

### 1. Authentication Module

Handles:

* Signup
* Login
* Logout
* User sessions
* Role-based access

### 2. Event Management Module

Allows coordinators to:

* Create events
* Edit events
* Manage event information
* Monitor registrations

### 3. Registration Module

Allows participants to:

* Register for events
* Cancel registrations
* View their event participation

### 4. Participant Tracking Module

Coordinators can monitor the participants registered for their events.

---

## 🔒 Security Considerations

The application uses authentication and session management to restrict access to protected functionality.

Important security practices include:

* Keeping database credentials in environment variables
* Using session-based authentication
* Restricting coordinator functionality to authorized users
* Preventing sensitive configuration files from being committed

---

## 💡 Future Enhancements

The project can be further improved by adding:

* 📧 Email notifications for event registrations
* 🔔 Event reminders
* 📱 Improved mobile responsiveness
* 📊 Coordinator dashboard with event statistics
* 🔎 Event search and filtering
* 🖼️ Event image uploads
* 📅 Calendar integration
* 🔐 Password hashing and stronger authentication
* 🎟️ QR-code based event check-in
* ☁️ Improved cloud deployment and monitoring

---

## 🎓 Learning Outcomes

Through this project, the following concepts were implemented and practiced:

* Full-stack web development
* Node.js backend development
* Express.js routing
* EJS server-side rendering
* MongoDB database integration
* CRUD operations
* Authentication and sessions
* Role-based access control
* REST-style application design
* Frontend and backend integration
* Cloud database usage
* Deployment of a web application

---

## 👨‍💻 Author

**VITHEJ**

* GitHub: https://github.com/VITHEJ

---

## ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is developed for educational and academic purposes.
