# Hellena Hospital Website - Project Structure

## 📁 Folder Structure Overview

Your website has been reorganized into a clean, modular structure:

```
HELLENA WEBSITE/
├── index.html              (Main entry point)
├── css/
│   └── styles.css          (All styles extracted here)
├── js/
│   └── script.js           (All JavaScript functions here)
├── pages/
│   ├── home.html
│   ├── about.html
│   ├── services.html
│   ├── facilities.html
│   ├── patient.html
│   ├── blog.html
│   ├── emergency.html
│   └── contact.html
└── images/                 (🖼️ Create your image files here!)
```

---

## 🎯 Key Changes

### 1. **CSS Extraction** (`css/styles.css`)
- All inline CSS from `<style>` tag has been moved to **`css/styles.css`**
- index.html now imports it with: `<link rel="stylesheet" href="css/styles.css">`

### 2. **JavaScript Extraction** (`js/script.js`)
- All functions (`showPage()`, `ta()`, `switchTab()`) moved to **`js/script.js`**
- index.html imports it with: `<script src="js/script.js"></script>`

### 3. **Pages Separation** (`pages/` folder)
- Each page is now a separate HTML file:
  - `pages/home.html` - Home page
  - `pages/about.html` - About Us
  - `pages/services.html` - Services
  - `pages/facilities.html` - Facilities  
  - `pages/patient.html` - Patient Info
  - `pages/blog.html` - Health Tips/Blog
  - `pages/emergency.html` - Emergency Info
  - `pages/contact.html` - Contact & Appointments

---

## 🖼️ IMAGE PLACEHOLDERS - WHERE TO ADD YOUR IMAGES

The following locations need images. Look for the comment `<!-- 🖼️ IMAGE PLACEHOLDER -->`:

### **Home Page** (`pages/home.html`)
1. **Hero Main Image** - Line ~13
   - Path: `src="/images/hero-main.jpg"`
   - Size: Should fill full height (100vh), 50% width
   
2. **Why Choose Us Section** - Line ~47
   - Path: `src="/images/why-us.jpg"`
   - Size: ≈440px height

### **About Page** (`pages/about.html`)
3. **Hospital Building** - Line ~14
   - Path: `src="/images/hospital-building.jpg"`
   - Size: ≈185px height
   
4. **Hospital Front View** - Line ~16
   - Path: `src="/images/hospital-front.jpg"`
   - Size: ≈185px height (spans 2 columns)
   
5. **Patient Ward** - Line ~18
   - Path: `src="/images/patient-ward.jpg"`
   - Size: ≈185px height

### **Facilities Page** (`pages/facilities.html`)
6. **Operating Theatre** - Line ~20
   - Path: `src="/images/operating-theatre.jpg"`
   - Size: ≈230px height (spans 2 columns)
   
7. **Maternity & Delivery Unit** - Line ~22
   - Path: `src="/images/delivery-unit.jpg"`
   
8. **Inpatient Ward** - Line ~24
   - Path: `src="/images/inpatient-ward.jpg"`
   
9. **Private Room** - Line ~26
   - Path: `src="/images/private-room.jpg"`
   
10. **Consultation Area** - Line ~28
    - Path: `src="/images/consultation-area.jpg"`
    - Size: (spans 2 columns)
    
11. **Neonatal Unit** - Line ~30
    - Path: `src="/images/neonatal-unit.jpg"`

---

## ✅ How to Add Images

1. **Create images folder**: Make sure `/images/` folder exists in your project root
2. **Add image files**: Place your images in the `/images/` folder with the exact filenames referenced above
3. **Update paths**: If you place images elsewhere, update the `src` attributes accordingly

### Image Naming Convention (Current):
```
/images/
├── hero-main.jpg
├── why-us.jpg
├── hospital-building.jpg
├── hospital-front.jpg
├── patient-ward.jpg
├── operating-theatre.jpg
├── delivery-unit.jpg
├── inpatient-ward.jpg
├── private-room.jpg
├── consultation-area.jpg
└── neonatal-unit.jpg
```

---

## 🚀 How to Use This Structure

### Linking the Files Together
Everything is already linked! The structure works like this:

1. **index.html** loads:
   - External CSS: `css/styles.css`
   - External JS: `js/script.js`
   - Page files dynamically from `pages/` folder

2. **Navigation works** via JavaScript:
   - Click nav links → calls `showPage('page-name')`
   - JavaScript fetches the page from `pages/page-name.html`
   - Page content is inserted into `#pages-container` div

### Testing Locally
- Open `index.html` in your browser
- Navigation should work between all pages
- All styling should apply correctly

---

## 📝 Notes

- **All pages are now separate files** - easier to update individual pages
- **CSS is centralized** - single source of truth for styling
- **JavaScript is modular** - functions are in one place
- **Images marked with 🖼️** - easy to find where images go
- **Each page loads dynamically** - when you click nav links, the page HTML is fetched and displayed

---

## 🎨 Customization Tips

- Modify `css/styles.css` to change colors, fonts, spacing
- Edit individual `pages/*.html` files to update content
- Add `js/script.js` functions if you need new interactive features
- Replace placeholder images in `/images/` folder with your actual photos

---

**Your website is now organized, maintainable, and ready for deployment!** ✨
