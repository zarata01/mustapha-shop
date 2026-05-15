# Images and Files System

## AI agent prompt

Build an image upload and file storage system where images are stored as files and MongoDB stores only metadata and file paths. Support images for spare parts, packs, categories, and seller profiles.

## Storage rule

Images must be stored in files, not directly inside MongoDB documents as large binary data.

MongoDB stores:

- original file name
- stored file name
- file path
- MIME type
- file size
- uploaded by
- usage target
- created date

## Upload targets

Support uploads for:

- spare part images
- pack images
- category images
- seller profile/logo images

## File validation

Validate:

- allowed MIME types: image/jpeg, image/png, image/webp
- max file size
- file extension
- image dimensions if needed

Reject dangerous files.

## File naming

Use safe generated names.

Example:

```txt
uploads/parts/partId-randomId.webp
uploads/packs/packId-randomId.webp
uploads/categories/categoryId-randomId.webp
uploads/sellers/sellerId-randomId.webp
```

Do not trust original file names for storage paths.

## Image optimization

Recommended:

- convert large images to web-friendly size
- generate thumbnails if needed
- use lazy loading on frontend

## File deletion rules

Before deleting a file:

- check if any part uses it
- check if any pack uses it
- check if any category uses it
- check if any seller uses it

Delete only unused files or replace safely.

## Static serving

Serve uploaded images through a safe public route such as:

```txt
/public/uploads/...
```

or through a controlled static route.

## Expected files

Suggested structure:

```txt
src/models/UploadedFile.js
src/controllers/uploadController.js
src/routes/uploadRoutes.js
src/services/fileStorageService.js
src/services/imageProcessingService.js
src/middleware/uploadMiddleware.js
src/validators/fileValidators.js
public/uploads/
```

## Acceptance criteria

- Admin can upload part images.
- Admin can upload pack images.
- Uploaded file metadata is saved in MongoDB.
- Only safe image files are accepted.
- Images display on customer pages.
- Image paths are stored, not image binaries.
