- How did you decide on the technical and architectural choices used as part of your solution?
    I picked the simplest thing that does the job well. React + Vite for a fast, no-nonsense setup, 
    three page files because it is asked, no router library just hash routing; this causes few
    features but this app is supposed to be simple and readable so thats what I used. 
    Each page fetches the feed (remote first, local if remote doesn't work),
    filters year as 2010+ and by type, sorts by title, and shows 21 items.
    One CSS file and Vite’s asset URLs keep styling straightforward, 
    Clear, minimal, nothing extra.
- Are there any improvements you could make to your submission?
    I would add search and better filters, smooth out loading and error messages, improve accessibility 
    and maybe add mobile layout, and add a few tests with a simple quality check.
- What would you do differently if you were allocated more time?
    I would replace hash routing with React Router, extract shared layout into components,
    add search/filter in URL parameters and add simple page transition animations.

Vercell app: demo-streaming-react.vercel.app