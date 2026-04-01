# Candidate Decisions & Notes

Please use this file to briefly outline your technical choices and the rationale behind them.

## 1. State Management & Architecture
*Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?*

State Management & Architecture: 
1. Store search, category, and page in the URL so the app is shareable, refresh-safe, and works with browser navigation. 
2. keep API data in a single state object to match the response shape and keep things organized. 
3. Separate states for loading and error make rendering simple and predictable.

For handling flaky api: 
4. Implemented retry with exponential backoff (3 attempts). 
5. Prevents immediate failure and avoids spamming the server. 
6. Shows an error + Retry button if all attempts fail.

7. Reset page to 1 when filters change (better UX) 
8. Reusable Pagination component (separation of concerns) 


## 2. Trade-offs and Omissions
*What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?*

What I intentionally left out:
1. Data fetching library (React Query)
2. Advanced state management with redux

What I’d prioritize next:
1. Add React Query for caching, retries, and request deduplication
2. Improve UX further (e.g., optimistic UI, better accessibility)


## 3. AI Usage
*How did you utilize AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you.*

I used AI to enhance thinking and refine implementation, while the overall architecture and decisions were my own.


## 4. Edge Cases Identified
*Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here.*

1. Because of random delay (500–2500ms), slower old requests can overwrite newer results.
2. Because of random api failures (20%) even valid requests can fail.
