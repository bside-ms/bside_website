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

This project uses **Docker Hub Automated Builds** for continuous deployment:

1. **Code Push**: When code is pushed to the GitHub repository, Docker Hub automatically detects the changes
2. **Automatic Build**: Docker Hub executes the `hooks/build` script to build the Docker image
3. **Environment Selection**: The build script automatically selects production or development environment variables based on the git branch:
    - `main` branch → Production environment variables (`latest` tag)
    - `dev` branch → Development environment variables (`latest-test` tag)
4. **Image Tagging**: The built image is tagged with the git commit hash and branch-specific tags:
   - `main` → `seebruecke/bside-website:a1b2c3d` + `seebruecke/bside-website:latest`
   - `dev` → `seebruecke/bside-website:b2c3d4e` + `seebruecke/bside-website:latest-test`
5. **Registry Push**: The image is automatically pushed to Docker Hub
