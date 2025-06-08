# 📸 Adding Your Own Images

## 📁 Folder Structure

```
public/images/
├── products/          # Coffee product images
├── hero/             # Homepage hero/banner images  
└── logo/             # Logo and branding images
```

## 🖼️ Image Requirements

### **Product Images:**
- **Size**: 400x400px (square) recommended
- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution for crisp display
- **Naming**: Use descriptive names (e.g., `ethiopian-coffee.jpg`)

### **Hero Images:**
- **Size**: 1200x600px (2:1 ratio) recommended
- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution for banner display

### **Logo Images:**
- **Size**: 200x200px recommended
- **Format**: PNG (for transparency) or SVG
- **Background**: Transparent preferred

## 🔄 How to Add Your Images

### **Step 1: Add Image Files**
1. Copy your images to the appropriate folders:
   - Product photos → `public/images/products/`
   - Hero/banner images → `public/images/hero/`
   - Logo files → `public/images/logo/`

### **Step 2: Update Image References**
The fallback products in `src/lib/products.ts` are already configured to use local images:

```javascript
// Example product with local image
{
  id: '1',
  name: 'Ethiopian Yirgacheffe',
  image_url: '/images/products/ethiopian-coffee.jpg', // ← Your local image
  // ... other properties
}
```

### **Step 3: Match Filenames**
Make sure your image filenames match what's in the code:
- `ethiopian-coffee.jpg`
- `colombian-coffee.jpg` 
- `house-blend.jpg`
- `french-roast.jpg`

Or update the filenames in `src/lib/products.ts` to match your images.

## 🎨 Image Optimization Tips

1. **Compress images** before adding (use tools like TinyPNG)
2. **Use WebP format** for better performance
3. **Keep file sizes under 500KB** for fast loading
4. **Use consistent aspect ratios** for better layout

## 🔧 For Database Products (Supabase)

When using the admin panel to add products, you can:
1. Upload images to a cloud service (Cloudinary, AWS S3, etc.)
2. Use the image URLs in the admin panel
3. Or continue using local images with `/images/products/filename.jpg` format

## 📝 Example Usage

```javascript
// In your product data
image_url: '/images/products/my-coffee.jpg'

// In React components
<Image src="/images/logo/coffee-logo.png" alt="Coffee Shop Logo" />
```

## 🚀 Next.js Image Optimization

Next.js automatically optimizes images in the `public` folder:
- Automatic resizing
- Format conversion (WebP when supported)
- Lazy loading
- Performance optimization

Your images will be served from: `http://localhost:3000/images/...`
