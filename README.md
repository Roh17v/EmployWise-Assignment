# 📘 User Profiles Management - React App

## 📌 Project Overview

This is a **React-based user profile management application** that allows users to:

- Log in using authentication
- View user profiles fetched from an API
- Edit user details
- Delete users with confirmation prompts
- Paginate through user lists
- Display loading skeletons while fetching data
- Use a dropdown menu for actions (Edit/Delete) with outside click detection

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ **Install Dependencies**

```bash
npm install
# or
yarn install
```

### 3️⃣ **Run the Project**

```bash
npm start
# or
yarn start
```

The application will start at `http://localhost:3000/`

---

## ⚙️ **Project Structure**

```
📂 your-repo
│── 📂 src
│   ├── 📂 components  # Reusable UI components (Navbar, Buttons, etc.)
│   ├── 📂 pages       # Main pages (Login.js, Home.js, Profile.js, etc.)
│   ├── 📂 context     # Global state management (if used)
│   ├── 📂 utils       # Helper functions
│   ├── 📄 App.js      # Main App component
│   ├── 📄 index.js    # React entry point
│── 📄 package.json    # Dependencies & scripts
│── 📄 README.md       # Documentation
```

---

## 🔧 **Available Scripts**

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `npm start`     | Runs the app in development mode            |
| `npm run build` | Builds the app for production               |
| `npm test`      | Runs tests (if any)                         |
| `npm run lint`  | Lints and fixes code issues (if configured) |

---

## 🔗 **API Endpoints**

### Authentication

```bash
POST /api/login
```

**Request Body:**

```json
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
```

**Response:**

```json
{
  "token": "QpwL5tke4Pnpja7X4"
}
```

### Fetch Users (Paginated)

```bash
GET /api/users?page=1
```

### Update User Details

```bash
PUT /api/users/{id}
```

### Delete User

```bash
DELETE /api/users/{id}
```

---

## ✅ **Features & Considerations**

- **User authentication with login form**
- **Token storage after successful login**
- **React Hooks (**`**, **`**, ****\`\`****)** for state management
- **Dropdown with outside click detection** to close menus properly
- **Skeleton loading indicators** for a better UX
- **Pagination system** for navigating between user lists
- **Edit and delete functionality with API integration**
- **Confirmation before deletion** using `window.confirm`
- **Basic styling using TailwindCSS**

---

## 🛠️ **Assumptions & Considerations**

- This project uses a **mock API (ReqRes.in)** and does **not persist changes**.
- The `PUT` request for updating users assumes the **API will accept the full user object**.
- The `DELETE` action **removes users only from local state**, not from the API.
- The authentication token is **stored temporarily in local storage or state**.
- TailwindCSS is used for styling but can be replaced with any CSS framework.

---

## 🎯 **Future Enhancements**

- Add **JWT-based authentication** for real backend integration
- Replace mock API with a **real backend & database**
- Implement a **dark mode** toggle
- Improve UI animations for a smoother experience

---

## 📜 **License**

This project is licensed under the **MIT License**.

---

## 📞 **Contact**

If you have any questions, feel free to reach out:

- **Your Name** - [Rohit Verma](https://github.com/Roh17v)
- **Email** - [rohitverma272727@gmail.com](mailto\:rohitverma272727@gmail.com)

