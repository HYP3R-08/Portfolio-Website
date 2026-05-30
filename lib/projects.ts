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
    subtitle: 'Web · E-Commerce · Next.js · Stripe',
    description:
      'Full-stack e-commerce platform for tech products, built with Next.js and TypeScript. Features a dynamic product catalogue with search and filtering, Stripe-powered checkout with automated receipt generation, and a responsive admin dashboard for inventory, order, and transaction management.',
    overview:
      'TechStore is a modern e-commerce platform designed from the ground up for selling technology products. The frontend is built with Next.js and TypeScript, leveraging dynamic routing for product pages and a component-based architecture that keeps the UI modular and maintainable. The product catalogue supports real-time search and multi-criteria filtering, while responsive product cards and an optimised checkout flow prioritise conversion and usability across devices. The admin dashboard provides a centralised interface for product CRUD operations, inventory tracking, and live order and transaction monitoring — all accessible from a single responsive UI.',
    challenge:
      'Integrating Stripe Checkout reliably across the full purchase funnel — from cart to confirmation — required careful handling of webhook events to keep order state consistent between the frontend, backend, and payment processor. Automated receipt and payment document generation had to be robust against partial failures mid-transaction. On the frontend, building a performant catalogue with real-time filtering at scale meant designing a state management layer that avoided unnecessary re-renders while keeping the UI reactive. The admin dashboard needed to surface live transaction data without polling overhead, driving the architecture toward event-driven updates.',
    outcome:
      'A fully functional e-commerce platform with end-to-end Stripe payment integration, automated receipt generation, and a complete admin dashboard for store management. The system handles the full commercial lifecycle — browsing, checkout, payment, confirmation, and back-office oversight — in a scalable, maintainable codebase.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'REST API', 'State management'],
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
      'Cinematic cocktail showcase landing page built as a deep-dive into professional-grade web animation. Scroll-driven GSAP timelines, SplitText character reveals, pinned sections, multi-layer parallax, and a custom animated carousel deliver an immersive product storytelling experience.',
    overview:
      'Velvet Pour is an interactive product showcase built around the craft cocktail aesthetic — dark, editorial, and deliberately paced. The entire experience is choreographed through GSAP: each section owns a dedicated timeline that activates as the user scrolls into it, keeping the narrative rhythm tight and the transitions fluid. SplitText breaks headlines into individual characters for staggered reveal animations that feel handcrafted rather than mechanical. The layout alternates between full-viewport pinned sections that hold the user in place while the visual evolves, and free-scroll passages where parallax layers at different speeds build depth. A fully custom carousel handles the product reel — no library wrappers — with GSAP-driven slide transitions, drag gesture support, and synchronized caption animation.',
    challenge:
      "Coordinating multiple simultaneous GSAP timelines without visual collisions or scroll jank required careful scrubbing: every ScrollTrigger pin needed explicit start/end markers tuned against the natural document flow. SplitText in GSAP v3 does not play well with React's reconciliation cycle — injecting split character spans after hydration caused layout shifts that broke downstream trigger calculations. The fix was a deferred split inside a useLayoutEffect with a ResizeObserver cleanup that re-splits on viewport change. Getting scroll-synchronized video playback smooth across devices meant abandoning time-based playback entirely in favour of driving currentTime directly from ScrollTrigger progress, then clamping and rounding to the nearest keyframe to avoid seek stuttering on mobile.",
    outcome:
      'A fully realized motion-design case study demonstrating production-level GSAP proficiency: scroll-driven timelines, SplitText reveals, pinned scroll sections, multi-layer parallax, scroll-synchronized video, and a bespoke carousel — all running at a consistent 60 fps across desktop and mobile. The project established a reusable animation architecture and deepened expertise in the GSAP ecosystem that now informs every animation-heavy frontend task.',
    tags: ['React', 'Vite', 'GSAP', 'ScrollTrigger', 'SplitText', 'Tailwind CSS', 'Motion Design', 'JavaScript ES6+'],
    year: '2025',
    status: 'Case Study',
    category: 'Web',
    layout: 'gallery',
    images: ['/VelvetPour2.png', '/VelvetPour3.png', '/VelvetPour4.png', '/VelvetPour1.png'],
    coverImage: '/VelvetPour1.png',
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
    images: ['/Smart_Packaging1.jpg', '/Smart_Packaging2.jpg', '/Smart_Packaging1.jpg'],
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
      '1st-place national winner at RoboCupJunior Rescue Simulation 2026. Fully autonomous robot built in Python on the Webots/Erebus simulator — navigates unknown environments, detects victims via YOLO, maps terrain with occupancy grids, and reports findings to the competition system in real time. Qualified for World Championship 2026.',
    overview:
      'Built for RoboCupJunior Rescue Simulation 2026, this autonomous robot operates across four integrated software modules: perception, navigation, mapping, and communication. The sensor suite — LiDAR, GPS, IMU, colour sensor, and a dual lateral camera configuration — feeds a pipeline that runs continuously as the robot explores. Navigation uses DFS to guarantee full coverage of unknown areas and BFS to compute optimal return paths between nodes; heading is held by a proportional controller driven by IMU and GPS fusion. Victim detection runs a YOLO model in real time on the camera streams, while hazardous materials are identified through deterministic chromatic analysis. All findings — coordinates, victim classifications, and occupancy maps — are automatically transmitted to the competition system via the referee API.',
    challenge:
      'Exploration efficiency and victim recall had to be maximised within a strict time budget, with no prior knowledge of the environment. Fusing GPS and IMU data reliably under simulation noise required tuning the proportional heading controller to remain stable without overshoot on sharp turns. Integrating YOLO inference into a tight control loop without introducing latency spikes that disrupted navigation demanded careful frame-rate throttling and asynchronous inference queuing. Building a consistent occupancy grid from LiDAR sweeps while the robot was moving — without a fixed origin — required continuous re-registration of scan data against the growing map, which amplified any heading error. Synchronising the four modules so that mapping, perception, and path planning never blocked each other was the central systems integration challenge.',
    outcome:
      '1st place at the national RoboCupJunior Rescue Simulation competition, earning qualification to the RoboCup World Championship in Incheon, South Korea, scheduled for July 2026. The project deepened expertise in autonomous robotics, AI-driven perception, real-time computer vision, and the system-level integration required to make all four modules operate reliably under competition conditions.',
    tags: ['Python', 'OpenCV', 'NumPy', 'YOLO', 'Webots', 'LiDAR', 'Computer Vision', 'DFS', 'BFS', 'Occupancy Grid'],
    year: '2026',
    status: 'Live',
    category: 'Robotics',
    layout: 'split',
    images: [],
    gradient: 'from-violet-950/40 via-purple-950/20 to-transparent',
    accentColor: 'rgba(139,92,246,0.15)',
  },
]
