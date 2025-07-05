# React Native Auth Template

A modern and modular authentication template for React Native  
with beautiful animated input fields, fully themeable UI, custom buttons, Redux integration, and a clean scalable architecture.

---

## 🚀 Quick Start

1. **Clone the repository:**

    ```bash
    git clone https://github.com/SpiritON/requestumAuthApp.git
    cd YOUR_REPO
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **If you are running on iOS (Mac only):**

    - Install CocoaPods (if not installed):
      ```bash
      sudo gem install cocoapods
      ```
    - Install pods:
      ```bash
      cd ios && pod install && cd ..
      ```

4. **Start Metro Bundler (if not started automatically):**

    ```bash
    npm start
    ```

5. **Run on Android:**

    ```bash
    npm run android
    ```

   **Or run on iOS (Mac only):**

    ```bash
    npm run ios
    ```

---

> _Requires Node.js (v18+), npm, and React Native CLI.  
> For iOS, Xcode and CocoaPods must be installed.  
> For Android, Android Studio and an emulator or device should be set up._

---


## ✨ Features

- **Authentication & Registration Flows**
  - Animated email and password inputs with floating label
  - Error shake animation on invalid input
  - AsyncStorage-based token storage
  - Redux Toolkit user state management

- **Beautiful, Themeable Design**
  - All colors, typography, spacing, and sizes managed by a single theme provider
  - Easily switch styles via the central `theme` object
  - Built with styled-components for clear and flexible styling

- **Reusable Custom Components**
  - **Button:** Accepts any color, supports loading state, shake animation, and different variants ("button" and "text")
  - **InputField:** Animated floating label, SVG icons, show/hide password (eye), keyboard type for email/password
  - **Screen Templates:** Loader, splash screen, backgrounds with blurred PNG ellipses

- **Security & Validation**
  - Email and password validation (customizable rules)
  - Secure storage of authentication tokens

- **Architecture & Code Quality**
  - Modular file structure: `components/`, `store/`, `theme/`, `utils/`, `types/`
  - Strong TypeScript typing everywhere
  - Built for scaling and easy extension

🛠️ Stack
- React Native (pure RN, not Expo)

- TypeScript

- Redux Toolkit

- styled-components

- AsyncStorage

- SVG icons (react-native-svg-transformer)
