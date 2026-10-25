export const person = {
  name: "Sandeep Reddy Modugu",
  shortName: "Sandeep Modugu",
  role: "Embedded Software Engineer",
  email: "modugusandeepreddy2@gmail.com",
  location: "Augsburg, Germany",
  github: "https://github.com/7997275647",
  linkedin: "https://www.linkedin.com/in/sandeep-reddy-modugu-5278a3163/",
  description:
    "Embedded software engineer in Augsburg, Germany. I write C for STM32 and ARM Cortex-M boards, with a focus on motor control, real-time firmware and hardware-in-the-loop testing.",
};

export const navigation = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#github", label: "GitHub" },
];

export const experience = [
  {
    id: "consultant",
    company: "Technology & Strategy",
    context: "Client: Hilti",
    role: "Embedded Software Consultant",
    period: "Jun 2026 - Present",
    location: "Munich, Germany",
    current: true,
    summary: "Updating motor-control firmware for the next product generation.",
    details: [
      "Modernizing an existing software stack, tuning current and speed PI controllers, and refining soft-start and pre-drill state machines.",
      "Implementing IEC 62841 safety interlocks, voltage detection and thermal management, alongside IEC 60730 Annex H execution monitoring and start-up checks.",
      "Verifying hardware behavior with logic analyzers and multimeters, strengthening MISRA C compliance, and coordinating technical priorities with client stakeholders.",
    ],
    tags: ["Embedded C", "Motor control", "IEC 60730", "MISRA C"],
  },
  {
    id: "weber",
    company: "Software Engineering Weber",
    context: "Working student",
    role: "Embedded Software Developer",
    period: "Feb 2026 - Mar 2026",
    location: "Kempten, Germany",
    current: false,
    summary: "Connecting industrial control hardware to a touchscreen interface.",
    details: [
      "Designed a UML-documented middleware and control layer between STM32H7 HAL drivers and an LCD GUI for an industrial spraying system.",
      "Integrated sensors and actuators, and developed the display application using STM32CubeMX, TouchGFX and LVGL.",
      "Used thread-safe FreeRTOS tasks and message queues for SD card configuration and real-time logging without blocking the interface.",
    ],
    tags: ["STM32H7", "FreeRTOS", "TouchGFX", "LVGL"],
  },
  {
    id: "thesis",
    company: "Hilti",
    context: "Master's thesis",
    role: "DSP & Motor Control Research",
    period: "Jul 2025 - Jan 2026",
    location: "Kaufering, Germany",
    current: false,
    summary: "Motor-control filtering about twice as fast, measured on real hardware.",
    details: [
      "Achieved a 2x improvement in motor-control filtering using ARM Cortex-M4 CMSIS-DSP SIMD intrinsics.",
      "Integrated FMAC and CORDIC hardware accelerators with DMA-driven transfers on STM32H7/G4 targets.",
      "Built a reproducible Hardware-in-the-Loop framework to compare execution time, memory footprint and CPU utilization across acceleration approaches.",
    ],
    tags: ["CMSIS-DSP", "SIMD", "FMAC / CORDIC", "HiL"],
  },
  {
    id: "hilti-intern",
    company: "Hilti",
    context: "Internship",
    role: "Embedded Software Developer",
    period: "Jan 2025 - Jul 2025",
    location: "Kaufering, Germany",
    current: false,
    summary: "Fewer static-analysis violations and faster builds after moving to GitLab CI/CD.",
    details: [
      "Reduced MISRA C static-analysis violations by 80% with Axivion Bauhaus and cut build times by 30% while migrating Jenkins pipelines to GitLab CI/CD.",
      "Designed KiCad PCBs to improve the stability and repeatability of prototype test setups.",
      "Automated document quality checks in Python and refined development guidelines and Sphinx PDF documentation.",
    ],
    tags: ["Axivion", "GitLab CI/CD", "Python", "KiCad"],
  },
  {
    id: "seleon",
    company: "seleon",
    context: "Working student",
    role: "Embedded Software Developer",
    period: "May 2024 - Nov 2024",
    location: "Leipzig, Germany",
    current: false,
    summary: "Tooling that makes module deployment and dev environments less error-prone.",
    details: [
      "Built a Qt/QML module-generator tool to automate module deployment, reduce manual integration work and minimize human error.",
      "Standardized development environments with Docker and pre-configured toolchains to eliminate dependency mismatches.",
    ],
    tags: ["Qt / QML", "Docker", "Developer tooling"],
  },
  {
    id: "honeywell",
    company: "Honeywell Elster",
    context: "Internship",
    role: "Embedded Software Engineer",
    period: "Oct 2023 - Apr 2024",
    location: "Lotte, Germany",
    current: false,
    summary: "Connection logic for NB-IoT devices that keeps working on weak signals.",
    details: [
      "Developed UML-based NB-IoT connection-handshake state machines for reliability in low-signal RF environments.",
      "Created a MATLAB test framework to validate modem state machines and verify non-blocking execution to prevent network lockups.",
    ],
    tags: ["NB-IoT", "State machines", "MATLAB", "Verification"],
  },
];

export const categories = ["All work", "Firmware", "Connected systems", "C++ & tooling"] as const;
export type ProjectCategory = (typeof categories)[number];
export type ProjectArt = "dashboard" | "bootloader" | "patterns" | "gateway";

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, "All work">;
  kind: string;
  status: string;
  art: ProjectArt;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  boundary: string;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "CrossPlatform_IoT_Dashboard",
    title: "A dashboard for sensor data",
    subtitle: "Qt Sensor Dashboard",
    category: "Connected systems",
    kind: "Personal project",
    status: "Implemented",
    art: "dashboard",
    summary: "A real-time MQTT dashboard for viewing and exporting sensor data.",
    problem: "Sensor data arrives in different formats, and checking it usually means setting up a hardware test bench.",
    approach: "Built a C++17 / Qt QML application with topic routing, number/CSV/JSON parsing, bounded 1,024-sample buffers, live charts and a Python MQTT simulator.",
    outcome: "Temperature, humidity and gyroscope data can be explored through statistics, charts and tables, then exported as CSV. The simulator supports testing without physical sensors.",
    boundary: "Personal project; no commercial deployment or business metrics claimed.",
    tags: ["C++17", "Qt / QML", "MQTT", "Python"],
  },
  {
    slug: "SecureBoot-STM32",
    title: "Checking firmware before it runs",
    subtitle: "STM32 Bootloader",
    category: "Firmware",
    kind: "Personal project",
    status: "Implemented",
    art: "bootloader",
    summary: "A CRC32 check that runs before the bootloader jumps to the application.",
    problem: "A corrupted application image should not be allowed to execute just because it has been flashed successfully.",
    approach: "Extended the STM32 Open Bootloader with a CRC32 check of the application flash region before CMD_GO. A Python utility appends the checksum to the binary; the host communicates over UART.",
    outcome: "A checksum mismatch blocks the jump to the application, while a matching image can execute. The repository includes example binaries and verification logs.",
    boundary: "CRC32 detects accidental corruption. It does not authenticate firmware, establish a cryptographic chain of trust, or protect against deliberate tampering.",
    tags: ["Embedded C", "STM32G4", "CRC32", "UART"],
  },
  {
    slug: "Cpp_DesignPatterns_and_Basics",
    title: "Design patterns in C++",
    subtitle: "Modern C++ Design Patterns",
    category: "C++ & tooling",
    kind: "Learning project",
    status: "Implemented",
    art: "patterns",
    summary: "Five classic design patterns implemented in C++17, with a build and documentation setup.",
    problem: "Knowing a design pattern by name is different from implementing it in a buildable, documented codebase.",
    approach: "Implemented State, Observer, Command, Chain of Responsibility and Template Method in C++17 libraries, using CMake and Doxygen / Sphinx documentation.",
    outcome: "Five classic patterns in a cross-platform learning project, with GitHub Actions build, cppcheck and CodeQL workflows described in the CV.",
    boundary: "A personal learning resource, not a production framework or evidence of professional C++17 tenure.",
    tags: ["C++17", "CMake", "GitHub Actions", "Doxygen"],
  },
  {
    slug: "Industrial-IoT-Gateway",
    title: "Connecting an STM32 board to a dashboard",
    subtitle: "Industrial IoT Gateway",
    category: "Connected systems",
    kind: "Personal project",
    status: "In development",
    art: "gateway",
    summary: "Linking an STM32F7 board to a Qt dashboard over MQTT.",
    problem: "Connecting physical devices to useful telemetry requires a clear contract between firmware, the network and the interface.",
    approach: "Brought up an STM32F767ZI with HAL, FreeRTOS threads and Ethernet peripheral configuration. Built a separate Qt MQTT subscriber that displays temperature messages from a development broker.",
    outcome: "The board bring-up and broker-to-dashboard path are implemented. The next milestone is publishing telemetry from the STM32 to the broker.",
    boundary: "Prototype: the MCU's IP stack, MQTT publishing, sensor acquisition, TLS and watchdog recovery are not yet implemented. No production or end-to-end deployment claimed.",
    tags: ["STM32F7", "FreeRTOS", "Qt", "MQTT"],
  },
];

export const skillGroups = [
  {
    id: "firmware",
    title: "Firmware & real-time",
    context: "Professional experience",
    description: "Low-level software for microcontrollers: talking to peripherals and running several tasks at once without missing deadlines.",
    skills: ["Embedded C", "STM32 / ARM Cortex-M", "FreeRTOS", "STM32 HAL", "GPIO / SPI / UART", "Sensor & actuator integration"],
    evidence: "Applied at Hilti and Software Engineering Weber.",
  },
  {
    id: "control",
    title: "Control & signal processing",
    context: "Professional experience & thesis",
    description: "Motor control and signal processing, where I measure performance on real hardware before and after each change.",
    skills: ["Motor control", "PI controllers", "CMSIS-DSP / SIMD", "DMA", "FMAC / CORDIC", "MATLAB / Simulink"],
    evidence: "About 2x faster filtering in the Hilti master's thesis.",
  },
  {
    id: "quality",
    title: "Verification & reliability",
    context: "Professional experience",
    description: "Checking firmware with hardware-in-the-loop tests, static analysis and the safety standards that apply to the product.",
    skills: ["Hardware-in-the-Loop", "MISRA C", "IEC 60730 Annex H", "IEC 62841", "Axivion Bauhaus", "Logic analyzers"],
    evidence: "80% fewer MISRA C violations during the Hilti internship.",
  },
  {
    id: "tooling",
    title: "Interfaces & engineering tools",
    context: "Work & personal projects",
    description: "Desktop interfaces and build and CI setups that make the firmware easier to work on. Linux is still something I'm learning.",
    skills: ["C++17 / Qt / QML", "Python", "CMake", "GitLab CI/CD", "Docker", "GitHub Actions", "Yocto / Linux (learning)"],
    evidence: "Professional Qt/QML tooling at seleon; C++17 and Linux depth developed through projects.",
  },
];
