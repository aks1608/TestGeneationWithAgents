# OrangeHRM Test Plan

- **URL**: https://opensource-demo.orangehrmlive.com
- **Seed file**: seed.spec.ts
- **Credentials**: Admin / admin123 (via `ORANGEHRM_USERNAME` / `ORANGEHRM_PASSWORD` env vars)

---

## 1. Login

### 1.1 should display login page elements
- Navigate to `/web/index.php/auth/login`
- Verify username input is visible
- Verify password input is visible
- Verify login button is visible

### 1.2 should login successfully with valid credentials
- Navigate to login page
- Fill in valid username and password
- Click the login button
- Verify URL contains `/dashboard`
- Verify sidebar menu is visible

### 1.3 should show error for invalid credentials
- Navigate to login page
- Fill in invalid username and password
- Click the login button
- Verify error message contains "Invalid credentials"

### 1.4 should show error for empty username
- Navigate to login page
- Submit the form with empty username
- Verify required field error is shown

### 1.5 should show error for empty password
- Navigate to login page
- Submit the form with empty password
- Verify required field error is shown

### 1.6 should redirect to login page when accessing protected route unauthenticated
- Navigate directly to `/web/index.php/dashboard/index`
- Verify URL redirects to `/auth/login`

---

## 2. Dashboard

### 2.1 should display dashboard after login
- Login with valid credentials
- Verify URL contains `/dashboard`
- Verify sidebar and user dropdown are visible

### 2.2 should display user dropdown with admin name
- Login with valid credentials
- Verify user dropdown displays a non-empty name

### 2.3 should display quick launch widgets
- Login with valid credentials
- Verify at least one quick launch widget is present

### 2.4 should navigate to PIM module
- Login with valid credentials
- Click "PIM" in the sidebar
- Verify URL contains `/pim`

### 2.5 should navigate to Leave module
- Login with valid credentials
- Click "Leave" in the sidebar
- Verify URL contains `/leave`

### 2.6 should logout successfully
- Login with valid credentials
- Click user dropdown
- Click Logout
- Verify URL redirects to `/auth/login`

---

## 3. Employee List

### 3.1 should display employee list page after login
- Login and navigate to `/web/index.php/pim/viewEmployeeList`
- Verify employee table is visible
- Verify Add button is visible

### 3.2 should display records found label
- Login and navigate to Employee List
- Verify records found label matches format `(N Records)`

### 3.3 should show employee results when searching by name
- Login and navigate to Employee List
- Search for "Admin"
- Verify records found is not `(0 Records)`

### 3.4 should show no results for non-existent employee
- Login and navigate to Employee List
- Search for "ZZZNOBODYZZZZ"
- Verify records found shows `(0 Records)`
