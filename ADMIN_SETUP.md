# ICR Investment Traders - Admin Panel Setup Guide

## Overview
The admin panel allows authorized administrators to manage website content, images, and text without touching the code. All changes are stored in the Supabase database and update the website in real-time.

## Admin Access

### Login Credentials
- **URL**: `http://localhost:5173/admin/login` (or `/admin/login` on production)
- **Username**: `admin`
- **Password**: `1122`

### Admin Dashboard Access
Once logged in, visit `/admin` to access the full dashboard.

## Features

### 1. Content Management
The "Content" tab allows you to edit all website text content:
- Hero section headline and subheadline
- About section title and content
- Services section title and description
- Contact information (address, phone, email)
- Footer tagline
- And more...

**To edit content:**
1. Go to the "Content" tab
2. Find the section and field you want to edit
3. Click on the text field and make your changes
4. Click "Save Changes" button at the top
5. Changes appear instantly on the website

### 2. Image Management
The "Images" tab lets you add, view, and delete images used throughout the website:
- Upload images from external sources (Pexels, Unsplash, Cloudinary, etc.)
- Organize images by website section
- Add descriptive alt text for accessibility
- Delete unused images

**To add an image:**
1. Go to the "Images" tab
2. Fill in the "Add New Image" form:
   - **Section**: Choose which part of the website (hero, about, services, car-hire, contact)
   - **Image Name**: Give it a descriptive name (e.g., "Hero Background")
   - **Image URL**: Paste a URL to the image (use free image sites like Pexels.com)
   - **Alt Text**: Describe what's in the image for accessibility
3. Click "Add Image"
4. The image appears in the gallery below

**To delete an image:**
1. Find the image in the gallery
2. Click the "Delete" button
3. Confirm the deletion

### 3. Settings Tab
View your admin account information and tips for content management.

## Recommended Image Sources

For high-quality free images that match the company profile:
- **Pexels.com** - Professional business and logistics images
- **Unsplash.com** - Quality corporate photography
- **Pixabay.com** - Diverse business imagery
- **Cloudinary** - Image hosting and optimization

### Image Suggestions for ICR

**Hero Section:**
- Modern logistics/warehouse with African workers
- Professional business team
- Delivery trucks in motion

**About Section:**
- Corporate office setting with diverse team
- Business meeting/collaboration

**Services Section:**
- Industrial supplies/warehouse
- Agricultural products
- Fleet of vehicles
- Logistics/packaging

**Car Hire Section:**
- Vehicle fleet photos
- Professional drivers
- Transport in action

**Contact Section:**
- Dar es Salaam cityscape
- Modern office building
- Local landmarks

## Database Structure

The admin panel uses two main Supabase tables:

### website_content
Stores all editable text content with fields:
- `section` - Which page section (hero, about, services, etc.)
- `key` - Content identifier (headline, subheadline, etc.)
- `value` - The actual text content
- `type` - Content type (text, image_url, etc.)

### website_images
Stores image metadata with fields:
- `section` - Which section the image belongs to
- `name` - Image name/identifier
- `image_url` - URL to the image
- `alt_text` - Accessibility description
- `order` - Display order

## Security Notes

- Admin credentials are stored locally in the browser's localStorage
- Always keep your password secure
- Log out after editing to protect your session
- Clear browser cache if logging in from a shared device

## Troubleshooting

**Images not loading:**
- Check that the image URL is valid and publicly accessible
- Try a different image URL from Pexels or Unsplash
- Ensure the alt text is descriptive

**Changes not saving:**
- Click "Save Changes" button (if in Content tab)
- Check browser console for error messages
- Verify you're still logged in
- Try refreshing the page

**Logged out automatically:**
- Session expires after 24 hours
- Log back in with your credentials

## Making Content Editable in Components

To make any website component use editable content from the database, import the hook in that component:

```typescript
import { useWebsiteContent } from '../hooks/useWebsiteContent';

export default function YourComponent() {
  const { get } = useWebsiteContent();
  
  return (
    <div>
      <h1>{get('section', 'key', 'Fallback text if not found')}</h1>
    </div>
  );
}
```

## Adding New Editable Content

To add a new editable field to the database:

1. Insert it into the `website_content` table via Supabase dashboard:
   - Add `section` name (e.g., 'about')
   - Add `key` name (e.g., 'description')
   - Add initial `value`
   - Set `type` to 'text'

2. Use it in your component with `get('section', 'key')`

3. It will appear in the admin Content tab automatically

## Contact & Support

For technical issues with the admin panel or to change the admin password, contact your development team.
