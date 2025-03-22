# Welcome to the [EnterCinema](https://entercinema.com/) Project.

> [!TIP]
> For backend repository click [here](https://github.com/imprvhub/entercinema-drf)


![Guide GIF](./static/previews/entercinema.png)

## What's New:

### Integrated Python Backend: 

EnterCinema seamlessly integrates a Django Rest Framework backend for robust user authentication, ensuring enhanced security and access control via the Django Administration Panel.

### Comprehensive User Profile Management: 

Users enjoy complete control over their profiles, with the ability to save favorite movies and TV series, personalize their entertainment preferences, and conveniently access account settings. The addition of a user profile menu on both the main and profile pages further enhances user interaction, providing easy access to authentication and account customization options, including avatar changes.

### Advanced Search Filters: 

Implemented advanced search functionality by year, genre, and rating. This enhancement allows users to filter search queries more precisely, making it easier to find exactly what they are looking for.

### Upcoming Releases: 

Added a new ‘Upcoming Releases’ page that highlights forthcoming releases of TV shows and movies. For authenticated users, the content is personalized according to their preferences, ensuring they receive updates tailored to their interests.

### Effortless Social Media Sharing:

EnterCinema empowers users to share their favorite movies and TV series effortlessly across various social media platforms, fostering engagement and expanding the community.

### Community-driven User Reviews:

Users can explore insightful reviews for specific movies and TV shows, facilitating community engagement and providing valuable feedback from fellow users.

### Extensive Provider Options:

With multiple provider options available for each movie and TV show, EnterCinema informs users about the streaming platforms where they can access specific content.

### Enhanced Content Discovery with New Carousels:

Introducing intuitive carousels for different movie and TV series categories, EnterCinema elevates the browsing experience and simplifies content discovery for users.



## Installation

### Vue.js Frontend:
To run this project locally, follow these steps:

1. Clone the repository to your local machine:
```bash
git clone https://github.com/imprvhub/entercinema.git
```
2. Install the necessary dependencies:
```bash
yarn install
```
3. Before running the project, you need to set up your environment variables in a .env file. Here's how:
```bash
FRONTEND_URL=<Specify the URL where your frontend will be hosted, e.g., 'https://localhost:3000' or your custom domain.>
API_KEY=<Provide your TMDB API key here>
SUPABASE_URL=<Enter the URL for your database, e.g., your Supabase database URL>
SUPABASE_ANON_KEY=<Enter the anonymous key for your database, e.g., your Supabase anonymous key>    
```
  By default, EnterCinema is configured to work with Supabase as the backend DRF database. However, you can use another database if needed. Simply replace DATABASE_URL and DATABASE_ANON_KEY with the appropriate values based on your database configuration.

4. Run the project:
  ```bash
  yarn dev
  ```
  The project should be accesible at, e.g., 'http://localhost:3000'

<hr>

### Django Rest Framework Backend:
To set up the Django Rest Framework backend for EnterCinema, follow these steps:

### Prerequisites:
[Python 3.9](https://www.python.org/downloads/release/python-390/)

1. Clone the backend repository to your local machine:
```bash
git clone https://github.com/imprvhub/entercinema-drf.git
```

2. Install Dependencies:
Navigate to the project directory and install the necessary dependencies using pip:
```bash
cd entercinema-drf
pip install -r requirements.txt
```

3. Set Up Environment Variables.
Create a .env file in the project directory and define the following variables:
```bash
DB_NAME=<Enter your database name>
DB_USER=<Enter your database username>
DB_PASSWORD=<Enter your database password>
DB_HOST=<Enter your database host, e.g., localhost>
DB_PORT=<Enter your database port>
```

4. Apply Migrations:
```bash
python manage.py collectstatic
```

5. Collect static files for deployment:
```bash
python manage.py collectstatic
```

6. Run the server:
```bash
python manage.py runserver
```

### Feedback:
Your feedback is valuable! If you encounter any issues or have suggestions for improvements, please create a new issue in the [GitHub repository](https://github.com/imprvhub/entercinema/issues/new).

##### Planned Features and Fixes for v1.4.0:

- **Feat(advanced-search): Add 'With Watch Providers' Parameter** [ce4f5bf](https://github.com/imprvhub/entercinema/commit/ce4f5bf559a9031de292b375ae8375e08822b59e)
  - Implement a dropdown in the advanced search to filter TV shows by watch provider (Apple TV+, Disney+, Hulu, Max, Netflix, Prime Video).
  - Ensure the dropdown is visible only when 'TV Show' is selected, and pass the selected provider ID to the TMDB API call.

- **Fix: Navbar Icon Alignment and Padding** [5bc39c1](https://github.com/imprvhub/entercinema/commit/5bc39c13fe4d5933dfff18ab6711d3271c0fcb0b)
  - Refined the alignment and padding of navbar icons to improve responsiveness by editing their alignment directly from the assets.

- **Fix: Filtering Series in fetchTrendingTv Function** [5bc39c1](https://github.com/imprvhub/entercinema/commit/5bc39c13fe4d5933dfff18ab6711d3271c0fcb0b)
  - Applied a filter in the `fetchTrendingTv` function to exclude Japanese series from the 'upcoming' list. Reason: The overwhelming number of Japanese anime series (approximately 80% of results) was overshadowing other genres. This filter aims to enhance the visibility of diverse series offerings.

- **Fix: Alignment of Language Picker in Global Footer** [5bc39c1](https://github.com/imprvhub/entercinema/commit/5bc39c13fe4d5933dfff18ab6711d3271c0fcb0b)
  - Corrected the language picker in the global footer component to prevent visual replacement of the selected language before redirecting. This fix addresses menu misalignment issues on the origin page.

- **Update: Search Function, Terms Component, Minimum Rating in Advanced Search, and Watchlist Pagination** [f88bda2](https://github.com/imprvhub/entercinema/commit/dcdfb2b368712d818240ce24bb773c4f2bb47bd8)
  - Add `include_adult=false` parameter to search function in `index.js`.
  - Update `terms.vue`.
  - Change minimum search rating to 6 from 7 in the advanced search page.
  - Add pagination-footer to the watchlist page to provide additional pagination controls in the footer, improving user navigation.


### Attributions

The foundational inspiration for this project is derived from the [TasteJS](https://github.com/tastejs/nuxt-movies) repository, and I extend my gratitude for their pioneering work.

Data concerning movies and TV shows are sourced from [TMDB](https://www.themoviedb.org/), while information on streaming providers, networks, and platforms is obtained from [JustWatch](https://www.justwatch.com/).

For further details, please refer to these [Terms and Conditions](https://entercinema.com/terms/).

### Conclusion:

#### Achievements:
- **Synergistic Integration:** Successfully integrated Vue.js and Django Rest Framework, two less commonly paired technologies, this presented me with an intriguing challenge. Despite my prior experience with Django, blending it with Vue.js required careful problem-solving and adaptability. I successfully tackled hurdles encountered while implementing Django user authentication.

- **Streamlined UX/UI Integration and Data Management:**  Successfully tackled the complexities of UX/UI design, encompassing the management of diverse global and dynamic components, API integration, seamless data transmission between frameworks, and robust user experience and authentication. Despite initial complexities, diligent effort and incremental improvements paved the way for adept navigation through these challenges.

##### Learnings:
- **Improvements Through Perseverance:** This project allowed me to delve even deeper into the world of Vue.js. Just three months ago, facing the implementation of Vue.js seemed daunting due to its complexity. However, thanks to daily and constant effort, as well as my perseverance, I not only managed to understand the underlying logic required, but I also exceeded my initial expectations. This experience not only motivated me to explore new possibilities but also pushed me to implement features that I previously considered beyond my reach, especially in the frontend realm.
This project consolidated my perseverance and commitment to continuous learning. The consistent dedication to this project not only strengthened my confidence but also significantly expanded my skill set. From the start of the planning process to the successful conclusion of the project, this journey highlights how perseverance and dedicated effort can transform both personal and professional growth.