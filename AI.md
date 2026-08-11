# AI Assistance

AI was used as a development accelerator and review partner during this task. I mainly used it for code review, security checks, repetitive test setup, and identifying missing or potentially risky parts of the implementation.

## Where AI Was Used

AI assistance was used for:

* Reviewing the React and NestJS authentication flow.
* Reviewing validation and error handling.
* Reviewing JWT and cookie-based authentication.
* Identifying security issues such as `localStorage` token storage, rate limiting, and duplicate email handling.
* Generating and improving Jest test cases.
* Reviewing frontend authentication state and API error handling.
* Reviewing the final implementation against the task requirements.
* Suggesting the backend CI workflow.

## How I Used AI

I worked incrementally instead of asking AI to build the whole application at once.

Typical prompts included:

* "Review the authentication flow for security and production-readiness issues."
* "Review this implementation against the task requirements."
* "What are the risks of storing the JWT in localStorage?"
* "Review these tests and identify whether they test actual behavior."
* "Fix this issue without changing the existing architecture."

I then reviewed the suggestions, implemented the relevant changes, and verified them using tests, builds, linting, and manual testing.

## Corrections and Rework

Some AI suggestions required changes after testing:

* Cookie handling had a TypeScript/runtime issue with the `cookie-parser` import and was corrected.
* Swagger initially documented the wrong authentication cookie name.
* After moving the JWT to an `HttpOnly` cookie, the frontend authentication state was changed to use a protected `/auth/me` endpoint instead of relying on a stored user ID.
* Initial NestJS tests were mostly construction tests, so they were replaced with behavioral tests for registration, login, duplicate emails, password hashing, and account deletion.
* Password validation had an incorrect case-insensitive regular expression and was corrected.
* The account deletion flow was fixed so logout/success handling only happens after a successful API request.
* Some frontend styling was simplified to avoid mixing multiple UI libraries.

## Engineering Decisions

A few important decisions were made based on the application's scope:

* JWTs are stored in an `HttpOnly` cookie instead of `localStorage`.
* The backend remains the source of truth for authentication and authorization.
* Frontend validation is used for user feedback, while backend validation remains authoritative.
* Rate limiting uses an in-memory store for this assessment. A distributed production deployment would use Redis.
* Account deletion uses the authenticated user's identity instead of accepting a user ID from the client.

## Verification

The backend was verified with:

* ESLint
* TypeScript/NestJS build
* Jest unit tests

The frontend was verified with:

* ESLint
* TypeScript type-check
* Manual authentication flow testing

The frontend test runner could not be executed in the restricted AI environment because `esbuild` was not allowed to spawn. This should be run locally before submission.

AI was used as a productivity and review tool, while the final implementation, corrections, and engineering decisions were reviewed and verified by me.
