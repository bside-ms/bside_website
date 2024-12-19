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
