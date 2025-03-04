> s21-21-webapp

### Important 👈

- To use husky you need install the dependencies from the root folder

# 🎬 Backend - CineApp

## 🚀 How to Start the Backend

### 1️⃣ Remove node_modules

To avoid conflicts with old dependencies, delete the node_modules folder before installing:

```bash
rm -rf node_modules
```

Or use `npx nkill` to search for and remove `node_modules` across the entire project:

```bash
npx nkill
```

🔹 **Press the spacebar** to delete the selected `node_modules` folders.

### 2️⃣ Install Dependencies

From the **project root**, run:

```bash
pnpm install
```

Then, navigate to the backend folder:

```bash
cd apps/server
pnpm install
```

### 3️⃣ Start the Backend

Inside the `server` folder, run:

```bash
pnpm run start:dev
```

This will start the backend in **development mode** with hot reload, so it will automatically update when you make changes.

## 🎯 Summary of Commands

```bash
rm -rf node_modules  # Remove node_modules
pnpm install         # Install dependencies in the root
cd apps/server       # Navigate to the backend folder
pnpm install         # Install dependencies for the backend
pnpm run start:dev   # Start the backend in development mode
```

🚀 **Now the backend should be running!** 🎟️🎬
