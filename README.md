## Final Project - IDOR Attack Demonstration

**Name:** Sara Tuvian  
**Institution:** Azrieli College of Engineering Jerusalem

---

## Project Description

This project demonstrates a **Broken Access Control vulnerability**, specifically an **Insecure Direct Object Reference (IDOR)** attack.

The vulnerability was implemented in the **OWASP Juice Shop** application by adding a new endpoint that exposes order details without proper authorization checks.

The project demonstrates how an attacker can access another user's order by modifying the order ID parameter.

Example attack request:


GET /rest/order-details/2


This request allows a logged-in user to access orders belonging to other users.

---

## Vulnerability Type

Broken Access Control - IDOR (Insecure Direct Object Reference)

The vulnerability occurs because the server does not verify that the requested order belongs to the authenticated user.

---

## Vulnerable Code Location

The vulnerable code was implemented in:


routes/orderDetails.ts
server.ts
data/


The endpoint:


GET /rest/order-details/:id


returns order details without validating ownership.

---

## Logical Flow of the Attack

1. User logs into the system  
2. The server returns a valid authentication token  
3. The user requests:


GET /rest/order-details/1


4. The user modifies the ID parameter:


GET /rest/order-details/2


5. The server returns another user's order

This demonstrates an IDOR vulnerability.

---

## Demonstration

The vulnerability was demonstrated using:

- curl  
- Browser  
- Developer Tools  

Example:


curl -H "Authorization: Bearer TOKEN"
http://localhost:3000/rest/order-details/2


---

## Mitigation

A secure implementation should verify that:


order.userId == authenticatedUser.id


If the order does not belong to the user, the server should return:


403 Forbidden


The mitigation is demonstrated in the project report.

---

## Project Structure


juice-shop/

data/
routes/
frontend/
server.ts

01-final-project-idor-screenshots/

Final_Project_Report.pdf


---

## How to Run the Project

Clone the repository:


git clone <repository-link>
cd juice-shop


Install dependencies:


npm install


Run the server:


npm start


Open in browser:


http://localhost:3000


---

## Tools Used

- OWASP Juice Shop  
- Node.js  
- TypeScript  
- Express.js  
- SQLite Database  
- Ubuntu Linux Virtual Machine  
- curl  
- VS Code  

---

## Author

Sara Tuvian
