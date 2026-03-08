Perform a security audit of this codebase. Scan all source files and report any vulnerabilities you find.

Check for the following categories:

**Injection & Input Handling**
- SQL injection, command injection, XSS (cross-site scripting)
- Unsanitized user input passed to `dangerouslySetInnerHTML`, `eval`, `Function()`, or shell commands
- Template injection

**Authentication & Authorization**
- Hardcoded credentials, API keys, secrets, or tokens in source files
- Missing authentication checks on sensitive routes or API endpoints
- Insecure session handling or JWT usage

**Data Exposure**
- Sensitive data logged to the console
- PII or secrets exposed in error messages or API responses
- Overly permissive CORS configuration

**Dependency & Supply Chain**
- Calls to `eval` or dynamic `require`/`import` with user-controlled input
- Use of known-dangerous functions or deprecated APIs

**Next.js / React Specific**
- Server Actions that lack input validation
- API routes missing rate limiting or auth
- Environment variables exposed to the client (e.g., `NEXT_PUBLIC_` prefix on secrets)
- `dangerouslySetInnerHTML` usage without sanitization

**General**
- Use of `Math.random()` for security-sensitive purposes (prefer `crypto`)
- Insecure direct object references
- Missing CSRF protection

For each finding, report:
1. **File and line number**
2. **Severity** (Critical / High / Medium / Low)
3. **Description** of the vulnerability
4. **Recommended fix**

If no vulnerabilities are found in a category, note that it was checked and is clear. End with a summary of findings by severity.
