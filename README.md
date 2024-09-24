# MARCH Assignment - CRUD Frontend Application

## Overview

This project is a frontend application developed using Next.js and TypeScript for performing CRUD (Create, Read, Update, Delete) operations on resources using the JSONPlaceholder API. It was created as part of an assessment for a frontend developer position at March.

## Deployment

The live version of this project is deployed at:

## Features

- Display a list of posts
- View individual post details
- Create new posts
- Edit existing posts
- Delete posts
- User information display with hover cards

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Axios for API requests
- Lucide React for icons
- Custom UI components (Drawer, Card, Button, etc.)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/pratikpakhale/march-assesment
```

2. Navigate to the project directory:

```bash
cd march-assesment
```

3. Install dependencies:

```bash
npm ci # or yarn or bun install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and visit `http://localhost:3000`

## Project Structure

- `lib/api.ts`: Contains the `CrudService` class for handling API requests
  I have used generic types for the API requests to make it more reusable to create a new service for a different API. For now, it only supports posts API, but it can be very easily extended to support other resources.
- `app/posts/page.tsx`: Main page component for displaying and managing posts
- `types/`: TypeScript interfaces for Post, User, and Comment
- `components/`: Reusable UI components

## API Integration

This project uses the JSONPlaceholder API (https://jsonplaceholder.typicode.com/) for simulating CRUD operations. The `CrudService` in `lib/api.ts` handles all API requests.

## Additional Notes

- This project uses mock data from JSONPlaceholder, so changes are not persisted.
