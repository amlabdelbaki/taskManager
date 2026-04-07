# Task Manager

Task Manager is an Angular 18 dashboard-style task management app built with standalone components and Angular Material.

It includes a task board, filters, search, a collapsible sidebar, and a reusable popup form for adding or editing tasks.

## Tech Stack

- Angular 18
- Angular Material
- Angular CDK Drag and Drop
- RxJS
- TypeScript

## Features

- Dashboard with task summary cards
- Task board grouped by status: `To Do`, `In Progress`, `Done`
- Navbar search for filtering dashboard tasks
- Priority filter and status tabs on the dashboard
- Sidebar that collapses when clicking the `Task Manager` logo
- Sidebar `New Task` button opens a popup form
- Reusable task popup supports `add` mode and `edit` mode
- Task card actions menu with `Edit` and `Delete` options
- Drag and drop between task status columns
- Responsive layout for desktop and mobile

## Current Routes

- `/` Dashboard
- `/tasks` Tasks
- `/calendar` Calendar
- `/analytics` Analytics
- `/users` Team
- `/settings` Settings

## Task Popup Fields

The shared task dialog includes:

- `Title` required
- `Priority` required
- `Status` required
- `Description` optional
- `Due date` optional
- `Assignee` optional text input

## Current Behavior

- Dashboard data is loaded from `src/assets/db.json`
- Navbar search filters tasks on the dashboard by title, description, and assignee name
- Clicking `Edit` from a task card opens the popup with the existing task data
- Sidebar `New Task` opens the popup in add mode

## Current Limitations

- Adding a new task does not yet persist to the dashboard data source
- Editing a task currently opens the popup only and does not save changes yet
- Delete action is currently UI only
- Data is currently mocked from a local JSON file

## Project Structure

```text
src/app/
  core/
    components/
      navbar/
      sidebar/
  features/
    analytics/
    calendar/
    dashboard/
      dashboard-toolbar/
      task-board/
      task-card/
      task-column/
      task-counter-card/
    settings/
    tasks/
    team/
  shared/
    components/
      task-form-dialog/
    services/
      manage-task.service.ts
      search.service.ts
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open:

```text
http://localhost:4200
```

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Notes

- The app uses standalone Angular components instead of NgModules
- Angular Material is used for dialogs, menus, buttons, form fields, selects, icons, toolbar, tabs, and datepicker
- `provideNativeDateAdapter()` is configured for the Material datepicker
