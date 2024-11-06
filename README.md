# Spotify Playlists Manager

Spotify Playlists Manager is a web application that allows users to manage and curate their Spotify playlists easily. By leveraging the Spotify Developer API, this app enables users to view their liked songs, manage their playlists, and add or remove songs from their playlists with ease.

An online version is currently available at the following address: https://spotify-playlist-manager-coral.vercel.app/

## Features

- **Login with Spotify**: Use your Spotify account to log in and grant necessary permissions.
- **Manage Playlists**: View all your playlists and the songs within them.
- **Add/Remove Songs**: Easily add or remove songs from your playlists or liked songs by clicking on ticks and crosses in a table.
- **Sorting & Filtering**: Sort and filter songs to quickly find what you're looking for.
- **Real-Time Syncing**: Any changes made to your playlists are instantly reflected in your Spotify account.

## Screenshots

![image](https://github.com/user-attachments/assets/63ab8420-3c0d-437c-8efe-193937f98437)


## How It Works

1. **Login**: After landing on the website, click the login button to authenticate with your Spotify account. You will be prompted to grant the app permissions to access your playlists and liked songs.
2. **View Your Songs**: Once logged in, you will see a table with your songs listed in rows and playlists as columns.
3. **Add/Remove Songs**: Click on the tick or cross next to a song in a playlist to add or remove it. The table will update in real time.
4. **Sort & Filter**: Use the built-in sorting and filtering options to organize your songs and playlists more effectively.
5. **Sync**: Changes you make in the app will be reflected in your actual Spotify account.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (React + Redux)
- **Spotify API**: Utilizes the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for authentication, fetching playlists, and managing song data.
- **OAuth2 Authentication**: OAuth2 flow for securely authenticating users with their Spotify accounts.

## Prerequisites

Before you begin, make sure you have the following:

- A Spotify Developer account and access to the [Spotify Web API](https://developer.spotify.com/)
- Node.js and npm installed on your local machine.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/TimotheeMonceaux/spotify-playlists-manager.git
cd spotify-playlists-manager
```

### 2. Install dependencies
Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```
Your app will be available at http://localhost:3000 in your browser.

## Usage
- Open the application in your browser.
- Log in with your Spotify account to authorize the app.
- After logging in, the app will display your playlists and liked songs in a table format.
- Use the sorting and filtering options to find specific songs.
- Click the ticks and crosses to add/remove songs from your playlists.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Please follow these steps:

- Fork the repo.
- Create a new branch (git checkout -b feature/your-feature-name).
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/your-feature-name).
- Open a pull request.

## Contact
For any issues or feature requests, feel free to open an issue on GitHub.
