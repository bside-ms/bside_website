# Development

Run the development server:

```bash
npm run dev
```

## Components

We use [shadcn-ui](https://ui.shadcn.com/) for the UI components. You can find the existing components under the `components/ui` directory.
For examples and usage, refer to the official shadcn documentation. To add a new component, run the following command:
`npx shadcn add <component-name>`. This will generate the necessary files and include them in the `components/ui` directory. Make sure to
update any relevant styles or configurations as needed.

After adding a new component, you will likely need to fix the code style to adhere to our formatting standards. Additionally, ensure the cn
import is correctly handled, as it may need to be adjusted.

# Live Release

GitHub Actions builds and pushes the production image when `main` is updated.

1. **Lint** runs on every push.
2. **Image build** runs only on `main`. Docker Hub login uses the `DOCKERHUB_TOKEN` secret. Build args come from repository **variables** (`PAYLOAD_URL`, `FRONTEND_URL`, `TURNSTILE_SITE_KEY`, `MATOMO_SITE_ID`, `MATOMO_ENDPOINT`). The Dockerfile maps those to `NEXT_PUBLIC_*` for Next. They are public client values.
3. Tags pushed to the **public** Docker Hub repo:
    - `bsidems/bside-website:latest`
    - `bsidems/bside-website:<git sha>`
4. On the server (`/srv/docker/b-side.ms/website/`):

```bash
docker compose up -d --pull always
```

The Hub repo is public on purpose. This GitHub repo is public, and the image only bakes `NEXT_PUBLIC_*` values that already ship to the browser (CMS URL, site URL, Turnstile site key, Matomo). Runtime secrets (`REVALIDATION_KEY`, mail, Turnstile secret, API keys) stay in `website.env` on the server. Do not pass real secrets as Docker build args.

`bsidems` has one private-repo slot. Keep that for something that must stay private. A public image also means the server can pull without `docker login`.

`hooks/build` is leftover from Docker Hub Automated Builds and is not used anymore.
