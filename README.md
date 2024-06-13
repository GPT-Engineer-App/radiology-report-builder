# radiology-report-builder

### Project Description:
Create a `result.html` page for our web application where users can generate structured radiological reports (`laudos`). The page should be optimized for performance and user experience, allowing users to select sentences from previously generated radiological reports by clicking and dragging, similar to motion design tools. Users should be able to print the final report seamlessly. Ensure the design is responsive and adheres to our existing UI/UX guidelines.

### Technical Specifications:
1. **Framework**: Utilize the latest version of Tailwind CSS for styling and Alpine.js for interactivity.
2. **Data Integration**: Fetch previously generated radiological reports (`laudos`) from the backend and display them in a draggable, selectable format. Use the following database variables:
    - `user_id`: The ID of the user.
    - `report_id`: The ID of the report.
    - `report_content`: The content of the previously generated report.
    - `created_at`: The date and time when the report was created.
3. **User Interaction**: Implement a click-and-drag functionality for users to select sentences from previous reports and add them to the current report.
4. **Report Generation**: Provide an interface to compile the selected sentences into a structured final report. Include options to edit, finalize, and print the report.
5. **Performance**: Ensure the page loads quickly and interactions are smooth. Optimize all assets and minimize the use of heavy libraries.
6. **UI/UX Consistency**: Follow the existing color scheme and design language used in our application. Use CSS variables for color management:
    - `--primary-color: #1E1E1C`
    - `--secondary-color: #C7EAF3`
    - `--highlight-color: #216D77`
    - `--dark-bg-color: #242421`
    - `--light-bg-color: #FCFDF9`
    - `--light-nav-color: #ECEDE6`
    - `--border-color: #444444`
    - `--input-bg-color: #333333`
7. **Responsive Design**: Ensure the page is fully responsive and works seamlessly on both desktop and mobile devices.
8. **Accessibility**: Ensure the page is accessible, adhering to WCAG guidelines.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/radiology-report-builder.git
cd radiology-report-builder
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
