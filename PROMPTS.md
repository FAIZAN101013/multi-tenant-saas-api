# PROMPTS.md

## 1. Architecture Prompt

Initial AI Prompt:

> Build a multi-tenant SaaS backend API using Node.js, Express, MongoDB, and JWT authentication. The system should support Organizations, Projects, and Tasks with proper relationships and tenant isolation. Include protected routes, nested endpoints, validation, and proper folder structure.

---

# 2. Refinement Loop

## Example 1 — Tenant Isolation Bug

### Original AI Output

```js
const project = await Project.findById(id);
```

### Problem

This query did not enforce organization-based filtering.

A user from one organization could potentially access another organization's project data if they knew the project ID.

This breaks multi-tenant isolation and is a serious security issue.

### My Fix

```js
const project = await Project.findOne({
  _id: id,
  organizationId: req.user.organizationId,
});
```

### Why I Changed It

I added organization filtering to ensure users can only access data belonging to their own organization.

This enforces proper tenant isolation throughout the application.

---

## Example 2 — Missing Task Validation

### Original AI Output

```js
const task = await Task.create(req.body);
```

### Problem

The AI-generated code trusted client input completely and did not verify whether the project belonged to the same organization.

This could allow cross-organization task creation.

### My Fix

```js
const project = await Project.findOne({
  _id: projectId,
  organizationId: req.user.organizationId,
});
```

### Why I Changed It

I validated project ownership before task creation to prevent users from attaching tasks to projects owned by other organizations.

---

## Example 3 — Improving Nested Data Response

### Original AI Output

```js
const tasks = await Task.find({
  projectId: project._id,
});
```

### Problem

The response only returned raw ObjectIds for related project data.

### My Fix

```js
const tasks = await Task.find({
  projectId: project._id,
  organizationId: req.user.organizationId,
}).populate("projectId", "name");
```

### Why I Changed It

I added tenant filtering and populated related project data to create cleaner and more informative API responses.

---

# 3. AI Blindspot Note

During the challenge, the AI consistently generated code that worked functionally but sometimes missed important multi-tenant security checks.

The most common issue was forgetting to filter database queries using `organizationId`.

I manually reviewed all protected queries and ensured every resource access enforced tenant isolation.

The AI also generated some overly simplistic CRUD logic that required additional validation and relationship checks before being production-safe.

---

# 4. Final Cleanup Prompt

Final AI Prompt:

> Perform a final production-style cleanup and polish review for the completed backend API. Focus on security, tenant isolation, validation, safer error handling, response consistency, async/await correctness, missing returns after responses, invalid ObjectId handling, and MongoDB query efficiency. Keep the project intern-level but professional, and avoid major architecture changes or unnecessary new libraries.

### Final Improvements Made

I used this final review to tighten the API without overengineering it.

The cleanup focused on replacing internal error messages with safer generic responses, adding validation for project and task inputs, checking ObjectId handling before database queries, improving JWT middleware, and keeping all protected queries scoped by `organizationId`.

I also improved small code quality issues such as response consistency, unnecessary comments, missing `return` statements after responses, and query indexes for common tenant-filtered lookups.


