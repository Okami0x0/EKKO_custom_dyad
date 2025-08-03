# Custom AI Rules for Dyad Unlimited

# 🎯 PROJECT-SPECIFIC RULES
- Always use consistent naming conventions: PascalCase for components, camelCase for functions
- Prefer functional components over class components
- Use TypeScript strict mode for all files
- Add proper error boundaries for production code

# 🎨 DESIGN & UI RULES
- Always implement responsive design (mobile-first approach)
- Use Tailwind CSS for styling - avoid custom CSS unless absolutely necessary
- Follow accessibility guidelines (ARIA labels, semantic HTML)
- Implement dark mode support for all components
- Use consistent color scheme: primary-blue, secondary-gray, accent-green

# 🔧 CODE QUALITY RULES  
- Add JSDoc comments for all public functions
- Implement proper error handling with try-catch blocks
- Use React Query for all API calls
- Prefer composition over inheritance
- Write unit tests for critical business logic

# 📦 LIBRARY PREFERENCES
- State Management: Use Zustand instead of Redux
- Forms: Use React Hook Form with Zod validation
- HTTP Client: Use Axios with proper interceptors
- UI Components: Prefer Radix UI + Tailwind over other libraries
- Icons: Use Lucide React for all icons

# 🚀 PERFORMANCE RULES
- Always use React.memo for components that receive objects as props
- Implement lazy loading for routes and heavy components
- Optimize images (use Next.js Image component when available)
- Use useCallback and useMemo appropriately
- Avoid inline objects and functions in JSX

# 🛡️ SECURITY RULES
- Sanitize all user inputs
- Use environment variables for all API keys and secrets
- Implement proper CORS headers
- Validate all form inputs on both client and server
- Use HTTPS for all API calls

# 💾 DATA MANAGEMENT
- Use optimistic updates for better UX
- Implement proper caching strategies
- Use pagination for large datasets
- Store sensitive data in secure storage only
- Implement proper data validation schemas

# 🎭 SPECIFIC BEHAVIOR MODIFICATIONS
- When creating forms, always include loading states and error handling
- For any list/table component, include search and filtering capabilities
- Always provide feedback to users (success/error messages, loading spinners)
- Implement undo functionality for destructive actions
- Add keyboard shortcuts for power users

# 🤖 AI ASSISTANT BEHAVIOR
- Be more verbose in explanations when implementing complex logic
- Always suggest best practices and potential improvements
- Provide multiple implementation options when appropriate
- Include comments explaining non-obvious code decisions
- Ask clarifying questions if requirements are ambiguous

# Example Custom Rules:
# - Never use `any` type in TypeScript
# - Always implement error boundaries for new page components
# - Use React Suspense for data fetching components
# - Implement skeleton loaders for all loading states
# - Add data-testid attributes for all interactive elements
