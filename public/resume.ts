interface Experience {
    title: string;
    image?: string;
    company: string;
    dates: string;
    skills: string[];
    description: string;
}

interface Project {
    title: string;
    link: string;
    description: string[];
}

const experience: Experience[] = [
  {
    title: "Lead Software Engineer",
    image: "/assets/gaudiyakirtan.png",
    company: "Gaudiya Kirtan",
    dates: "January 2024 – Present",
    skills: ["React Native", "Next.js", "Tailwind CSS", "Natural Language Processing", "User Experience Design"],
    description: "Lead engineer for music library and streaming platform with 1K+ songs and 10K+ users.",
  },
  {
    title: "Research Engineer",
    company: "Pennsylvania State University",
    image: "/assets/psu.png",
    dates: "August 2023 – December 2023",
    skills: ["C Programming", "Operating Systems", "Distributed Systems", "React.js", "SystemVerilog", "Natural Language Processing", "Machine Learning"],
    description: "Research engineer for projects on system design (os + distributed) and machine learning, worked on memory allocators, scheduling policies, architecture pipelining, and edge computing."
  },
  {
    title: "AI Software Engineering Intern",
    company: "Kimberly-Clark - Global Innovation Team",
    image: "/assets/kimberlyclark.png",
    dates: "May 2023 – August 2023",
    skills: ["Next.js", "Tailwind CSS", "OpenAI GPT-3", "Azure", "Okta", "Natural Language Processing", "Machine Learning", "Security"],
    description: "AI software engineering intern for the Global Innovation Team, worked on model alignment, computer vision pipelines, full-stack applications, and a blockchain network."
  },
  {
    title: "Machine Learning Engineering Intern",
    company: "York Exponential",
    image: "/assets/yorkexponential.jpeg",
    dates: "August 2021 – January 2022",
    skills: ["Object Detection", "TensorFlow", "Data Augmentation", "AWS", "Cloud Computing"],
    description: "Machine learning engineering intern for the AI team, worked on object detection for defects in garments, data augmentation, and cloud computing."
  },
  {
    title: "Software Engineering Intern",
    company: "Palace",
    image: "/assets/palace.svg",
    dates: "June 2021 – August 2021",
    skills: ["Agile Methodologies", "Node.js", "Express.js", "Redux", "MongoDB", "API Design"],
    description: "Software engineering intern for the full stack team, worked on API design and user experience for property management tool."
  },
  {
    title: "Undergraduate Researcher",
    company: "Lehigh University",
    image: "/assets/lehigh.svg",
    dates: "July 2020 – May 2021",
    skills: ["Deep Learning", "PyTorch", "PyTorch Lightning", "Weights & Biases", "Data Preprocessing", "ResNet", "DenseNet"],
    description: "Undergraduate researcher for working on brain network analysis with EEG and MRI data to synthesize connectome data to train deep learning models for emotion recognition."
  }
];

const projects: Project[] = [
    {
      "title": "Semant - an answer engine",
      "link": "https://www.semant.co/",
      "description": [
        "An LLM first-engine built to give answers with access to websites, books, videos, and much more.",
      ]
    },
    {
      "title": "Heart Sound Abnormality Detection",
      "link": "https://github.com/kendreaditya/heartface",
      "description": [
        "Developed an app to detect heart sound abnormality with a novel (CNN+transformer) model - International ISEF Finialist 2021"
      ]
    },
];

interface Education {
  title: string,
  image: string,
  description: string
}

const education: Education[] = [
  {
    "title": "Pennsylvania State University",
    "image": "/assets/psu.png",
    "description": "Computer Science, B.S."
  },
  {
    "title": "Cumberland Valley High School",
    "image": "/assets/cumberlandvalley.png",
    "description": "High School Diploma"
  }
];

interface Publication {
    title: string;
    authors: string[];
    venue: string;
    year: number;
    link?: string;
}

const publications: Publication[] = [
  {
    title: "Beluga: Boosted Explanatory Learning Using GPT Assistance",
    authors: ["A Kendre", "H Nguyen", "S Saha", "F Kabir"],
    venue: "arXiv preprint",
    year: 2023,
    link: "https://github.com/kendreaditya/pythia-mcreu/blob/main/LLM.pdf"
  },
  {
    title: "Structure-Preserving Graph Kernel for Brain Network Classification",
    authors: ["J Yu", "Z Kong", "A Kendre", "H Peng", "C Yang", "L Sun", "A Leow", "L He"],
    venue: "IEEE International Symposium on Biomedical Imaging (ISBI)",
    year: 2022,
    link: "https://ieeexplore.ieee.org/abstract/document/9761456/authors#authors"
  },
  {
    title: "Computer Audition Arrhythmia Classification in Heart Sounds",
    authors: ["A Kendre"],
    venue: "International Science and Engineering Fair (ISEF)",
    year: 2021,
    link: "https://github.com/kendreaditya/heartface/blob/main/assets"
  }
];

export { experience, projects, education, publications };
export type { Experience, Project, Education, Publication };
