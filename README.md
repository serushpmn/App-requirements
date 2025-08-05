# Windows Software Performance Comparison Platform

This application is a comprehensive platform for comparing Windows software performance and estimating your system's performance.

## Features

- 📊 Comprehensive information about various Windows software
- 🔍 Search and filter software by category
- ⚡ Performance estimation for your system for each software
- 🔄 Compare performance of two different systems
- 📱 Responsive and modern user interface

## Installation and Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the project:**
   ```bash
   git clone <repository-url>
   cd windows-software-comparison
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application in development mode:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   The application will be available at `http://localhost:3000`

### Useful Commands

```bash
# Run the application in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Check code for errors
npm run lint
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Main application layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── package.json           # Project configuration and dependencies
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md             # Project guide
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Programming language
- **Tailwind CSS** - CSS framework
- **Lucide React** - Icons
- **React Hooks** - State management

## How to Use

### 1. Search and Filter
- Use the search field to find the desired software
- Use the dropdown menu to filter by category

### 2. View Software Information
- Click on any software to display complete information
- Information includes minimum and recommended system requirements

### 3. System Performance Estimation
- Enter your system specifications (RAM, CPU, GPU)
- Estimated performance for each software is displayed

### 4. Compare Two Systems
- Select a software and its version
- Enter specifications for two different systems
- Performance of both systems is compared

## Performance Status

- 🟢 **Smooth**: Your system is better than the recommended minimum
- 🟡 **Acceptable**: Your system meets the minimum requirements
- 🟠 **Slow**: Your system is slightly below minimum but may still work
- 🔴 **Unusable**: Your system is below the minimum requirements

## Contributing

To contribute to the development of this project:

1. Fork the project
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For reporting issues or suggestions, please create an Issue. "# App-requirements" 
