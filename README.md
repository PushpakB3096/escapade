# Escapade

Welcome to Escapade! This project is built using a powerful tech stack to provide a comprehensive and user-friendly platform for property reservations and management. Whether you're a traveler looking for the perfect accommodation or a property owner wanting to list your space, this application has got you covered.

## Tech Stack

- React + TypeScript: The frontend is developed using React with TypeScript, providing a robust and type-safe user interface.
- Tailwind CSS: Utilize the flexibility of Tailwind CSS to create stunning animations and effects for an enhanced user experience.
- Cloudinary CDN: Seamlessly upload and manage images using Cloudinary's content delivery network.
- Prisma: Connect to your MongoDB database and manage data models effortlessly with Prisma's ORM capabilities.
- MongoDB: Store and retrieve data efficiently using MongoDB as the database backend.

## Features and Functionalities

- Tailwind Animations and Effects: Utilize Tailwind CSS to create visually appealing animations and effects.
- Full Responsiveness: Ensure a seamless experience across various devices and screen sizes.
- Credential Authentication: Allow users to register and log in securely using their credentials.
- Google Authentication: Enable users to authenticate via their Google accounts.
- GitHub Authentication: Provide an alternative authentication method using GitHub accounts.
- Image Upload using Cloudinary CDN: Effortlessly upload and manage images using Cloudinary's CDN service.
- Client Form Validation and Handling: Utilize react-hook-form for efficient form validation and handling on the client side.
- Server Error Handling: Implement error handling using react-toast to provide users with a smooth experience.
- Calendars with react-date-range: Incorporate date pickers and calendars for intuitive date selection.
- Booking / Reservation System: Implement a comprehensive booking system for properties.
- Guest Reservation Cancellation: Allow guests to cancel their reservations as needed.
- Owner Reservation Cancellation: Provide property owners with the ability to cancel reservations.
- Creation and Deletion of Properties: Enable property owners to create and manage their property listings.
- Pricing Calculation: Implement a pricing calculation mechanism based on property features and user preferences.
- Advanced Search Algorithm: Utilize a sophisticated search algorithm that filters properties by category, date range, map location, number of guests, rooms, and bathrooms.
- Favorites System: Allow users to mark properties as favorites for easy access.
- Shareable URL Filters: Generate shareable URLs with selected filters, providing a consistent experience even for logged-out users.
- Direct Data Fetching in Server React Components: Access the database directly in server-side React components without the need for an API.
- Handling Magic Routes: Learn how to handle new Next 13 templating files for error and loading handling.
- Relation Management: Understand how to manage relations between server and child components effectively.
- Page Loading State: Enhance user experience by displaying loading states during data fetching.
- Page Empty State: Handle scenarios where data is not available with clear and user-friendly empty states.

## Getting Started

1. Clone this repository: `git clone git@github.com:PushpakB3096/escapade.git`
2. Navigate to the project directory: `cd escapade`
3. Install dependencies: `npm install`
4. Configure environment variables: Create a `.env` file and set the necessary environment variables.

```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```

5. Setup Prisma: `npx prisma db push`
6. Start the development server: `npm run dev`
