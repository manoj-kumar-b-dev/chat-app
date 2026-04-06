
import { FaGithub } from 'react-icons/fa6';
import { SiJavascript, SiTailwindcss, SiMongodb, SiExpress } from 'react-icons/si';

export const portfolioData = {
  hero: {
    name: "Manoj Kumar",
    title: "Frontend Developer",
    tagline: "I am a passionate Frontend Developer with experience in building web applications from the ground up using modern technologies. I love solving complex problems, writing clean, reusable code, and creating intuitive user experiences. When I'm not coding, I'm exploring new technologies or contributing to open source.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  about: {
    description: "I am a passionate Frontend Developer with experience in building web applications from the ground up using modern technologies. I love solving complex problems, writing clean, reusable code, and creating intuitive user experiences. When I'm not coding, I'm exploring new technologies or contributing to open source."
  },
  skills: {
    frontend: [
      { name: "React", icon: FaReact, color: "text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" }
    ],
    backend: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
      { name: "Express", icon: SiExpress, color: "text-gray-500" }
    ],
    database: [
      { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
      { name: "SQL", icon: FaDatabase, color: "text-blue-400" }
    ],
    tools: [
      { name: "Git", icon: FaGitAlt, color: "text-orange-500" },
      { name: "GitHUb", icon: FaGithub, color: "text-black dark:text-white" }
    ]
  },
  projects: [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with authentication, cart functionality, and Stripe payment integration.",
      techStack: ["React", "Node.js", "MongoDB", "Redux"],
      demoLink: "#",
      githubLink: "#",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management tool with real-time updates using WebSockets.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Socket.io"],
      demoLink: "#",
      githubLink: "#",
      image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Social Media Dashboard",
      description: "An analytics dashboard providing insights on social media engagement, with complex data visualization.",
      techStack: ["React", "Chart.js", "Express", "PostgreSQL"],
      demoLink: "#",
      githubLink: "#",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ],
  experience: [
    {
      role: "Software Engineer Intern",
      company: "Tech Innovators Inc.",
      duration: "June 2023 - Aug 2023",
      description: "Developed and maintained features for a high-traffic SaaS application, improving load time by 20%."
    },
    {
      role: "Freelance Web Developer",
      company: "Self-Employed",
      duration: "Jan 2022 - Present",
      description: "Designed and built custom web applications for various local businesses."
    }
  ],
  contact: {
    email: "[EMAIL_ADDRESS]",
    github: "",
    linkedin: "https://linkedin.com"
  }
};
