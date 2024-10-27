

This is a real estate application built with Next.js. The app allows users to list, edit, and manage real estate properties.

## Project Structure

```
real-estate-main/
    ├── .env.local
    ├── .gitignore
    ├── .next/
    ├── .trunk/
    ├── app/
    │   ├── components/
    │   ├── (routes)/
    │   │   ├── edit-listing/
    │   │   │   ├── _components/
    │   │   │   │   └── 

FileUpload.jsx


    │   │   │   └── [id]/
    │   │   │       └── 

page.jsx


    │   ├── jsconfig.json
    │   ├── lib/
    │   ├── middleware.js
    │   ├── next.config.mjs
    │   ├── 

package.json


    │   ├── postcss.config.js
    │   ├── public/
    │   ├── 

README.md


    │   ├── tailwind.config.js
    │   └── utils/
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/real-estate-app.git
    cd real-estate-app
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env.local` file and add your environment variables.

### Running the Development Server

```sh
npm run dev
```

### Building for Production

```sh
npm run build
```

### Starting the Production Server

```sh
npm start
```

## Key Features

- **File Upload**: Users can upload images for their listings. See [`FileUpload`](app/(routes)/edit-listing/_components/FileUpload.jsx).
- **Edit Listings**: Users can edit their listings. See [`EditListing`](app/(routes)/edit-listing/[id]/page.jsx).

## Dependencies

- Next.js
- Supabase
- Tailwind CSS
- Radix UI

For a full list of dependencies, see the [`package.json`](package.json) file.

