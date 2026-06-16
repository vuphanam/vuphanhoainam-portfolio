/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectInfo {
  title: string;
  category: string;
  description: string;
  tags: string[];
  metric?: string;
  period?: string;
}

export interface ExperienceInfo {
  role: string;
  company: string;
  period: string;
  location?: string;
  achievements: string[];
}

export const PORTFOLIO_DATA = {
  fullName: "Vu Phan Hoai Nam",
  title: "Backend Developer & AI / Automation Engineer",
  location: "Vietnam • On-site / Office",
  email: "nam.vuphanhoai@gmail.com",
  linkedin: "https://www.linkedin.com/in/vuphanhoainam/",
  aboutMe: "Backend Developer with 1+ year of hands-on experience in developing and operating software systems (web, websites, and applications) in enterprise environments. Highly skilled at building RESTful APIs, real-time communication modules, role-based access control, and secure multi-factor authentication. Strong specialization in AI integrations, autonomous agent architectures for business workflow optimizations, and digital transformations.",
  skills: [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Java", "Python", "SQL"] },
    { category: "Backend & Systems", items: ["Node.js", "NestJS", "Java", "Python", "RESTful API", "JWT Auth", "2FA Security", "Socket.io", "RBAC"] },
    { category: "Database & AI", items: ["MongoDB", "MySQL", "Milvus (Vector DB)", "AI Chatbots", "Auto Agents", "Workflow Automation"] },
    { category: "Tools & Soft Skills", items: ["Git / GitHub", "Postman", "VS Code", "IntelliJ", "Nodemailer", "Problem-Solving Mindset", "Adaptability", "Teamwork & Communication"] }
  ],
  projects: [
    {
      title: "Enterprise Project & HR Management System",
      category: "Backend Development",
      description: "Designed and implemented a project and human resource management system for internal enterprise operations. Configured complex systems including recurring tasks, departments progress, aggregated scheduling, and Auto Agent routines to automate reports creation.",
      tags: ["Node.js", "MongoDB", "Socket.io", "JWT", "2FA", "RBAC", "Nodemailer"],
      metric: "Auto Reporting",
      period: "06/2025 – 12/2025"
    },
    {
      title: "Interactive E-commerce Platform (SDTC)",
      category: "Backend Development & AI Integration",
      description: "Developed robust RESTful endpoints for order management with full role-based access control guidelines. Integrated an interactive Milvus-fueled custom customer service chatbot to facilitate live support over a WebSocket link.",
      tags: ["NestJS", "MongoDB", "Milvus", "Socket.io", "JWT", "Nodemailer"],
      metric: "AI Assistant",
      period: "07/2025 – 08/2025"
    },
    {
      title: "Interactive Fluid & Aerodynamic Canvas Engine",
      category: "UX & Simulation Lab",
      description: "A fast, hardware-accelerated 2D vector physics simulator built using motion loops for custom gravity cascade sequences (Red Hearts & ascending balloons) tracking real-time rendering state.",
      tags: ["React 19", "Motion", "Tailwind CSS", "Vite", "TypeScript"],
      metric: "60 FPS Fluent",
      period: "Active Showcase"
    }
  ] as ProjectInfo[],
  experience: [
    {
      role: "Back End Developer",
      company: "Sea Dragon Technology",
      period: "Apr 2025 - Present (1 yr 3 mos)",
      location: "Vietnam • On-site Office",
      achievements: [
        "Architected an internal Project Management & HR System with customized RBAC permission matrices, double authentications (JWT + 2FA), and multi-tier recurring task scheduling.",
        "Researched and integrated custom Auto Agents utilizing smart summarization APIs to automatically gather and compile project tracking sheets into executive briefs.",
        "Created RESTful endpoints and service layer classes for the SDTC E-commerce portal hosting scalable order checkouts and status notifications via Nodemailer.",
        "Pioneered real-time notification components using Socket.io and implemented a semantic search assistant with NestJS, Milvus Vector Database, and conversational AI models."
      ]
    }
  ] as ExperienceInfo[]
};
