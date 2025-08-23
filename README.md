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
- Lucide React (for icons)
- HugeIcons (for premium icon styles)

## HugeIcons Integration

This project uses HugeIcons for beautiful, consistent icons throughout the application.

### Installation

```sh
npm install @hugeicons/react @hugeicons/core-free-icons
```

### Usage Pattern

```tsx
import { HugeiconsIcon } from '@hugeicons/react';
import { SearchIcon, UserIcon, PlusSignIcon } from '@hugeicons/core-free-icons';

// Basic usage
<HugeiconsIcon icon={SearchIcon} size={24} />

// With custom styling
<HugeiconsIcon icon={UserIcon} size={20} className="text-primary" />
```

### Available Icons
- Navigation: `UserIcon`, `SearchIcon`, `PlusSignIcon`
- Actions: `FilterIcon`, `EditIcon`, `DeleteIcon`
- UI Elements: `Loading01Icon`, `ArrowUp01Icon`, `ArrowDown01Icon`
- Content: `MailIcon`, `LockIcon`, `NoteIcon`

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e170599d-0add-4a6c-ba73-4ea5a3538c49) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
