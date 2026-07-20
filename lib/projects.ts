export type ProjectStatus = 'Live' | 'In Progress' | 'Case Study'
export type ProjectCategory = 'Web' | 'Embedded' | 'Security' | 'Robotics'
export type ProjectLayout = 'cinematic' | 'split' | 'gallery'

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  description: string
  overview: string
  challenge: string
  outcome: string
  tags: string[]
  year: string
  status: ProjectStatus
  category: ProjectCategory
  layout: ProjectLayout
  images: string[]
  coverImage?: string
  gradient: string
  accentColor: string
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    id: 'techstore',
    index: '01',
    title: 'TechStore',
    subtitle: 'Web · E-Commerce · React · Stripe',
    description:
      'Full-stack e-commerce platform for tech products, built with React, Vite, and TypeScript. Features a dynamic product catalogue with search and filtering, Stripe-powered checkout with automated receipt generation, and a responsive admin dashboard for inventory, order, and transaction management.',
    overview:
      'TechStore is a modern e-commerce platform designed from the ground up for selling technology products. The frontend is built with React, Vite, and TypeScript, leveraging client-side routing for product pages and a component-based architecture that keeps the UI modular and maintainable. The product catalogue supports real-time search and multi-criteria filtering, while responsive product cards and an optimised checkout flow prioritise conversion and usability across devices. The admin dashboard provides a centralised interface for product CRUD operations, inventory tracking, and live order and transaction monitoring — all accessible from a single responsive UI.',
    challenge:
      'Integrating Stripe Checkout reliably across the full purchase funnel — from cart to confirmation — required careful handling of webhook events to keep order state consistent between the frontend, backend, and payment processor. Automated receipt and payment document generation had to be robust against partial failures mid-transaction. On the frontend, building a performant catalogue with real-time filtering at scale meant designing a state management layer that avoided unnecessary re-renders while keeping the UI reactive. The admin dashboard needed to surface live transaction data without polling overhead, driving the architecture toward event-driven updates.',
    outcome:
      'A fully functional e-commerce platform with end-to-end Stripe payment integration, automated receipt generation, and a complete admin dashboard for store management. The system handles the full commercial lifecycle — browsing, checkout, payment, confirmation, and back-office oversight — in a scalable, maintainable codebase.',
    tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'REST API', 'State management'],
    year: '2025',
    status: 'Live',
    category: 'Web',
    layout: 'gallery',
    images: ['/TechStore_1.png', '/TechStore3.png', '/TechStore_4.png', '/TechStore_5.png'],
    coverImage: '/TechStore_Cover.png',
    gradient: 'from-sky-950/40 via-blue-950/20 to-transparent',
    accentColor: 'rgba(14,165,233,0.15)',
    links: [{ label: 'Live site', href: 'https://techstore-murex-beta.vercel.app/' }, { label: 'GitHub', href: 'https://github.com/HYP3R-08/TechStore' }],
  },
  {
    id: 'velvet-pour',
    index: '02',
    title: 'Velvet Pour',
    subtitle: 'Web · GSAP · Motion Design',
    description:
      'Cinematic cocktail showcase landing page driven entirely by scroll-based motion. GSAP timelines, SplitText character reveals, pinned ScrollTrigger sections, multi-layer parallax, and scroll-synchronized video combine into an immersive, editorial product narrative.',
    overview:
      "Velvet Pour is an interactive cocktail showcase with a dark, editorial aesthetic and a deliberately paced scroll experience. The interface is built with React 19, Vite, and Tailwind CSS, with all motion handled through GSAP via the @gsap/react integration. Each section runs its own timeline that activates on scroll through ScrollTrigger, with pinned full-viewport sections that hold the viewer in place while the visuals transition, and free-scroll passages where parallax layers move at different speeds to build depth. SplitText breaks headlines into individual characters for staggered text reveals, while a scroll-progress–driven video keeps the hero footage in sync with the viewer's position on the page. A product carousel adds GSAP-driven slide transitions and synchronized captions, and the layout stays fully responsive across desktop and mobile.",
    challenge:
      'The core of the build is orchestrating many independent GSAP timelines along a single scroll axis so that pins, text reveals, and parallax stay in sync without competing for scroll position. Each ScrollTrigger defines explicit start and end points tuned to the document flow, and the @gsap/react useGSAP hook scopes animations to their components and handles cleanup on unmount and re-render. The scroll-synchronized video is driven from ScrollTrigger progress rather than time-based playback, so the footage tracks the scroll position precisely. SplitText reveals are initialized after layout so the character spans animate cleanly without disturbing the surrounding composition.',
    outcome:
      'A polished, motion-led landing page that sustains smooth scroll-driven animation across desktop and mobile — coordinated GSAP timelines, SplitText reveals, pinned sections, multi-layer parallax, a scroll-synchronized hero video, and an animated product carousel working together as one continuous experience. The page reads as a single choreographed sequence while keeping performance steady throughout.',
    tags: ['React', 'Vite', 'GSAP', 'ScrollTrigger', 'SplitText', 'Tailwind CSS', 'Motion Design', 'JavaScript ES6+'],
    year: '2025',
    status: 'Case Study',
    category: 'Web',
    layout: 'gallery',
    images: ['/VelvetPour2.png', '/VelvetPour3.png', '/VelvetPour4.png', '/VelvetPour1.png'],
    coverImage: '/VelvetPour1.png',
    links: [{ label: 'Live site', href: 'https://gsap-cocktails-nu-cyan.vercel.app/' }, { label: 'GitHub', href: 'https://github.com/HYP3R-08/gsap_cocktails' }],
    gradient: 'from-red-950/40 via-rose-950/20 to-transparent',
    accentColor: 'rgba(190,24,93,0.15)',
  },
  {
    id: 'authlog',
    index: '03',
    title: 'AuthLog',
    subtitle: 'Embedded · IoT · Cloud · Mobile',
    description:
      'IoT smart access control system spanning embedded hardware, cloud infrastructure, and mobile. STM32 + ESP8266 handle RFID/NFC and secure HTTPS communication with a Supabase backend; a React Native app lets users register and write NFC UUIDs directly from a smartphone. Winner of the 3rd "Salvatore Di Bartolo" Award.',
    overview:
      'AuthLog is an IoT-based smart access control system that unifies embedded hardware, cloud infrastructure, and mobile into a single secure architecture. An STM32 Nucleo-64 F401RE microcontroller handles RFID/NFC acquisition and local hardware management, while an ESP8266 module provides Wi-Fi connectivity and communicates with a Supabase backend over HTTPS. Authentication happens in real time via REST API requests over TLS 1.2, with every access event automatically logged to a PostgreSQL database. A Time-of-Flight distance sensor adds proximity detection, activating the system only when a user is physically present — improving both usability and energy efficiency. A cross-platform React Native mobile app completes the stack, supporting user registration, authentication, and direct NFC UUID writing from a smartphone, removing the need for physical RFID badges entirely.',
    challenge:
      'Bridging three radically different environments — a resource-constrained STM32 microcontroller, an ESP8266 Wi-Fi module, and a cloud PostgreSQL database — with reliable, low-latency TLS communication was the central engineering challenge. Memory budgets on the microcontroller were tight, TLS handshake overhead had to be minimized, and the system needed to fail securely when connectivity dropped. On the mobile side, implementing NFC UUID writing and synchronizing state with the backend in real time required careful coordination across the entire stack.',
    outcome:
      'Winner of the 3rd place "Salvatore Di Bartolo" Award at ITIS "E. Fermi" of Giarre, and submitted to the 2025–2026 national STMicroelectronics contest. The final system demonstrated end-to-end secure access control — from NFC tap to cloud log — with sub-second authentication latency and seamless mobile enrollment.',
    tags: ['STM32', 'ESP8266', 'React Native', 'Supabase', 'PostgreSQL', 'RFID/NFC', 'REST API', 'TLS 1.2', 'Embedded C'],
    year: '2025',
    status: 'Case Study',
    category: 'Embedded',
    layout: 'split',
    images: ['/AuthLog1.jpeg', '/AuthLog2.jpeg', '/AuthLog3.jpeg'],
    coverImage: '/AuthLog1.jpeg',
    gradient: 'from-blue-950/40 via-indigo-950/20 to-transparent',
    accentColor: 'rgba(99,102,241,0.15)',
    links: [{ label: 'GitHub', href: 'https://github.com/HYP3R-08/AuthLog' }],
  },
  {
    id: 'smart-packaging',
    index: '04',
    title: 'Smart Packaging',
    subtitle: 'Embedded · IoT · STM32',
    description:
      'IoT-enabled smart packaging system built on an STM32 Nucleo-64 microcontroller. Integrates environmental sensors over SPI/I²C, transmits telemetry wirelessly, and runs a bare-metal firmware stack optimized for low-power operation. 3rd-place winner at the national STMicroelectronics "Costruisci il Futuro con STM32ODE" contest.',
    overview:
      'Smart Packaging adds an embedded intelligence layer to physical product packaging. The system is built around an STM32 Nucleo-64 (F401RE) microcontroller running bare-metal firmware written in Embedded C. An array of sensors — temperature, humidity, and shock/tilt — is acquired over SPI and I²C buses, processed on-device, and transmitted wirelessly to a receiver node. The firmware implements a lightweight state machine that governs sensor polling intervals, threshold-based alert generation, and radio duty-cycling to minimize average current draw. All sensor data is time-stamped and encoded in a compact binary frame before transmission, making the payload suitable for low-bandwidth radio protocols.',
    challenge:
      'Fitting a fully functional embedded system — microcontroller, sensors, radio module, and power regulation — into the physical footprint of standard packaging was the central hardware constraint. Every component choice had to balance power budget, form factor, and BOM cost simultaneously. On the firmware side, the bare-metal environment meant implementing all peripheral drivers from scratch: custom SPI and I²C HAL routines, interrupt-driven UART for debug output, and a low-power sleep/wake scheduling loop using the STM32 RTC peripheral. Achieving reliable wireless transmission within the RF-unfriendly environment of a dense packaging material required antenna placement experimentation and careful RF signal budget analysis.',
    outcome:
      'The project earned 3rd place at the national STMicroelectronics "Costruisci il Futuro con STM32ODE" contest, competing against teams from across Italy. The final prototype demonstrated stable multi-sensor acquisition at configurable polling rates, reliable wireless telemetry, and sustained battery operation well within the competition\'s runtime requirement — all packaged into a compact enclosure that fit inside a standard product box.',
    tags: ['STM32F401RE', 'Embedded C', 'SPI', 'I²C', 'UART', 'IoT', 'Low-power design', 'PCB design'],
    year: '2024',
    status: 'Case Study',
    category: 'Embedded',
    layout: 'cinematic',
    images: ['/Smart_Packaging1.jpg', '/Smart_Packaging2.jpg'],
    coverImage: '/Smart_Packaging2.jpg',
    gradient: 'from-orange-950/40 via-amber-950/20 to-transparent',
    accentColor: 'rgba(251,146,60,0.15)',
  },
  {
    id: 'forest-guard',
    index: '05',
    title: 'ForestGuard',
    subtitle: 'Embedded · IoT · LoRa · Environmental',
    description:
      'Distributed IoT system for intelligent forest monitoring and early detection of fires, poaching, and illegal activity. A mesh of STM32WL55JC1 nodes with IKS401 sensor shields communicates over LoRa 868 MHz, solar-powered for continuous off-grid operation. Built for the national STMicroelectronics contest.',
    overview:
      'ForestGuard is a distributed embedded system designed to protect forested areas through continuous, autonomous sensing. Each detection node is built around an STM32WL55JC1 microcontroller paired with an IKS401 sensor shield, integrating a flame sensor, a high-sensitivity microphone, and environmental modules that monitor temperature, humidity, and air quality in real time. The nodes form a wireless mesh network using LoRa on the 868 MHz European band — a protocol chosen specifically for its multi-kilometre range and ultra-low power consumption in areas with no cellular coverage. Locally processed sensor data is aggregated at a remote monitoring station that handles storage, live visualisation, and alarm management.',
    challenge:
      'Deploying electronics reliably in outdoor, uncontrolled forest environments imposed strict constraints on every layer of the design. Power was the hardest constraint: nodes needed to operate indefinitely without maintenance, requiring careful balancing of LoRa duty cycles, sleep/wake firmware scheduling, and solar harvesting logic matched to real-world irradiance conditions. On the sensing side, false positives were a serious risk — a campfire, reflected sunlight, or insect noise could trigger spurious alerts. The firmware implements multi-sensor fusion and adaptive thresholding algorithms that require all relevant channels to agree before escalating to an alarm, keeping the false-positive rate low without introducing unacceptable detection latency. LoRa channel management in a dense node deployment also required careful frequency planning to avoid collisions at the gateway.',
    outcome:
      'Submitted to the 2024–2025 national STMicroelectronics contest. The final prototype demonstrated autonomous, continuous forest monitoring across a distributed node network, with local alarm logic, solar-sustained operation, and real-time telemetry delivered to a remote monitoring station over LoRa 868 MHz.',
    tags: ['STM32WL55JC1', 'IKS401', 'Embedded C', 'LoRa 868 MHz', 'IoT', 'Sensor Fusion', 'Solar Power', 'Low-power design'],
    year: '2025',
    status: 'Case Study',
    category: 'Embedded',
    layout: 'split',
    images: ['/ForestGuard1.png', '/ForestGuard2.jpeg'],
    coverImage: '/ForestGuard2.jpeg',
    gradient: 'from-emerald-950/40 via-teal-950/20 to-transparent',
    accentColor: 'rgba(16,185,129,0.15)',
  },
  {
    id: 'robocup-maze',
    index: '06',
    title: 'RoboCup Rescue Bot',
    subtitle: 'Robotics · Computer Vision · AI · Simulation',
    description:
      'Autonomous robot for RoboCupJunior Rescue Simulation 2026, built in Python on the Webots / Erebus platform with team Black Radiators. It explores unknown mazes online on a configuration-space occupancy grid, identifies letter victims and hazmat targets through a hybrid YOLO + deterministic colour pipeline, and submits a rule-exact map to the scoring engine. National champions, and 3rd place at the World Championship in Incheon.',
    overview:
      "Built for RoboCupJunior Rescue Simulation 2026 with team Black Radiators, this autonomous controller drives a two-wheel differential-drive robot through an unknown, maze-like field, locating wall tokens that represent victims and hazardous materials while avoiding holes and swamps. The software is written in Python and organised into four cooperating modules — perception, navigation, mapping, and communication — that exchange information through a shared world model rather than calling each other directly, which keeps them decoupled and individually testable. The sensor suite is deliberately minimal to stay within the Erebus customiser budget: a forward LiDAR, a downward colour sensor, and a GPS and IMU at the chassis centre, plus the project's most distinctive choice — two compact 64×64 side cameras that inspect both walls of a corridor at once, doubling the effective scan rate without the cost of a forward camera. Everything runs at the basic simulation timestep, with a live matplotlib view of the occupancy grid used throughout development.",
    challenge:
      'Because the field is revealed only at competition time and any pre-mapping is forbidden, the robot has to perceive, decide, and map simultaneously. Navigation runs on a 1 cm occupancy grid built online from the LiDAR point cloud and GPS, with every wall inflated by a 3 cm padding ring into a configuration space so the body can be planned as a single point that never clips an inflated corner. Exploration is right-wall following under a proportional controller; when the local area is exhausted, a padding-tolerant breadth-first search drives the robot to the nearest unexplored frontier along a Bresenham line-of-sight-smoothed path, relaxing the padding tolerance only enough to squeeze through tight but legal gaps. Perception had to separate real tokens from decoys: a YOLO network classifies the Greek-letter victims (H, S, U) while a deterministic scanline sums the five concentric hazmat rings (black −2, red −1, yellow 0, green +1, blue +2) into a type code, rejecting any invalid sum as fake, and a LiDAR depth-variance test discards raised three-dimensional fake letters. Keeping the 1 cm navigation grid consistent with the separate 3 cm rule-exact matrix encoded for the Erebus scoring engine was the central integration problem, alongside failing safely around holes and swamps via colour-sensor detection and a GPS watchdog that triggers a reverse-and-rotate unstick manoeuvre.',
    outcome:
      "On practice worlds the controller reached sub-centimetre localisation error and under 2° heading error, 95% letter-classification accuracy, 98% hazmat type accuracy with 92% fake-letter rejection, and 95% hazard-recovery success — with full scored runs identifying 7 of 8 tokens with zero misidentifications and roughly 88% map correctness. The system took 1st place at the national RoboCupJunior Rescue Simulation and earned 3rd place at the RoboCup World Championship in Incheon, South Korea (July 2026). Its main strengths — the cost-aware twin-camera design, configuration-space wall-following paired with padding-tolerant frontier search, and a hybrid perception pipeline that combines a learned letter detector with a transparent arithmetic hazmat detector — are documented in full in the team's Team Description Paper.",
    tags: ['Python', 'OpenCV', 'NumPy', 'YOLO (Ultralytics)', 'Webots / Erebus', 'LiDAR', 'Computer Vision', 'BFS Frontier Search', 'Occupancy Grid', 'Sensor Fusion'],
    year: '2026',
    status: 'Case Study',
    category: 'Robotics',
    layout: 'split',
    images: ['/Robocup1.jpg', '/Robocup2.jpg'],
    coverImage: '/Robocup1.jpg',
    gradient: 'from-violet-950/40 via-purple-950/20 to-transparent',
    accentColor: 'rgba(139,92,246,0.15)',
    links: [{ label: 'Team Description Paper', href: '/TDP_RescueSimulation_Black_radiators_final.pdf' }],
  },
]
