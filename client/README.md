# LMS Frontend

1. Set React App
   ...
   npm create vite@latest
   ...

2. Change Directory
   ...
   cd client
   ...

3. Install Dependencies
   ...
   npm i
   ...

4. Run The Server
   ...
   npm run dev
   ...

## Setup instruction of tailwind

1. Install Talwind
   ...
   npm install -D tailwindcss postcss autoprefixer
   ...

2. Create Tailwind Config File
   ...
   npx tailwindcss init
   ...

3. Add File Extension to Tailwind Config File
   ...
   "./index.html", "./src/\*_/_.{html,js,jsx,ts,tsx}"
   ...

4. Add to Talwind Directives at the top of the `index.css` file
   ...
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ...

5. To Add External library & framework once in Tailwind CSS We have to add plugin property in tailwind config
   ...
   plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
   ...

# Adding Plugins and Dependencies

...
npm i @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
...

# Configure Auto Import Sort eslint

1. Install simple import sort
   ...
   npm i -D eslint-plugin-simple-import-sort
   ...

2. Add rule in `.eslint.cjs`
   ...
   rules: {"...", "simple-import-sort/imports": "error"}
   ...

3. Add simple-import-sort plugin in `.eslint.cjs`
   ...
   plugins: ["simple-import-sort"]
   ...

4. To enable auto import sort on file save in vscode

- Open `settings.json`
- Add the following config
  ...
  "editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
  }
  ...
