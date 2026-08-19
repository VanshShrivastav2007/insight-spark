# Insight Spark

Build a polished, production-quality hackathon prototype called "HackSort AI".

TAGLINE:

"See beyond the submission."

CORE CONCEPT:

HackSort AI is an AI-powered hackathon judging and innovation discovery assistant. Hackathons can receive hundreds or thousands of submissions, making it difficult for judges to review every project carefully. Many teams also work on similar or repetitive problems, while genuinely innovative projects can be overlooked because of weak presentation quality or the huge volume of submissions.

The platform should NOT replace human judges and should NOT automatically decide winners. Its purpose is to analyze the entire submission landscape, identify similarities and patterns, surface potentially innovative or overlooked projects, and help judges decide which submissions deserve deeper review.

IMPORTANT:

Build this as a highly polished working prototype suitable for a hackathon demonstration. Use realistic mock data and simulated AI analysis where a real AI/API is not connected yet. All major buttons, navigation, filters, dashboards, modals, tables, charts, and interactions should work.

==================================================

1. DESIGN / UI / UX

==================================================

Create a modern, premium SaaS-style interface.

Design direction:

- Clean and professional

- Modern AI startup aesthetic

- Minimal but visually impressive

- Suitable for hackathon judges

- Responsive on desktop, tablet and mobile

- Excellent spacing and typography

- Subtle gradients

- Soft shadows

- Rounded cards

- Clear visual hierarchy

- Smooth hover states and transitions

- Avoid excessive animations

- Use accessible contrast

- Use icons consistently

- Use charts and visualizations wherever they add value

Primary visual style:

- Light background with dark text

- Deep navy/indigo as the main brand color

- Purple/blue gradient accents

- Green for positive signals

- Amber for warnings

- Red only for critical concerns

- Use a professional font such as Inter

Brand:

Logo text: HackSort AI

Logo concept: an abstract lens + spark/idea icon

TAGLINE:

"See beyond the submission."

Use consistent branding across all pages.

==================================================

2. USER ROLES

==================================================

Create three roles:

A. ORGANIZER

B. JUDGE

C. PARTICIPANT

For the prototype, provide a role selector/demo login so the user can quickly enter each dashboard without requiring a real authentication backend.

Demo accounts:

Organizer Demo

Judge Demo

Participant Demo

Also provide a "View Product Demo" option on the landing page.

==================================================

3. LANDING PAGE

==================================================

Create a beautiful landing page.

Hero section:

HackSort AI

"See beyond the submission."

Description:

"AI-powered innovation discovery for faster, smarter and more structured hackathon judging."

Primary CTA:

"Try Interactive Demo"

Secondary CTA:

"Create Competition"

Include a visual mockup of the Judge Dashboard.

Below hero, show:

THE PROBLEM

"1000 submissions. Limited judging time. Important ideas can get lost."

Three problem cards:

- Too many submissions

- Repetitive ideas

- Hidden innovation

Then show:

HOW IDEALENS WORKS

1. Understand submissions

2. Map similarities

3. Detect innovation signals

4. Surface hidden gems

5. Let judges verify and decide

Then show feature cards:

- Submission Intelligence

- Similarity Clustering

- Innovation Signals

- Hidden Gem Detection

- Problem Landscape

- Judge Priority Queue

- AI Explainability

- Human-in-the-loop judging

Add a section:

"AI assists. Humans decide."

Explain clearly that AI does not choose winners.

Add a final CTA:

"Start Exploring"

==================================================

4. ORGANIZER DASHBOARD

==================================================

Create an organizer dashboard with sidebar navigation:

Overview

Competitions

Submissions

Analytics

Judges

Settings

Dashboard overview should show:

Total Submissions: 500

Analyzed: 500

High Priority: 42

Potential Hidden Gems: 17

Similarity Clusters: 38

Highly Saturated Areas: 12

Show a submission processing status card.

Show charts:

A. Submissions by category

- Agriculture: 120

- Healthcare: 95

- Education: 85

- Climate: 70

- FinTech: 60

- Accessibility: 30

- Other: 40

B. Problem Landscape

Show which problem areas are saturated vs underexplored.

Example:

Crop Disease — Highly Saturated

Irrigation — Highly Saturated

Farmer Marketplace — Medium

Flood Recovery — Underexplored

C. Submission trend over time

D. Innovation signal distribution

==================================================

5. CREATE COMPETITION PAGE

==================================================

Create a polished form:

Competition Name

Description

Start Date

End Date

Categories

Submission Limit

Team Size

Evaluation Criteria

Allow organizers to configure evaluation criteria:

Problem Relevance

Innovation

Impact

Feasibility

Prototype

Presentation

Each criterion should have a percentage weight.

Show:

"Create Competition"

After creating, show:

Competition Code

Share Link

QR Code placeholder

==================================================

6. PARTICIPANT SUBMISSION FLOW

==================================================

Create a participant submission page.

Fields:

Team Name

Team Members

College / Organization

Category

Problem Statement

Solution

Target Users

Technology Used

Expected Impact

Upload:

PPT/PDF

Optional:

Demo URL

GitHub URL

Video URL

Show upload progress.

After submission:

"Submission received successfully."

Show:

Submission ID

Status: AI Analysis Pending

Then simulate:

"AI analysis completed"

==================================================

7. AI ANALYSIS ENGINE — PROTOTYPE

==================================================

Since this is a prototype, simulate AI processing using realistic pre-generated analysis.

When a submission is opened, show an AI analysis panel.

Extract:

Problem

Target User

Solution

Technology

Impact

Feasibility

Then generate:

Problem Relevance

Solution Differentiation

Technical Differentiation

Impact Signal

Feasibility Signal

Presentation Quality

Similarity Signal

Use 0-100 scores.

IMPORTANT:

Do NOT call the score "absolute innovation score".

Use the term:

"Innovation Signal"

Explain:

"Innovation Signal indicates how differentiated this submission appears relative to the available submissions. It is not a guarantee of innovation."

==================================================

8. SIMILARITY ENGINE

==================================================

Create a Similarity section.

For each project show:

Closest Similar Projects

Similarity percentage

Common problem

Common approach

Key difference

Example:

Team AgriVision

Similarity with Team FarmAI: 84%

Similarity with Team CropGuard: 78%

Then show:

"Key Difference"

"Most similar projects rely primarily on leaf-image classification, while AgriVision combines image analysis with local weather conditions."

Create a visual similarity graph/network.

==================================================

9. SUBMISSION CLUSTERING

==================================================

Create a page called:

"Submission Landscape"

Show clusters such as:

Agriculture

Healthcare

Education

Climate

Finance

Accessibility

Inside Agriculture:

Crop Disease — 31

Irrigation — 24

Farmer Marketplace — 18

Flood Recovery — 3

Other — 4

Clicking a cluster opens all related submissions.

Allow sorting by:

- Similarity

- Innovation Signal

- Impact

- Priority

- Presentation Quality

==================================================

10. HIDDEN GEM DETECTION

==================================================

This is the most important feature.

Create a dedicated page:

"Potential Hidden Gems"

Explain:

"Projects that show strong underlying project signals or meaningful differentiation but may be overlooked due to presentation quality, low visibility, or being buried in a large submission pool."

Create realistic examples.

Example:

Team: AgriRecover

Innovation Signal: 91

Problem Relevance: 92

Differentiation: 89

Impact: 90

Feasibility: 81

Presentation Quality: 48

Status:

⭐ Potential Hidden Gem

Reason:

"Strong differentiation detected despite relatively weak presentation clarity. Only 3 submissions address this specific problem area."

Show:

Why highlighted?

- Low similarity to dominant cluster

- Strong problem relevance

- Unique solution approach

- Working prototype

- Weak presentation clarity

Important disclaimer:

"AI recommendation — human verification required."

==================================================

11. CRITICAL FEATURE: IDEA QUALITY VS PRESENTATION QUALITY

==================================================

Create a dedicated comparison visualization.

Example:

PROJECT QUALITY

Problem Relevance: 92

Innovation Signal: 91

Differentiation: 89

Impact: 90

Feasibility: 81

PRESENTATION QUALITY

Clarity: 48

Structure: 52

Visual Quality: 43

Then show:

"Strong Project Signals + Weak Presentation Signals"

Badge:

"Potentially Overlooked"

This should visually demonstrate the main value proposition.

==================================================

12. JUDGE DASHBOARD

==================================================

Create the most polished dashboard here.

Sidebar:

Dashboard

Priority Queue

All Submissions

Clusters

Hidden Gems

Analytics

Evaluations

Top metrics:

Total Submissions: 500

Reviewed: 128

Remaining: 372

Hidden Gems: 17

High Priority: 42

Create a priority queue:

HIGH PRIORITY

REVIEW

STANDARD

POTENTIAL HIDDEN GEM

Each submission card should contain:

Team Name

Project Name

Category

Innovation Signal

Similarity

Impact

Presentation Quality

Priority

AI Recommendation

Add filters:

Category

Priority

Innovation Signal

Similarity

Presentation Quality

Problem Area

Search bar:

"Search teams, projects or problems..."

==================================================

13. JUDGE SUBMISSION DETAIL PAGE

==================================================

This page is extremely important.

Create a 3-column layout.

LEFT:

Project information

CENTER:

AI Analysis

RIGHT:

Judge Evaluation

Project header:

Team name

Project name

Category

Buttons:

View Original PPT

View Demo

View GitHub

AI SUMMARY:

Provide a concise 3-5 sentence summary.

WHY HIGHLIGHTED?

Give evidence-based reasons.

Example:

"Only 2 of 50 Agriculture submissions address post-flood crop recovery. The solution also differs from the dominant image-based disease detection approaches."

SIMILAR SUBMISSIONS:

Show 3-5 closest projects with similarity percentages.

STRENGTHS:

- Strong problem relevance

- Differentiated approach

- Working prototype

CONCERNS:

- Limited validation data

- Small prototype dataset

INNOVATION SIGNALS:

Problem differentiation

Solution differentiation

Technical differentiation

Competition differentiation

Then show:

"AI recommendation is advisory. Final decision belongs to the judge."

==================================================

14. ORIGINAL PPT VIEWER

==================================================

Create a modal/page that simulates an embedded PPT/PDF viewer.

Show slide thumbnails on the left.

Large slide preview in the center.

AI insights on the right.

AI insights should highlight:

Problem

Solution

Differentiation

Possible concerns

Add navigation:

Previous Slide

Next Slide

If no real uploaded file exists, use realistic sample slide previews/placeholders.

==================================================

15. SIDE-BY-SIDE COMPARISON

==================================================

Create a comparison feature.

Judge can select 2-4 submissions.

Compare:

Problem

Target User

Solution

Technology

Innovation Signal

Similarity

Impact

Feasibility

Presentation Quality

Prototype

Strengths

Concerns

Highlight meaningful differences.

Add:

"AI Comparison Summary"

Example:

"Team A and Team B address the same problem, but Team B uses a substantially different technical approach."

==================================================

16. PROBLEM LANDSCAPE

==================================================

Create a visual page:

"What is everyone solving?"

Use bubble chart / treemap / cards.

Show:

Most common problems

Highly saturated areas

Underexplored areas

Example:

Highly Saturated:

Crop Disease

AI Chatbots

Generic Education Assistants

Underexplored:

Post-Flood Crop Recovery

Elderly Accessibility

Small-Farm Cold Storage

Important:

Do not claim an underexplored problem is automatically better.

Label it:

"Underexplored — Human Review Recommended"

==================================================

17. JUDGE EVALUATION

==================================================

Create evaluation form:

Problem Relevance /10

Innovation /10

Impact /10

Feasibility /10

Prototype /10

Presentation /10

Comments box.

Allow Save Draft.

Allow Submit Evaluation.

Show confirmation.

Do not automatically make AI score the final score.

==================================================

18. MULTI-JUDGE SUPPORT

==================================================

Create organizer analytics showing multiple judges.

Example:

Judge 1

Judge 2

Judge 3

Judge 4

Show average human evaluation.

Display:

AI Innovation Signal

Human Judge Score

Keep them visually separate.

==================================================

19. ANALYTICS

==================================================

Create an analytics dashboard.

Metrics:

Submission count

Category distribution

Problem saturation

Similarity clusters

Innovation signal distribution

Potential hidden gems

Average judge score

Review progress

Charts:

Category distribution

Submission trends

Cluster sizes

Innovation vs Presentation scatter plot

IMPORTANT:

The Innovation vs Presentation chart should clearly demonstrate potential hidden gems.

Example:

A project with:

High Innovation Signal

Low Presentation Quality

should appear as an "Overlooked Candidate".

==================================================

20. NOTIFICATION / ACTIVITY SYSTEM

==================================================

Add a notification bell.

Example notifications:

"17 potential hidden gems identified."

"42 high-priority submissions need review."

"12 new submissions analyzed."

"Judge evaluation deadline approaching."

==================================================

21. DEMO DATA

==================================================

Populate the prototype with realistic demo data.

Create at least 50 realistic sample submissions across:

Agriculture

Healthcare

Education

Climate

FinTech

Accessibility

Smart City

Include:

- Similar projects

- Highly repetitive projects

- Unique projects

- Strong projects

- Weak projects

- Strong idea + weak presentation

- Beautiful presentation + generic idea

- Underexplored problem projects

- Potential hidden gems

Create realistic team names, project names, problem statements and solutions.

Do not use meaningless placeholder text such as:

"Lorem ipsum"

"Project 1"

"Test Team"

Use realistic content.

==================================================

22. IMPORTANT DEMO SCENARIO

==================================================

The application must support this complete demo flow:

1. Open Judge Dashboard

2. Show 500 total submissions

3. Select Agriculture

4. Show 120 Agriculture submissions

5. Show that Crop Disease is highly saturated

6. Show Flood Recovery is underexplored

7. Open similarity cluster

8. Show many highly similar projects

9. Open "Potential Hidden Gems"

10. Select "AgriRecover"

11. Show strong project signals but weak presentation quality

12. Show "Why highlighted?"

13. Show closest similar projects

14. Open original PPT viewer

15. Open demo/GitHub buttons

16. Compare AgriRecover with another project

17. Judge enters final evaluation

18. Show human evaluation separately from AI signals

This demo flow should feel smooth and impressive.

==================================================

23. AI EXPLAINABILITY

==================================================

Every AI recommendation must have an explanation.

Never show only:

"Innovation: 91"

Instead show:

"Innovation Signal: 91"

Then:

"Why?"

- Only 2 similar submissions

- Different technical approach

- Addresses an underrepresented problem

- Prototype evidence available

Add disclaimer:

"AI-generated insight. Verify against the original submission."

==================================================

24. ACCESSIBILITY / RESPONSIVE

==================================================

Make the application responsive.

Ensure:

- Keyboard navigation

- Accessible buttons

- Tooltips

- Proper aria labels

- Good contrast

- Responsive tables

- Mobile-friendly cards

==================================================

25. NAVIGATION

==================================================

Use a persistent sidebar for logged-in dashboards.

Sidebar sections:

Overview

Submissions

Submission Landscape

Similarity Clusters

Potential Hidden Gems

Analytics

Evaluations

Settings

Top bar:

Search

Notifications

Profile

Competition selector

==================================================

26. SETTINGS

==================================================

Create settings:

Competition settings

Evaluation criteria

AI analysis preferences

Notification preferences

Judge management

Submission rules

==================================================

27. EMPTY / LOADING / ERROR STATES

==================================================

Create polished states for:

Loading AI analysis

No submissions

No hidden gems

No similarity matches

Upload failure

Analysis failed

Search no results

Use skeleton loaders and clear messages.

==================================================

28. PRODUCT LANGUAGE

==================================================

Use these exact concepts consistently:

"AI-powered judging assistant"

"Innovation Signal"

"Potential Hidden Gem"

"Submission Landscape"

"Similarity Cluster"

"Problem Saturation"

"Underexplored Area"

"Why highlighted?"

"Human Review Recommended"

"AI assists. Humans decide."

Do NOT market it as:

"AI chooses winners"

"AI decides the best project"

"100% accurate innovation detection"

==================================================

29. TECHNICAL REQUIREMENTS

==================================================

Use a clean component-based architecture.

Preferred stack:

- React / Next.js

- TypeScript

- Tailwind CSS

- Modern component library

- Chart library

- Supabase if backend/database is needed

Create reusable components for:

Cards

Tables

Charts

Badges

Modals

Tabs

Filters

Score displays

AI insight panels

Structure code cleanly so real AI APIs can be integrated later.

==================================================

30. FUTURE AI INTEGRATION READY

==================================================

Design the architecture so that mock AI analysis can later be replaced with real APIs.

Future pipeline:

PPT/PDF upload

→ document parsing

→ text/image extraction

→ LLM analysis

→ embeddings

→ vector similarity search

→ clustering

→ innovation signal generation

→ hidden gem detection

→ judge recommendations

For now, use realistic mock analysis and demo data so the complete prototype works immediately.

==================================================

31. FINAL QUALITY REQUIREMENT

==================================================

Do NOT build a generic dashboard template.

Make it feel like a real startup product that could be presented to hackathon judges.

Prioritize:

1. Excellent UI/UX

2. Clear product story

3. Working interactions

4. Realistic demo data

5. Strong Hidden Gem experience

6. Similarity visualization

7. Problem Landscape

8. Explainable AI recommendations

9. Human-in-the-loop judging

10. Smooth end-to-end demo

The final application should make a judge understand within 30 seconds:

"Instead of forcing me to manually search through hundreds of submissions, HackSort AI shows me what is repetitive, what is different, what may be overlooked, and why I should look deeper — while I remain in control of the final decision."

Build the complete prototype now with all pages, navigation, demo data, interactions, responsive UI, realistic AI analysis states, charts, filters, modals, comparison views and judge workflows described above.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/74b80832-3031-4c2a-9723-c42ff73b3304).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
