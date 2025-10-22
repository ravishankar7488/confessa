# 🕊️ Confessa — Anonymous Confession Platform

**Confessa** is a full-stack web application that allows users to share their thoughts and confessions **anonymously**.  
Every confession goes through an **admin approval system** before it is publicly visible, ensuring moderation and quality control.

---

## 🚀 Features

- 🔒 **Anonymous Confessions** — Users can share honest thoughts without revealing their identity.  
- 🧑‍⚖️ **Admin Approval System** — Each confession is reviewed by the admin before being displayed publicly.  
- 🔍 **Search Functionality** — Quickly search through public confessions using keywords.  
- 🧠 **Authentication** — Secure admin login powered by Passport.js.  
- 🌙 **Responsive UI** — Built with Bootstrap and EJS for a clean, minimal experience across all devices.  
- ☁️ **Cloud Hosted** — Deployed on Render with MongoDB Atlas for scalable data storage.  

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | HTML, CSS, Bootstrap, EJS Templates |
| **Backend** | Node.js, Express.js, Passport.js |
| **Database** | MongoDB, MongoDB Atlas |
| **Hosting** | Render |
| **Version Control** | Git, GitHub |

---

## ⚙️ Installation & Setup

To run **Confessa** locally on your system:

```bash
# Clone this repository
git clone https://github.com/ravishankar7488/confessa

# Navigate into the project directory
cd Confessa

# Install dependencies
npm install

# Create a .env file in the root directory and add:
# MONGODB_URI=<your-mongodb-atlas-connection-string>
# ADMIN_USERNAME=<your admin username>
# PASSWORD=<your password>

# Start the server
node index.js
