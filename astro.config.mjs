import { defineConfig } from 'astro/config';

export default defineConfig({
  // Replace "username" with the GitHub username or organization that will own
  // the Pages site, for example: "https://octocat.github.io".
  site: 'https://username.github.io',

  // Use "/hapkido-path" while this is published as a GitHub Pages project site
  // at https://<username>.github.io/hapkido-path/.
  // Change this to "/" if the site later moves to a custom domain or to a
  // user/organization Pages repository such as <username>.github.io.
  base: '/hapkido-path',

  output: 'static'
});
