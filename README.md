# Corning Editable Data Table

A React-based frontend application built for the Corning Software Engineering Internship technical assignment.

## Setup and Run Instructions

1. Ensure you have Node.js installed.
2. Clone this repository.
3. Install dependencies: npm install

## Start the development server:
npm run dev

## Tech Stack
- React + TypeScript
- No external state management

## Assumptions
- Only one row can be edited at a time
- Data is stored locally (no backend)

## Tradeoffs
- Simple local state instead of Redux
- Basic table instead of complex DataGrid

## Improvements
- Better keyboard support
- Server-side persistence
- Pagination for large data

## User experience details
- Data alignment(Important): Text should be left-aligned, but numeric data (Radius) is aligned by the decimal point. This allows users to quickly scan and compare magnitudes.
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
- Add units of measurement: The "Radius" column change to "Radius (mm)"
- zebra striping, especially useful when there are massive data, it helps on tracking rows horizontally and avoiding potential misreading
- when create a new row, directly enter editing mode
- Button width, pattern and color remain user friendly with good contrast and consistency

## Time Spent
~4.5 hours