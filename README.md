# MAMY — flight reservation system

Bachelor's team project (German University in Cairo). A MERN-stack web application in which an administrator manages flights and users search, reserve seats and pay for them.

- **Backend** (`MAMY/Backend`): Node + Express, MongoDB via Mongoose, `bcrypt` password hashing, Stripe payments, e-mail confirmations with Nodemailer. Routes for admin, home and user.
- **Frontend** (`MAMY/frontend`): React with Stripe Elements for checkout.

```bash
cd MAMY/Backend  && cp .env.example .env && npm install && node app
cd MAMY/frontend && npm install && npm start
```

`.env` needs a MongoDB connection string (`URI`) and a `PORT`. Admin login for the demo data: `Admin` / `Admin123`.

Known rough edge from the original project: searching by date is unreliable. The code is kept as it was submitted.

---

## Deutsch

# MAMY — Flugreservierungssystem

Bachelor-Teamprojekt (German University in Cairo). Eine MERN-Webanwendung, in der ein Administrator Flüge verwaltet und Nutzer Flüge suchen, Sitzplätze reservieren und bezahlen.

- **Backend** (`MAMY/Backend`): Node + Express, MongoDB über Mongoose, Passwort-Hashing mit `bcrypt`, Stripe-Zahlungen, E-Mail-Bestätigungen mit Nodemailer.
- **Frontend** (`MAMY/frontend`): React mit Stripe Elements für den Checkout.

`.env` braucht einen MongoDB-Verbindungsstring (`URI`) und `PORT`. Admin-Login für die Demodaten: `Admin` / `Admin123`.

Bekannte Ecke aus dem Originalprojekt: Die Suche nach Datum ist unzuverlässig. Der Code ist so belassen, wie er abgegeben wurde.
