# Backend File Structure Documentation

## Overview
This document provides a comprehensive guide to the optimized backend file structure, explaining each directory's purpose, contents, and best practices.

## Root Directory Structure
```
backend/
├── config/
├── src/
├── utils/
└── tests/
```

## 1. Config Directory
```
config/
├── database.php
└── constants.php
```

### Purpose
- Houses all configuration-related files
- Centralizes environment-specific settings
- Manages application constants

### Components
- `database.php`: 
  - Database connection parameters
  - Connection pool settings
  - Database credentials (via environment variables)
  - Replaces the original connect_db.php with better organization

- `constants.php`:
  - Application-wide constants
  - Environment-specific values
  - Feature flags
  - Configuration parameters

## 2. Source Directory (src)
```
src/
├── forms/
│   ├── templates/
│   └── validators/
├── handlers/
│   ├── js/
│   └── php/
└── services/
```

### Forms Directory
- `templates/`:
  - Reusable form structures
  - Form layout definitions
  - Base form classes
  - Previously SampleForms, now better organized
  - Example: registration.template.php, contact.template.php

- `validators/`:
  - Form validation logic
  - Input sanitization rules
  - Custom validation rules
  - Example: UserInputValidator.php, FormDataSanitizer.php

### Handlers Directory
- `js/`:
  - JavaScript event handlers
  - AJAX request handlers
  - Client-side form processing
  - Example: formSubmitHandler.js, asyncDataHandler.js

- `php/`:
  - PHP request handlers
  - Server-side form processing
  - API endpoints
  - Example: FormProcessor.php, ApiHandler.php

### Services Directory
```
services/
├── auth/
├── email/
└── data/
```
- Business logic layer
- Service-specific implementations
- Reusable business operations
- Example: AuthenticationService.php, EmailService.php

## 3. Utils Directory
```
utils/
├── helpers/
└── middleware/
```

### Helpers Directory
- Utility functions
- Common operations
- Shared helper methods
- Example: StringFormatter.php, DateHelper.php

### Middleware Directory
- Request/response middleware
- Authentication middleware
- Logging middleware
- Example: AuthMiddleware.php, LoggerMiddleware.php

## 4. Tests Directory
```
tests/
├── unit/
├── integration/
└── fixtures/
```

### Purpose
- Contains all test-related files
- Organized by test type
- Includes test data and fixtures

### Components
- `unit/`: Individual component tests
- `integration/`: Multi-component tests
- `fixtures/`: Test data and setup files

## Best Practices

### 1. File Naming Conventions
- Use PascalCase for classes: `UserController.php`
- Use camelCase for functions: `handleFormSubmit.js`
- Use kebab-case for templates: `user-profile.template.php`

### 2. Directory Organization
- Keep related files together
- Maintain shallow hierarchy (max 3-4 levels)
- Group by feature when possible

### 3. Code Organization
- One class per file
- Consistent file extensions
- Clear separation of concerns

### 4. Security Considerations
- Keep sensitive files outside web root
- Use environment variables for credentials
- Implement proper access controls

## Migration Guide

### Step 1: Create New Structure
```bash
mkdir -p backend/{config,src/{forms/{templates,validators},handlers/{js,php},services},utils/{helpers,middleware},tests}
```

### Step 2: Move Files
1. Move connect_db.php to config/database.php
2. Move SampleForms content to src/forms/templates
3. Reorganize handlers into respective js/php directories

### Step 3: Update References
1. Update include/require statements
2. Modify autoloader configurations
3. Update deployment scripts

## Maintenance Guidelines

1. Regular Review
   - Audit file organization quarterly
   - Remove unused code
   - Update documentation

2. Version Control
   - Maintain clear commit messages
   - Tag major structure changes
   - Document structural updates

3. Documentation
   - Keep README up to date
   - Document any deviations
   - Maintain change log

## Conclusion
This structure provides a scalable, maintainable, and secure foundation for backend development. It improves upon the original structure by:
- Better organization of components
- Clearer separation of concerns
- Improved maintainability
- Enhanced security
- Better testing support

Remember to adapt this structure based on specific project needs while maintaining the core organizational principles.
