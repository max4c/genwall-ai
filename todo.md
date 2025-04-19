# genwall.ai Hackathon MVP Plan

**Goal:** Demo AI dynamic wallpaper generator by 3 PM.
**Stack:** Next.js, Shadcn UI, Tailwind CSS, ComfyUI, Runpod Serverless.

**Relevant Links:**
*   Next.js Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
*   Shadcn UI Docs: [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs)
*   Tailwind CSS Docs: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
*   Runpod Serverless Docs: [https://docs.runpod.io/serverless/overview](https://docs.runpod.io/serverless/overview)
*   Runpod Serverless ComfyUI Template: [https://github.com/ashleykleynhans/runpod-worker-comfyui](https://github.com/ashleykleynhans/runpod-worker-comfyui) (Example)
*   ComfyUI Repo: [https://github.com/comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI)
*   Project Repo: [https://github.com/max4c/genwall-ai](https://github.com/max4c/genwall-ai)

---

**Milestone 1: Landing Page UI (`src/app/page.tsx`)**

*   [x] Task 1.1: Setup page layout: Define Hero and Gallery sections.
*   [x] Task 1.2: Implement Hero: Add logo (`next/image`), title, text, Shadcn `Button` (CTA).
*   [x] Task 1.3: Implement Gallery: Add CSS Grid/Flexbox, populate with placeholder Shadcn `Card` components.
*   [x] Task 1.4: Apply basic Tailwind styling for layout, spacing, typography.
*   [x] **Test Milestone 1:** Verify landing page renders correctly with placeholders. Check basic responsiveness.
*   [x] `git commit -m "feat: Implement landing page UI using Shadcn"`

---

**Milestone 2: Generation Page UI (`src/app/generate/page.tsx`)**

*   [ ] Task 2.1: Create `/generate` route and page file using App Router.
*   [ ] Task 2.2: Add prompt text area (Shadcn `Textarea` or `Input`).
*   [ ] Task 2.3: Add "Generate" button (Shadcn `Button`).
*   [ ] Task 2.4: Add designated area for results/status display (e.g., empty `div`, Shadcn `Skeleton` for loading).
*   [ ] **Test Milestone 2:** Verify generation page elements render. Check button/input interactivity.
*   [ ] `git commit -m "feat: Implement generation page UI using Shadcn"`

---

**Milestone 3: Runpod Serverless Endpoint (ComfyUI)**

*   [ ] Task 3.1: Obtain/Define simple ComfyUI text-to-image workflow JSON.
*   [ ] Task 3.2: Configure Runpod Serverless worker (aim for `runpod-worker-comfyui` template). Define `runpod.schema`.
*   [ ] Task 3.3: Deploy as a Runpod Serverless Endpoint (select GPU, note Endpoint ID & URL).
*   [ ] **Test Milestone 3:** Test deployed endpoint via Runpod UI or `curl`. Send sample prompt, verify image URL/data is returned. Check logs for errors.
*   [ ] `git commit -m "feat(backend): Setup Runpod Serverless endpoint for ComfyUI"`

---

**Milestone 4: Frontend <> Backend Integration**

*   [ ] Task 4.1: Create API utility function (`lib/runpod.ts`?) using `fetch` to call Runpod `/runsync` (preferred) or `/run`.
*   [ ] Task 4.2: If using `/run`, implement status polling logic (`/status/<job_id>`).
*   [ ] Task 4.3: Connect "Generate" button `onClick` to trigger API call with prompt value.
*   [ ] Task 4.4: Implement loading state UI (disable button, show Shadcn `Skeleton` or spinner) while waiting for API response.
*   [ ] Task 4.5: Display generated image using `next/image` (from URL in response) or show error message (e.g., Shadcn `Alert`).
*   [ ] **Test Milestone 4:** Enter prompt, click generate. Verify loading state shows. Verify image appears on success or error message on failure. Check browser console/network tab.
*   [ ] `git commit -m "feat: Integrate frontend generation UI with Runpod API"`

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
*   [ ] **Test Milestone 5:** Perform full end-to-end test of the intended demo flow (Landing -> Generate -> Result). Check on target demo screen size if possible.
*   [ ] `git commit -m "chore: Final polish and testing before demo"`
