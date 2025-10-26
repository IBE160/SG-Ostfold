# Brainstorming Session Results

**Session Date:** 2025-10-25
**Facilitator:** Business Analyst Mary
**Participant:** BIP

## Executive Summary

**Topic:** Brainstorm the proposal application to see if there are any aspect i have not thought about

**Session Goals:** Discuss the user flows to see if there are any flow or steps i have missed

**Techniques Used:** Mind Mapping, Reasoning via Planning, Lessons Learned Extraction, Identify Potential Risks, Dependency Mapping, Pre-mortem Analysis

**Total Ideas Generated:** 4

### Key Themes Identified:

The key theme that emerged from our session is a shift from passive data collection to **active, in-context feedback**. Both the Shift Leader and the Manager get immediate, AI-powered insights that help them understand the data without having to manually perform comparisons.

## Technique Sessions

{{technique_sessions}}

## Idea Categorization

### Immediate Opportunities

_Ideas ready to implement now_

- **Post-Submission Summary for Shift Leaders**: An immediate summary screen showing KPIs after a report is submitted.
- **AI Historical Context for Shift Leaders**: The AI summary that compares the submitted shift to past performance (yesterday, last 3 weeks, etc.).
- **AI Performance Summary for Managers**: The on-demand button for managers to get a high-level summary of trends (last week, month, year-over-year).
- **Customizable KPI Dashboard for Managers**: The ability for managers to choose which specific KPIs they want to see on their dashboard.

### Future Innovations

_Ideas requiring development/research_

{{future_innovations}}

### Moonshots

_Ambitious, transformative concepts_

{{moonshots}}

## Updated Project Plan

Here is a revised timeline that integrates the new "quick wins":

*   **Week 1: Project setup** (No change)
*   **Week 2: ShiftReport CRUD** (No change)
*   **Week 3: History view and filtering** (No change)
*   **Week 4: Dashboard Development & Customization**
    *   *Original*: Create dashboard with 3–4 KPI cards and one trend graph.
    *   ***New***: Add **Customizable KPI Dashboard for Managers** to allow them to select which KPIs are displayed.
*   **Week 5: CSV export and testing** (No change)
*   **Week 6: AI Integration & Immediate Feedback**
    *   *Original*: Add AI-powered note summarization.
    *   ***New***:
        *   Implement the **Post-Submission Summary for Shift Leaders** (UI).
        *   Implement the **AI Historical Context for Shift Leaders**.
        *   Implement the **AI Performance Summary for Managers**.

## Lessons Learned

**Experience:**
We conducted a mind-mapping session to explore the user flows for the Shift Leader and Manager roles.

**Key Lessons:**
1.  **The "What's Next" is Crucial**: The most valuable insights came from asking what happens *immediately after* a user completes an action (e.g., submitting a report). This led to the idea of the post-submission summary screen.
2.  **AI as an Analyst**: We expanded the role of AI from a simple "note summarizer" to an "on-demand analyst" that provides historical context and trend analysis for both user roles.
3.  **Integration is Feasible**: The new features, while impactful, are not "scope creep" but can be logically integrated into the existing development weeks, particularly weeks 4 and 6.

**Actionable Improvements:**
1.  **Update Proposal**: The `proposal.md` should be updated to reflect the new AI features and the revised timeline.
2.  **Prioritize Feedback Loop**: During UI/UX design, prioritize the design of the "Post-Submission Summary" screen for the Shift Leader, as it provides a critical feedback loop.
3.  **Define AI Metrics**: Clearly define the metrics and timeframes (e.g., "last 3 weeks," "year-over-year") that the AI summaries will use.

## Risk Analysis

**Category: Technical Risks**
*   **Risk**: The AI API (like GPT-4) could be slow or unavailable, creating a bottleneck when submitting reports or generating summaries.
*   **Mitigation**: Process the AI summaries asynchronously. The user can see the report is "submitted" instantly, and the AI summary appears a few moments later. Implement the "Extended Fallback Strategy" (generating a basic local summary) from your proposal for all AI features.

*   **Risk**: Queries for historical data (e.g., "compare to last 3 weeks") could become slow as the database grows, making the dashboard and summaries feel sluggish.
*   **Mitigation**: Ensure all database columns used in date-based filtering and KPI calculations are properly indexed. Consider implementing a caching layer for common dashboard queries.

**Category: User Experience (UX) Risks**
*   **Risk**: The AI-generated summaries might be inaccurate, too generic, or miss important nuances, causing users to lose trust in the feature.
*   **Mitigation**: Add a small disclaimer like "(AI-generated summary)" and provide a button for users to "rate this summary" or "flag as incorrect" to gather feedback for future improvements.

*   **Risk**: The "Post-Submission Summary" screen could be perceived as an annoying extra click by a busy Shift Leader who just wants to submit and move on.
*   **Mitigation**: Ensure the summary screen has a very clear, one-click action to finish, like a large "Done" or "Submit Another Report" button, so it doesn't feel like a roadblock.

**Category: Scope & Timeline Risks**
*   **Risk**: The logic for the historical comparisons ("compare to last month," "year-over-year") might be more complex than it seems, threatening the Week 6 timeline.
*   **Mitigation**: Prototype the core query logic for one or two AI summaries early in the project (e.g., during Week 4) to get a better estimate of the complexity and effort required.

## Dependency Map

**1. Component: Post-Submission Summary (for Shift Leader)**
*   **Dependencies**:
    *   **Data**: The data from the shift report that was just submitted.
    *   **Backend**: The KPI calculation logic (to compute efficiency, sick leave %, etc. for the summary).
*   **Impact**: This is mostly a frontend feature, but it requires the backend to provide calculated KPIs immediately after submission.

**2. Component: AI Historical Summary (for Shift Leader)**
*   **Dependencies**:
    *   **Data**: Historical shift report data (for the last day, 3 weeks, etc.).
    *   **Backend**: A new "AI Service" that can query the historical data and format it into a prompt.
    *   **External**: The OpenAI API.
*   **Impact**: This creates a new external dependency on the OpenAI API. The database schema must be optimized for efficient date-based queries. The frontend must handle asynchronous data (showing a "loading summary..." state).

**3. Component: Customizable Dashboard (for Manager)**
*   **Dependencies**:
    *   **Data**: A way to store user preferences for which KPIs are visible. This could be a new table in the database (`user_dashboard_preferences`).
    *   **Backend**: The API needs to be able to fetch and apply these preferences when loading the dashboard.
*   **Impact**: This adds a small amount of complexity to the user profile and dashboard loading logic, but it's relatively self-contained.

**4. Component: AI Performance Summary (for Manager)**
*   **Dependencies**:
    *   **Data**: Same as the Shift Leader's AI summary; requires access to historical shift data.
    *   **Backend**: The same "AI Service" can be reused here.
    *   **External**: The OpenAI API.
*   **Impact**: This reinforces the need for an efficient, reusable "AI Service" and optimized historical queries. It also means we need a secure way to manage the OpenAI API key in the application's configuration.

## Pre-mortem Analysis

**The Failure Scenario:**
It's three months after launching the new features. User engagement is low. Managers are ignoring the AI summaries, calling them "unreliable," and shift leaders are complaining that the app feels slower. The new features are considered a failure.

**What caused this failure? (Working backwards)**

1.  **Cause**: The AI summaries were often generic or slightly inaccurate.
    *   **Reason**: The prompts we designed for the AI were not tested with a wide enough variety of real-world shift notes. We didn't account for slang, typos, or unusual events. Users lost trust after seeing a few bad summaries.
2.  **Cause**: The dashboard and post-submission summaries felt sluggish.
    *   **Reason**: The historical database queries were not optimized. As soon as the database grew to a few thousand reports, the time to generate a comparison ("last 3 weeks") became too long, leading to loading spinners that frustrated users.
3.  **Cause**: The OpenAI API costs spiraled out of control.
    *   **Reason**: We didn't set a budget or monitor the costs closely in the first month. Every summary generation, good or bad, was costing money, and the expense became unjustifiable.
4.  **Cause**: Shift leaders actively disliked the post-submission screen.
    *   **Reason**: We assumed they would find it valuable, but for most, it was just an extra click in a busy workflow. They wanted to submit the report and move on to the next task.

**How could we prevent this failure?**

1.  **Prevention (for AI Accuracy)**: Before launch, create a "golden dataset" of 50-100 real (or realistic) shift notes. Use this set to rigorously test and refine the AI prompts. Involve a "friendly" manager to review the outputs and give feedback.
2.  **Prevention (for Sluggishness)**: Before launch, run performance tests on the database. Seed it with 10,000+ dummy reports and test the query times for the historical comparisons. Ensure all relevant columns are indexed from day one.
3.  **Prevention (for API Costs)**: Set up strict budget alerts in the OpenAI dashboard from the very beginning. Have a clear "kill switch" or plan to degrade the service (e.g., switch to a cheaper, faster model) if costs approach the limit.
4.  **Prevention (for Shift Leader UX)**: A/B test the post-submission screen. Show it to 50% of shift leaders and not the other 50%. Measure if there's any difference in behavior or satisfaction. This gives us data instead of relying on assumptions.

### Insights and Learnings

_Key realizations from the session_

{{insights_learnings}}

## Action Planning

### Top 3 Priority Ideas

#### #1 Priority: Customizable KPI Dashboard for Managers

- Rationale: This directly empowers managers to focus on the metrics that matter most to them, increasing the dashboard's relevance and utility.
- Next steps: 1. Define the full list of available KPIs to choose from. 2. Design the UI for how managers will select/deselect KPIs. 3. Create the database table to store their preferences.
- Resources needed: Frontend and backend developer time.
- Timeline: Integrate into Week 4 (Dashboard Development).

#### #2 Priority: Post-Submission Summary for Shift Leaders

- Rationale: Provides immediate feedback to Shift Leaders, helping them understand the impact of their shift's performance right away and improving data quality for the future.
- Next steps: 1. Design the UI for the summary screen. 2. Ensure the backend can calculate and return the necessary KPIs instantly upon submission. 3. A/B test the screen (as discussed in the pre-mortem) to measure its impact on user workflow and satisfaction.
- Resources needed: Frontend and backend developer time.
- Timeline: Integrate into Week 6 (AI Integration & Immediate Feedback).

#### #3 Priority: AI Performance Summary for Managers

- Rationale: This is a high-value feature that acts as an "analyst on demand," saving managers significant time in trend analysis and reporting.
- Next steps: 1. Prototype the backend "AI Service" to handle historical queries and prompt generation. 2. Rigorously test the AI prompts with a "golden dataset" of notes to ensure accuracy (as discussed in the pre-mortem). 3. Design the UI for the "Generate Summary" button and the display of the resulting text.
- Resources needed: Backend developer time (for the AI service), potentially some data analysis for prompt design, and OpenAI API costs.
- Timeline: Integrate into Week 6 (AI Integration & Immediate Feedback).

## Reflection and Follow-up

### What Worked Well

The **Mind Mapping** technique was very effective for tracing the user flows, and the structured **Advanced Elicitation** methods helped us thoroughly analyze the resulting ideas.

### Areas for Further Exploration

We should dedicate a future session to designing the specific prompts for the AI summaries to ensure they are as effective as possible.

### Questions That Emerged

How will we measure the success and ROI of the new AI features? (e.g., through user satisfaction surveys, reduction in time spent on analysis, etc.)



---

_Session facilitated using the BMAD CIS brainstorming framework_
