# Angular auto dependency mock

A Visual Studio Code [extension](https://marketplace.visualstudio.com/items?itemName=pschmitz.angular-auto-dependency-mock) that automatically generates most of the boilerplate code that a test file needs.

## Features

- Generates necessary imports and providers
- Generates all methods that are to be tested and puts them into nested describes

## Usage

1. Naviage into the desired file
2. Press Ctrl + Shift + P to open the command prompt
3. Execute command "Generate Code"
4. Wait for extension to finish, bottom right indicator

**Notes:**

- If the MockModule or MockProvider, says something like "it's being used as a value here", you need to update the import of that
  Module/Provider
