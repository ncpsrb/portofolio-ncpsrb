type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  status?: string
  description?: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type AboutMe = {
  name: string
  title: string
  profession: string
  image: string
  description: string
}

type ProfileLink = {
  label: string
  href: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Robot Launcher',
    description: 'Automation control panel for monitoring and launching robots',
    link: '',
    video: '/portofolio/robot-launcher/launcher.png',
    id: 'project1',
  },
  {
    name: 'PowerApps Dashboard',
    description:
      'Interactive dashboard built with PowerApps to automate workflows',
    link: '',
    video: '/portofolio/powerapps/image.png',
    id: 'project2',
  },
  {
    name: 'NodeJS Automation Dashboard',
    description:
      'Modern dashboard for monitoring and controlling automation robots',
    link: '',
    video: '/portofolio/robot-dashboard/dashboard.png',
    id: 'project3',
  },
  {
    name: 'Church Community Website',
    description: 'Modern website built to strengthen church engagement',
    link: '',
    video: '/portofolio/web/church.png',
    id: 'project4',
  },
  {
    name: 'Japanese Learning Platform',
    description: 'Interactive platform designed to help users learn Japanese',
    link: '',
    video: '/portofolio/web/kiyora.png',
    id: 'project5',
  },
  {
    name: 'Shop & Wear',
    description:
      'E-commerce platform for discovering and purchasing fashion items with ease',
    link: '',
    video: '/portofolio/web/shoes.png',
    id: 'project6',
  },
  {
    name: 'Hungry Guys Voucher Shop',
    description:
      'Digital voucher store, offering fast and easy purchases of game credits',
    link: '',
    video: '/portofolio/web/hungryguys.png',
    id: 'project7',
  },
  {
    name: 'Power Automate Projects',
    description: 'Power Automate flows for streamlining daily operations',
    link: '',
    video: '/portofolio/power-automate/image.png',
    id: 'project8',
  },
  {
    name: 'Microsoft Dev Tenant API',
    description:
      'API service for retrieving Microsoft developer tenant data with Graph API',
    link: '',
    video: '/portofolio/m365tenant/image.png',
    id: 'project9',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Evermos',
    title: 'Security Automation Engineer',
    start: '2025',
    end: 'Present',
    link: '/experience/post/evermos',
    status: 'Full-time',
    description:
      'Building security automation workflows, detection support, and internal tools that improve response speed and reduce manual security operations',
    id: 'work5',
  },
  {
    company: 'PT Bank Sumitomo Mitsui Indonesia',
    title: 'Robotic Process Automation Developer',
    start: '2023',
    end: '2025',
    link: '/experience/post/smbc-indonesia',
    status: 'Contract',
    description:
      'Designed, developed, maintained, and monitored automation robots that handled thousands of daily transactions',
    id: 'work1',
  },
  {
    company: 'PT Bank Mandiri Tbk',
    title: 'QA Automation Engineer',
    start: '2021',
    end: '2023',
    link: '/experience/post/bank-mandiri',
    status: 'Contract',
    description:
      'Maintained and developed automation test scripts for API, web application, and database testing',
    id: 'work2',
  },
  {
    company: 'Gunadarma University',
    title: 'Programmer',
    start: '2019',
    end: '2021',
    link: '/experience/post/gunadarma',
    status: 'Contract',
    description:
      'Helped students understand programming fundamentals, MySQL, and Visual Basic',
    id: 'work3',
  },
  {
    company: 'PT Nstore Digital Technology',
    title: 'Software Engineer',
    start: '2022',
    end: 'Present',
    link: '',
    status: 'Freelance',
    description: 'Developing web applications based on client requirements',
    id: 'work4',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/post/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
]
export const ABOUT_ME: AboutMe[] = [
  {
    name: 'Natanael Pasaribu',
    title: 'About Me',
    profession: 'Fullstack Developer',
    image: '/personal.jpg',
    description: `👋 Hey there! I’m Natan, a passionate Fullstack Developer from 🇮🇩 Indonesia.\n`,
  },
]

export const PROFILE_LINKS: ProfileLink[] = [
  {
    label: 'Upwork',
    href: 'https://www.upwork.com/freelancers/~01ce3121e539cb7b69?mp_source=share',
  },
  {
    label: 'Fiverr',
    href: 'https://www.fiverr.com/natanaelpasaribu',
  },
  {
    label: 'Automation',
    href: 'https://xnstore.my.id',
  },
]

export const EMAIL = 'natanaelcaesario09@gmail.com'
