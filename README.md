# Portfolio JSON Data Setup

## What was created:

1. **data.json** - Contains all your portfolio content (personal info, experience, education, etc.)
2. **data-loader.js** - JavaScript that loads the JSON and populates the HTML dynamically

## How to use:

### Step 1: Add the data-loader script to index.html

Find this line in `index.html` (near the end, before `</body>`):
```html
<script src="script.js?v=2"></script>
```

Add the data-loader script BEFORE it:
```html
<script src="data-loader.js"></script>
<script src="script.js?v=2"></script>
```

### Step 2: Test locally

Since you're loading JSON via fetch(), you need to serve the files over HTTP (not file://). 

Run a local server:
```powershell
# In your project directory
python -m http.server 8000
# OR
npx -y http-server -p 8000
```

Then open: http://localhost:8000

### Step 3: Edit content

To update your portfolio, simply edit `data.json`:

- **Personal info**: Update `personal` section (name, email, location, etc.)
- **Experience**: Add/edit items in `experience` array
- **Education**: Modify `education` array
- **Projects**: Update `projects` array
- **About**: Change `about` section text

Save the JSON file and refresh your browser - changes appear immediately!

### Step 4: Deploy to GitHub Pages

1. Push all files to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be live at: `https://pr3mar.github.io/pr3mar.com/`

## Benefits:

✅ Edit content without touching HTML
✅ Easy to maintain and update
✅ Clean separation of data and presentation
✅ Version control your content changes in JSON
