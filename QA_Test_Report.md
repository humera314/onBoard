# QA Test Report – OnBoard / FyndMe Dashboard

## Testing Steps
1. **Environment Setup**
   - Started backend (`node index.js`) and verified API at `http://localhost:5000`.
   - Started frontend (`npm run dev`) and opened `http://localhost:3000`.

2. **Feature Verification**
   - **Dashboard Rendering**: Checked that all sections load without errors.
   - **Pending Table**: Verified correct filtering of "Not verified" users.
   - **Completed Table**: Verified correct filtering of fully verified users.
   - **Pagination**: Tested switching between pages and ensured row counts are correct.
   - **Collapse Button**: Ensured it hides/shows the table as expected.
   - **Charts**: Verified correct rendering of visits/clicks and conversions charts.
   - **Styling**: Compared spacing, gaps, and alignment against Figma design.

3. **Bugs/Issues Found & Resolution**
   - **Issue**: Initial push to repo failed due to remote history conflict.
     - **Fix**: Pulled with `--allow-unrelated-histories` before pushing.
   - **Issue**: Collapse button icon was not rotating.
     - **Fix**: Added Tailwind rotation class toggle on click.
   - **Issue**: Table border radius not matching Figma.
     - **Fix**: Applied `rounded-[value]` classes in container.

4. **Tools Used**
   - **Manual Testing**: Browser-based testing in Chrome and Edge.
   - **DevTools**: Chrome DevTools for inspecting DOM/CSS and debugging JS.
   - **Git**: For version control and verifying file changes.
