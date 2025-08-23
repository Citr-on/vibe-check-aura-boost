# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e170599d-0add-4a6c-ba73-4ea5a3538c49

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e170599d-0add-4a6c-ba73-4ea5a3538c49) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- HugeIcons Pro (for premium icon sets)

## HugeIcons Pro Setup

This project uses HugeIcons Pro for premium icon styles including Twotone variants.

### NPM Authentication Required

To install and use HugeIcons Pro, you need to authenticate with npm using the provided token:

```sh
# Set up npm authentication for HugeIcons Pro
npm config set @hugeicons:registry https://npm.fontawesome.com/
npm config set //npm.fontawesome.com/:_authToken EB56C210-AC0307CF-032BB688-77268BB0
```

### Installation Commands

```sh
# Install HugeIcons React package (requires authentication)
npm install @hugeicons/react

# Or if using the development setup:
npm i
```

### Usage Example

```tsx
import { IconWrapper } from '@/components/ui/IconWrapper';
import { Home01Icon } from '@hugeicons/react';

// Using Pro Twotone style (requires Pro license)
const MyComponent = () => (
  <IconWrapper 
    icon={Home01Icon} 
    variant="twotone" 
    size={24}
    className="text-primary"
  />
);
```

**Note:** The Pro styles (twotone, bulk, duotone) require proper npm authentication and a valid HugeIcons Pro license.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e170599d-0add-4a6c-ba73-4ea5a3538c49) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
