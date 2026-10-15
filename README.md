# Automotive Engineering Explorer 🏎️⚙️

> **Interactive Digital Vehicle Laboratory & Systems Encyclopedia**  
> An educational web platform designed to deconstruct the physics, mechanics, and electronics of the modern automobile.

---

## 📑 Table of Contents

1. [Overview & Mission](#overview--mission)
2. [Key Features](#key-features)
3. [The Seven Core Automotive Systems](#the-seven-core-automotive-systems)
4. [3D & 2D Vehicle Explorer](#3d--2d-vehicle-explorer)
5. [Engineering Animation System](#engineering-animation-system)
6. [Multilingual Architecture (Armenian, English, Russian)](#multilingual-architecture)
7. [Integrated AI Automotive Assistant](#integrated-ai-automotive-assistant)
8. [Technology Stack](#technology-stack)
9. [Project Structure](#project-structure)
10. [Prerequisites & Installation](#prerequisites--installation)
11. [Configuration & Environment Variables](#configuration--environment-variables)
12. [Running the Application](#running-the-application)
13. [Testing & Quality Assurance](#testing--quality-assurance)
14. [Safety & Educational Disclaimer](#safety--educational-disclaimer)

---

## 1. Overview & Mission

Modern automobiles are marvels of synchronized mechanical, hydraulic, and electrical engineering. Yet most drivers and students interact with them as closed black boxes.

**Automotive Engineering Explorer** strips away the outer sheet metal, revealing the physical principles behind:
- Four-stroke thermodynamic cycles and electric induction motors.
- Gear ratio torque multiplication and differential bevel cornering.
- Hooke's law spring compression and viscous hydraulic damping.
- Pascal's principle in hydraulic braking and ABS pulse modulation.
- Ackermann steering geometry kinematics.
- CAN-bus serial communications and closed-loop ECU fuel trimming.
- Boron steel passenger safety cages and progressive crumple energy absorption.

The application serves engineering students, technicians, and automotive enthusiasts worldwide with rigorous technical fidelity, interactive simulations, and native trilingual support.

---

## 2. Key Features

- **Digital Vehicle Laboratory:** 3D interactive car model with OrbitControls, component highlights, exploded view, cutaway mode, and ICE vs. EV variant toggles.
- **2D Schematic Fallback:** Full-fidelity SVG cutaway with clickable hotspots when WebGL hardware acceleration is unavailable.
- **Seven Dedicated Subsystem Masterclasses:** Rich educational pages covering introduction, components, operating cycle, governing physics formulas, diagnostic failure symptoms, maintenance notes, and safety warnings.
- **Interactive Engineering Simulations:** 7 dedicated animations with Play, Pause, Step, RPM sliders, and synchronized technical captions.
- **System Synergy Flowchart:** Interactive energy transfer flow diagrams for ICE, Hybrid, and Battery Electric Vehicles (BEV) with regenerative braking loops.
- **Trilingual Localization:** 100% native Armenian (Հայերեն), English, and Russian (Русский) technical vocabulary without raw translation keys or partial translation leaks.
- **Light & Dark Blueprint Themes:** Accessible semantic color tokens with persistent local storage and anti-flicker initialization.
- **Integrated AI Engineering Assistant:** Specialized chatbot tutor accessible via floating global widget and dedicated workspace, communicating with a backend API (`POST /api/chat`) and powered by Gemini, OpenAI, or the built-in offline educational engine.
- **Interactive Learning Center & Quizzes:** Multi-level pathways, component matching challenges, and comprehensive quizzes with instant rationales and score tracking.
- **Global Search:** Instant modal (Ctrl+K / ⌘K) indexing systems, components, glossary terms, and quizzes in Armenian, English, and Russian.

---

## 3. The Seven Core Automotive Systems

| Subsystem | Key Mechanical Focus | Interactive Simulation |
| :--- | :--- | :--- |
| **1. Engine & Powertrain** | Thermodynamic Otto cycle, V6 cylinder block, crankshaft, pistons, valves, EV traction motors | 4-Stroke Cycle (Intake, Compression, Power, Exhaust) with synchronized valves & flame |
| **2. Transmission & Drivetrain** | Gear ratios, torque multiplication, planetary differential, driveshafts, CV half-shafts | Multi-speed gear train (1st, 3rd, 5th overdrive) + Differential cornering demonstration |
| **3. Suspension & Chassis** | Springs, dampers, MacPherson struts, control arms, anti-roll sway bars | Road bump excitation, spring deflection ($F = -kx$), and damper fluid restriction ($F = -cv$) |
| **4. Braking System** | Tandem master cylinder, vacuum booster, vented rotors, calipers, ABS slip control | Hydraulic pressure transfer, caliper clamping, rotor friction heat, and ABS pulse modulation |
| **5. Steering System** | Rack and pinion, tie rods, steering knuckles, EPAS electric power assist | Steering wheel rotation, rack linear displacement, and Ackermann inner-vs-outer wheel angles |
| **6. Electrical & Electronics** | 12V AGM battery, 400V/800V EV traction pack, inverter, CAN-bus, ECU closed loop | Starting interlock sequence + Closed-loop sensor-ECU-actuator lambda feedback loop |
| **7. Body & Structure** | Unibody monocoque, rigid boron passenger safety cell, progressive crumple zones | Controlled structural accordion deformation absorbing kinetic collision energy ($F = m\frac{\Delta v}{\Delta t}$) |

---

## 4. 3D & 2D Vehicle Explorer

The Vehicle Explorer provides an intuitive, high-fidelity spatial representation of an automobile:

- **Interactive 3D Scene (`@react-three/fiber`, `@react-three/drei`, `Three.js`):**
  - **Orbit Navigation:** Left-click drag to rotate, scroll to zoom, right-click drag to pan.
  - **Camera Reset:** Instant orientation reset button.
  - **Component Selection:** Hover over any mechanical assembly (engine block, gearbox, struts, rotors, steering rack) to trigger emissive blueprint highlighting; click to open technical specifications in the inspector.
  - **Exploded View Mode:** Smoothly interpolates assemblies outward along their kinematic axes to reveal inner mechanical relationships.
  - **Cutaway Mode:** Toggles outer body panels between aerodynamic metal and blueprint glass/wireframe opacity.
  - **Powertrain Switcher:** Toggle between an Internal Combustion Engine (ICE V6, transmission, longitudinal driveshaft, rear differential) and an Electric Vehicle (EV front/rear motors, inverter, skateboard battery pack).
- **2D Schematic Fallback:**
  - High-precision SVG cutaway with labeled interactive hotspot markers for low-power mobile devices or environments without WebGL acceleration.

---

## 5. Engineering Animation System

Every animation is built with strict adherence to physical mechanisms:
- **Play / Pause / Reset Controls:** Allows freezing motion at any point in a cycle.
- **Step Forward / Step Backward:** Move incrementally between strokes or operating stages.
- **Operating Speed (RPM) Slider:** Slow down or accelerate mechanical motion.
- **Synchronized Captions:** Real-time engineering explanations synchronized with the current mechanical position.

---

## 6. Multilingual Architecture

The platform provides complete trilingual localization:
- **English** (Standard SAE/ISO automotive engineering vocabulary)
- **Armenian (Հայերեն)** (Authentic technical terms: ծնկաձև լիսեռ, բաշխիչ լիսեռ, մխոց, փոխանցման տուփ, դիֆերենցիալ, կախոց, արգելակային սկավառակ, ղեկային ռեյկա, անվտանգության պարկուճ, ներծծման/սեղմման/աշխատանքային/արտանետման տակտեր)
- **Russian (Русский)** (GOST automotive terminology: коленчатый вал, распредвал, поршень, КПП, межколесный дифференциал, геометрия Аккермана, зоны программируемой деформации)

Language switching is instantaneous without page reloads, and preferences persist in `localStorage`.

---

## 7. Integrated AI Automotive Assistant

The integrated AI assistant acts as an automotive engineering tutor:
- **Backend API Endpoint:** `POST /api/chat`
- **Security:** API keys remain strictly on the backend server.
- **Context Awareness:** Automatically receives the currently inspected component or system (e.g. `Suspension and Running Gear - MacPherson Strut`).
- **Safety First:** Built-in safeguards regarding high-voltage EV battery handling and life-critical brake/steering repairs.
- **Dual Mode Operation:**
  1. **Live LLM Integration:** Supports Google Gemini (`gemini-1.5-flash`, `gemini-1.5-pro`) and OpenAI (`gpt-4o-mini`, `gpt-4o`).
  2. **Offline Local Engineering Engine:** If an API key is not configured, the assistant automatically utilizes its embedded engineering knowledge base to provide technical explanations in Armenian, English, and Russian without crashing or returning empty responses.

---

## 8. Technology Stack

- **Frontend:**
  - React 18 & TypeScript (Strict mode)
  - Vite 5 (Bundler & dev server)
  - Tailwind CSS (Utility styling with custom blueprint color tokens)
  - Three.js, React Three Fiber, React Three Drei (3D visualization)
  - Lucide React (Engineering iconography)
  - React Router 6 (Client-side routing)
  - Canvas Confetti (Celebratory quiz mastery effects)
- **Backend:**
  - Node.js (v18+) & Express
  - TypeScript (Transpiled with `tsc` to `dist/`)
  - Zod (Runtime payload and environment validation)
  - CORS, Dotenv
- **Testing & Tooling:**
  - Vitest & JSDOM (Unit & component testing)
  - Concurrently (Coordinated workspace scripts)

---

## 9. Project Structure

```text
automotive-engineering-explorer/
├── client/
│   ├── index.html                     # HTML5 shell with Google font preloads & theme script
│   ├── package.json                   # Client dependencies (Three.js, R3F, React, Lucide)
│   ├── postcss.config.js              # PostCSS configuration
│   ├── tailwind.config.js             # Automotive blueprint color palette & keyframes
│   ├── tsconfig.json                  # Client TypeScript configuration
│   ├── vite.config.ts                 # Vite bundler & API proxy configuration
│   ├── tests/
│   │   └── client.test.ts             # Vitest tests for i18n, systems data, quiz, glossary
│   └── src/
│       ├── App.tsx                    # Root application component with routing & modals
│       ├── main.tsx                   # React DOM root entry
│       ├── index.css                  # Tailwind directives & blueprint scrollbars
│       ├── types/
│       │   ├── automotive.ts          # Subsystem, component, quiz, and workflow types
│       │   └── i18n.ts                # Language codes and options
│       ├── i18n/
│       │   ├── en.ts                  # English translation dictionary
│       │   ├── hy.ts                  # Armenian translation dictionary
│       │   ├── ru.ts                  # Russian translation dictionary
│       │   └── index.ts               # Translation helper utilities
│       ├── context/
│       │   ├── ThemeContext.tsx       # Dark/light theme provider & local storage
│       │   └── LanguageContext.tsx    # Trilingual localization provider
│       ├── data/
│       │   ├── systemsData.ts         # Deep technical data for all 7 subsystems
│       │   ├── glossaryData.ts        # 30+ categorized technical glossary terms
│       │   ├── quizData.ts            # Component matching & multi-level quizzes
│       │   └── workflowData.ts        # ICE, Hybrid, and EV energy flow graphs
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Header.tsx         # Responsive header, language switcher, theme toggle
│       │   │   ├── Footer.tsx         # Educational mission, links, safety disclaimer
│       │   │   ├── AnimatedBackground.tsx # Rotating gear & blueprint grid canvas
│       │   │   ├── Breadcrumbs.tsx    # Contextual path navigation
│       │   │   └── GlobalSearchModal.tsx # Search across systems, parts, glossary, quizzes
│       │   ├── vehicle/
│       │   │   ├── VehicleExplorer.tsx    # Master vehicle lab container
│       │   │   ├── Vehicle3DScene.tsx     # Three.js canvas with orbit controls & lights
│       │   │   ├── ProceduralCarModel.tsx # Procedural 3D car with exploded & cutaway views
│       │   │   ├── Vehicle2DCutaway.tsx   # Vector SVG cutaway with interactive hotspots
│       │   │   └── ComponentDetailPanel.tsx # Inspector card for selected part
│       │   ├── animations/
│       │   │   ├── AnimationController.tsx # Standardized playback controls & speed slider
│       │   │   ├── EngineCycleAnimation.tsx # 4-stroke cycle with moving piston & valves
│       │   │   ├── TransmissionGearAnimation.tsx # Gear ratios & differential simulation
│       │   │   ├── SuspensionAnimation.tsx  # Spring deflection & damper action
│       │   │   ├── BrakingAnimation.tsx     # Master cylinder pressure & ABS pulse
│       │   │   ├── SteeringAnimation.tsx    # Rack and pinion & Ackermann geometry
│       │   │   ├── ElectricalAnimation.tsx  # Start sequence & closed-loop ECU loop
│       │   │   └── BodyStructureAnimation.tsx # Safety cell vs crumple zones
│       │   └── chatbot/
│       │       ├── ChatInterface.tsx        # Message history, markdown, copy, suggestions
│       │       └── FloatingAIAssistant.tsx  # Global floating action pill & drawer
│       └── pages/
│           ├── HomePage.tsx           # Hero, 3D preview, system cards, energy transfer
│           ├── ExplorePage.tsx        # Dedicated vehicle explorer laboratory
│           ├── SystemDetailPage.tsx   # Comprehensive subsystem masterclass
│           ├── HowSystemsWorkTogetherPage.tsx # Powertrain synergy flow diagram
│           ├── LearningCenterPage.tsx # Structured pathways & matching challenge
│           ├── QuizPage.tsx           # Assessment with immediate rationales & score
│           ├── AIAssistantPage.tsx    # Full-page AI engineering tutor
│           ├── GlossaryPage.tsx       # Searchable & filterable technical dictionary
│           └── AboutPage.tsx          # Project mission, principles, and tech stack
├── server/
│   ├── package.json                   # Server dependencies (Express, Zod, Cors)
│   ├── tsconfig.json                  # Server TypeScript configuration
│   ├── tests/
│   │   └── server.test.ts             # Vitest tests for schemas, systems data, AI tutor
│   └── src/
│       ├── config/
│       │   └── env.ts                 # Environment variable parsing with Zod
│       ├── middleware/
│       │   └── errorHandler.ts        # Centralized error handler
│       ├── routes/
│       │   ├── chat.ts                # POST /api/chat with rate limiting & validation
│       │   └── systems.ts             # GET /api/systems metadata endpoints
│       ├── services/
│       │   ├── aiService.ts           # Gemini/OpenAI integration + local fallback engine
│       │   └── systemDataService.ts   # Core systems metadata service
│       ├── validation/
│       │   └── chatSchema.ts          # Zod request validation
│       └── index.ts                   # Express server entry point
├── .env.example                       # Safe environment variable template
├── package.json                       # Root workspaces package.json
└── README.md                          # Comprehensive documentation
```

---

## 10. Prerequisites & Installation

### Prerequisites
- **Node.js:** v18.0.0 or later (v20+ recommended)
- **npm:** v9.0.0 or later

### Installation

Clone the repository and install dependencies from the project root:

```bash
# Clone the repository
git clone https://github.com/your-username/automotive-engineering-explorer.git
cd automotive-engineering-explorer

# Install dependencies for both client and server workspaces
npm install
```

*(Note for Windows PowerShell users: if script execution policies block `npm`, execute via `npm.cmd install`)*

---

## 11. Configuration & Environment Variables

Copy the `.env.example` file to create your local `.env`:

```bash
cp .env.example .env
```

### Environment Variables Reference

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `3001` |
| `CLIENT_URL` | Allowed origin for CORS | `http://localhost:5173` |
| `AI_PROVIDER` | AI Provider (`gemini`, `openai`, `mock`) | `gemini` |
| `AI_MODEL` | Target LLM model name | `gemini-1.5-flash` |
| `AI_API_KEY` | Your Google Gemini or OpenAI API key | `""` |

### Configuring Google Gemini
1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
2. In `.env`, set:
   ```env
   AI_PROVIDER=gemini
   AI_MODEL=gemini-1.5-flash
   AI_API_KEY=your_actual_gemini_api_key_here
   ```

### Configuring OpenAI
1. Obtain an API key from [OpenAI Platform](https://platform.openai.com/).
2. In `.env`, set:
   ```env
   AI_PROVIDER=openai
   AI_MODEL=gpt-4o-mini
   AI_API_KEY=your_actual_openai_api_key_here
   ```

*(If no API key is provided, the application will automatically run the built-in local engineering tutor engine, answering questions in Armenian, English, and Russian without throwing errors).*

---

## 12. Running the Application

### Development Mode (Concurrent Client & Server)

Run both the frontend and backend concurrently:

```bash
npm run dev:all
```

Alternatively, run them in separate terminals:

```bash
# Terminal 1: Backend Server (runs on http://localhost:3001)
npm run dev:server

# Terminal 2: Frontend Client (runs on http://localhost:5173)
npm run dev
```

Open your browser at `http://localhost:5173` to explore the application.

### Production Build

To build both client and server for production deployment:

```bash
npm run build
```

To run the production server:

```bash
cd server
npm run start
```

---

## 13. Testing & Quality Assurance

The project includes unit tests for both workspaces using Vitest:

```bash
# Run all tests across client and server
npm test
```

### Verified Test Suites
1. **Client Tests (`client/tests/client.test.ts`):**
   - Trilingual translation dictionary completeness (en, hy, ru).
   - Core 7 subsystems data integrity (components, cycles, physics formulas, diagnostics).
   - Hooke's Law and Pascal's Law inclusion in engineering concepts.
   - Glossary terms, system affiliations, and quiz questions with verified answer keys.
   - Powertrain workflow integrity (ICE, Hybrid, EV energy chains with regenerative loops).
2. **Server Tests (`server/tests/server.test.ts`):**
   - 7 core system API definitions and metadata.
   - Zod request validation for `/api/chat`.
   - Rejection of invalid chat requests.
   - Offline educational tutor fallback generation in English and Armenian.

---

## 14. Safety & Educational Disclaimer

> [!WARNING]
> **Educational Simulation Notice:**  
> The diagrams, animations, and explanations in this platform are designed for technical learning and conceptual visualization. They do not replace certified factory service manuals, vehicle-specific technical bulletins, or certified automotive repair training.
> 
> Safety-critical systems—such as hydraulic brakes, steering linkages, suspension strut assemblies, airbags, and high-voltage 400V/800V electric vehicle powertrains—pose inherent risks of severe injury or fatal electrocution. All physical maintenance and diagnostic procedures should only be performed by certified automotive technicians using calibrated equipment and manufacturer safety specifications.

---

*© 2026 Automotive Engineering Explorer. Engineered for education.*
