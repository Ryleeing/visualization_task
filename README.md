# Corning Editable Data Table

A React-based frontend application built for the Corning Software Engineering Internship technical assignment.

## Setup and Run Instructions

1. Ensure you have Node.js installed.
2. Clone this repository.
3. Install dependencies:
```bash
npm install

```


4. Start the development server:
```bash
npm run dev

```



## Tech Stack

* **React + TypeScript**
* *Note on preference:* While Vue 3 was listed as preferred, I chose React + TS as it is my strongest stack. This allowed me to focus on delivering high-quality component architecture, state management, and a great UX within the time constraint.
* Styling: CSS Modules
* State Management: No external state management (React Local State)

## Assumptions
**Validation Rules**:

- `Name`: Required (non-empty).
- `Radius`: Must be a numeric value > 0.
- `Type`: Must be one of: *bubble*, *crack*, or *scratch*

**The application operates purely client-side(no backend) with no backend synchronization required for this version.**.

## Tradeoffs
* Simple local state instead of Redux.
* Basic table instead of complex DataGrid.
* For the bonus points in limited time, I chose **Persist data in localStorage** and **Clicking a row should mark it as selected (visually highlighted)**, as these provide immediate practical value.

## User Experience Details
* **Smart keyboard support:** When clicking the `Enter` key, it saves the current edit, speeding up the data entry.
* **Data alignment (Important):** Text is left-aligned, but numeric data (Radius) is aligned by the decimal point. This allows users to quickly scan and compare magnitudes.
* *Example:*
**Before**
```text
2.33
23.33
```

**After (Decimal-Aligned)**
```text
 2.33
23.33
```

* **Units of measurement:** 
Added units (mm) to the Radius column to ensure data clarity for researchers.
* **Zebra striping:** 
Especially useful when there are massive amounts of data. it helps with tracking rows horizontally and avoiding potential misreading.
* **Intuitive "Add Row" flow:** 
When creating a new row, the application directly enters editing mode, reducing unnecessary clicks for the user.
* **Consistent visual language:** 
Button width, patterns, and colors remain user-friendly with good contrast and consistency for an intuitive user journey.

## What I would improve with more time
* More keyboard support: Currently, the app supports the Enter key to save edits. With more time, I would implement full keyboard support (e.g., Escape to cancel, and Tab navigation across input fields) to improve efficiency for power users.
* Cross-device testing: Test performance in different devices(Andriod, Iphone, Mac, Windows) and system(industrial standard like windows 10+ or ipadOS16+)
* Pagination for large data: rendering all rows is fine for a small mock dataset. However, if the table exceeds 20+ records, I would implement a pagination component (with page numbers, next/prev controls, and jump-to-start features) 
* Unit tests: Add comprehensive unit tests.
* Validation UX: To prevent aggressive error popups, validation feedback should be rendered directly under the inline input fields during "Edit" mode.

## Time Spent

**Total: ~5.5 hours**

* Planning and Repository Setup: ~0.6 hour
* Core table rendering and Inline edit state: ~2 hours
* Validation and LocalStorage: ~1.5 hours
* CSS Polish, UX improvement, and Documentation: ~1.5 hour

