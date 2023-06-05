Project Description:
This project is a full-stack website that enables users to create accounts and utilize various features to create and view study guides. It provides a seamless user experience for organizing and accessing educational materials. Users can sign up for an account, allowing them to create their own study guides or browse and view study guides created by other users.

Technologies used:
Typescript
Express framework for backend
Vite React for frontend
Redux for certain stateManagement
MongoDB for database
Jason Web Token for authentication

Front-End:
[x] Create Home, Login, SignUp, ViewAll, and Guide pages (basic UI)
[x] use react router to display basic behavior of movement between pages
[x] create UI for the flashcards, where flashcards flip smoothly
[x] create slideshow like component which hosts the flashcards with next and previous buttons
[x] create redux store and reducers to store authentication state
[] hook up the backend API to the frontend using axios
[] edit the components in the frontend to display desired behavior according to data recieved from backend
[] test to make sure UI behavior is desired behavior

Back-End
[x] fix the CORS options to allow the frontend access to the API
[x] create User router, to handle account based API calls
[x] create guides router, to handl guide based API calls
[x] create signUp, login, logout, viewPersonals and viewFavorites, changeFavorites for the user Router
[x] create createGuide, GetGuide, GetPrivGuides, Delete Guide, ChangeAccess, UpdateNotesAndCards, GetPopularGuides, GetallGuides, UpdateLikes, GetEditingRights for the guides router
[x] create authentication middleware function to check for the Jason Web Token for authentication
[x] test all API calls

TODOS:
1. create useEffect api calls on every page with the corresponding API call
2. Change viewALl buttons to view desired resource (personal or popular), add a view favorites button, add 2 new router links for missing view pages.
3. fix up the react components to take in the correct arguments to render in data from API calls rather than just the hard coded data for UI development

