# genwall.ai Hackathon MVP Plan

**Goal:** Demo AI dynamic wallpaper generator by 3 PM.
**Stack:** Next.js, Shadcn UI, Tailwind CSS, **Runpod Serverless (Stable Diffusion XL Template)**.

**Relevant Links:**
*   Next.js Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
*   Shadcn UI Docs: [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs)
*   Tailwind CSS Docs: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
*   Runpod Serverless Docs: [https://docs.runpod.io/serverless/overview](https://docs.runpod.io/serverless/overview)
*   **Runpod Serverless API Reference:** [https://docs.runpod.io/serverless/api/runsync](https://docs.runpod.io/serverless/api/runsync)
*   Project Repo: [https://github.com/max4c/genwall-ai](https://github.com/max4c/genwall-ai)

---

**Milestone 1: Landing Page UI (`src/app/page.tsx`)**

*   [x] Task 1.1: Setup page layout: Define Hero and Gallery sections.
*   [x] Task 1.2: Implement Hero: Add logo (`next/image`), title (marquee), text, Shadcn `Button` (CTA).
*   [x] Task 1.3: Implement Gallery: Add CSS Grid/Flexbox, populate with placeholder Shadcn `Card` components (white background).
*   [x] Task 1.4: Apply basic Tailwind styling for layout, spacing, typography, animated background.
*   [x] **Test Milestone 1:** Verify landing page renders correctly with placeholders. Check basic responsiveness.
*   [x] `git commit -m "feat: Implement landing page UI using Shadcn"`
*   [x] `git commit -m "refactor: Refine landing page UI and fix build issues"`
*   [x] `git commit -m "style(landing): Enhance CTA button with gradient and restyle gallery cards"`
*   [x] `git commit -m "style(landing): Increase title size and add pulse animation to CTA button"`
*   [x] `git commit -m "feat(landing): Implement scrolling marquee effect for hero title"`
*   [x] `git commit -m "style(landing): Reverse marquee direction and increase speed"`
*   [x] `git commit -m "fix(landing): Move marquee outside container for full width"`
*   [x] `git commit -m "style(landing): Integrate marquee styling and adjust spacing"`
*   [x] `git commit -m "style(landing): Reduce spacing between marquee and hero text"`

---

**Milestone 2: Generation Page UI (`src/app/generate/page.tsx`)**

*   [x] Task 2.1: Create `/generate` route and page file using App Router.
*   [x] Task 2.2: Add prompt text area (Shadcn `Textarea`) in left sidebar layout.
*   [x] Task 2.3: Add "Generate" button (Shadcn `Button`) below textarea, with gradient animation.
*   [x] Task 2.4: Add designated area for results/status display in right column (white background).
*   [x] **Test Milestone 2:** Verify generation page elements render. Check button/input interactivity.
*   [x] `git commit -m "feat: Implement generation page UI using Shadcn"`
*   [x] `git commit -m "refactor(generate): Implement two-column layout and improve styling"`
*   [x] `git commit -m "style(generate): Adjust layout to sidebar format and improve input/text styling"`
*   [x] `git commit -m "refactor(generate): Redesign layout to resemble chat interface"`
*   [x] `git commit -m "style(generate): Set sidebar and results area background to white"`
*   [x] `git commit -m "style(generate): Apply animated gradient to Generate button"`

---

**Milestone 3: Runpod Serverless Endpoint (Stable Diffusion XL)**

*   [x] Task 3.1: Identify Runpod endpoint details for **"1-Click Stable Diffusion XL" template** (or similar SDXL template).
*   [x] Task 3.2: Ensure Runpod Serverless endpoint (ID: `uqaa8d5h9xqvvy`) is deployed/running. Understand its **input schema (`{ "input": { "prompt": "..." } }`)** and **output schema** (image URL path is `output.image_url`).
*   [x] Task 3.3: Ensure Runpod API Key is correctly set up in `.env.local` as `NEXT_PUBLIC_RUNPOD_API_KEY`.
*   [x] **Test Milestone 3:** Test endpoint via Runpod UI/`curl`. Send sample prompt (`{ "input": { "prompt": "a cat astronaut" } }`), verify response structure contains image URL/data. **Note the exact path to the image URL.**
*   [ ] `git commit -m "feat(backend): Configure Runpod Serverless endpoint for Stable Diffusion XL"`

---

**Milestone 4: Frontend <> Backend Integration (Client-Side Fetch)**

*   [ ] Task 4.1: Implement `handleGenerate` function in `src/app/generate/page.tsx` using client-side `fetch` to call **Runpod `/runsync` endpoint (`https://api.runpod.ai/v2/uqaa8d5h9xqvvy/runsync`)**.
*   [ ] Task 4.2: Ensure `handleGenerate` uses the correct `prompt` state and retrieves `process.env.NEXT_PUBLIC_RUNPOD_API_KEY` for the `Authorization: Bearer ...` header. Set `Content-Type: application/json`.
*   [ ] Task 4.3: Implement loading state management (`isLoading`, disable button, show `Skeleton`).
*   [ ] Task 4.4: Parse the `/runsync` JSON response, **extract image URL (from path noted in M3 test)**, update `imageUrl` state.
*   [ ] Task 4.5: Handle potential errors from the `fetch` or Runpod response (update `error` state, show message in UI).
*   [ ] **Test Milestone 4:** Enter prompt, click generate. Verify loading state shows. Verify image appears on success or error message on failure. Check browser console/network tab for request/response details.
*   [ ] `git commit -m "feat: Integrate frontend generation UI with Runpod API (client-side runsync)"`

---

**(Contingency) Milestone 4B: Mock Backend API**
*(Use if Milestone 3 or 4 hits major roadblocks)*

*   [ ] Task 4B.1: Create mock API function simulating delay (`setTimeout`) and returning a static image URL.
*   [ ] Task 4B.2: Connect "Generate" button `onClick` to this mock function instead of the real API call.
*   [ ] Task 4B.3: Display static image result in the designated area.
*   [ ] **Test Milestone 4B:** Verify clicking "Generate" shows loading, then displays the static image.
*   [ ] `git commit -m "feat: Implement mocked backend API for demo"`

---

**Milestone 5: Final Polish & Demo Prep**

*   [ ] Task 5.1: Review overall UI/UX. Apply minor Tailwind CSS fixes for alignment, spacing, colors.
    *   Refine header size.
    *   Adjust hero text color for readability.
    *   Enhance background gradient animation.
*   [ ] Task 5.2: Add basic error handling/user feedback if missing.
*   [ ] Task 5.3 (Stretch): Implement interactive cursor animation effect on landing page.
*   [ ] Task 5.4 (Stretch): Implement multi-time-of-day generation (morning, midday, dusk, night) from a single prompt.
*   [ ] Task 5.5 (Stretch): Add support for other SDXL parameters (negative prompt, width, height) to the input payload if time permits.
*   [ ] **Test Milestone 5:** Perform full end-to-end test of the intended demo flow (Landing -> Generate -> Result). Check on target demo screen size if possible.
*   [ ] `git commit -m "chore: Final polish and testing before demo"`
