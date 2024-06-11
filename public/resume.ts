interface Experience {
    title: string;
    company: string;
    dates: string;
    skills: string[];
    description: string[];
}

interface ProjectLink {
    name: string;
    url: string;
}

interface Project {
    title: string;
    links: ProjectLink[];
    description: string[];
}

const experience: Experience[] = [
  {
    title: "Lead Software Engineer",
    company: "Gaudiya Kirtan",
    dates: "January 2024 – Present",
    skills: ["React Native", "Next.js", "Tailwind CSS", "Natural Language Processing", "User Experience Design"],
    description: [
      "Responsive Development: Designed and developed a music library of 1K+ multilingual songs with React Native, Next.js and Tailwind CSS complete with music streaming and collections for ~10,000 users.",
      "Multilingual Search: Utilized natural language processing techniques such as romanization and transliteration with Dravidian languages to enable cross-lingual search improving user experience.",
      "Navigation: Constructed an intuitive user interface with a persistent sidebar for navigation and a dynamic top bar displaying context-sensitive metadata, ensuring seamless and responsive user experiences across web and mobile platforms."
    ]
  },
  {
    title: "Research Engineer",
    company: "Pennsylvania State University",
    dates: "August 2023 – December 2023",
    skills: ["C Programming", "Operating Systems", "Distributed Systems", "React.js", "SystemVerilog", "Natural Language Processing", "Machine Learning"],
    description: [
      "Memory Allocator: Created a lightweight memory allocator in C with optimized memory throughput and utilization for accelerated workloads like machine learning models resulting in 25% increased performance.",
      "Processor Scheduling: Implemented 8 scheduling policies with preemptive and size-based techniques used in operating and distributed systems for managing processes and tasks, reducing latency by up to 50%.",
      "Cross-thread Synchronization: Built a channel-based communication system for facilitating message passing between multiple threads or processes to efficiency scale jobs while ensuring thread safety.",
      "Rext.js Framework: Engineered a virtual DOM and server-side rendering framework to understand stateful and stateless JSX-based functional components for client and server applications.",
      "Architecture Pipelining: Assembled forwarding mechanisms such as Full Forwarding and ALU-to-ALU Forwarding in SystemVerilog to minimize stalls and maximize data availability for pipeline performance.",
      "Named Entity Recognition: Devised a token classification model for online commerce websites, achieving a 14% increase in model performance with state-of-the-art models such as RoBERTa and BERT.",
      "Edge ML Computing: Evaluated performance on Apple's Neural Engine for LLM models such as T5 and GPT-2 models with Core ML models, facilitating deployment and assessment model efficiency."
    ]
  },
  {
    title: "AI Software Engineering Intern",
    company: "Kimberly-Clark - Global Innovation Team",
    dates: "May 2023 – August 2023",
    skills: ["Next.js", "Tailwind CSS", "OpenAI GPT-3", "Azure", "Okta", "Natural Language Processing", "Machine Learning", "Security"],
    description: [
      "Chat UI: Integrated a Next.js chat UI with Tailwind CSS with gpt-3.5-turbo built to serve a user-base of 45,000 complete with Okta OAuth 2.0 authorization and chat history built with Azure Tables.",
      "Model Alignment: Led the development of clustering and zero-shot prompt classification algorithms employing BART to categorize user behavior data effectively, leading to better user experiences.",
      "Model Security: Bolstered security by preventing malicious prompt injections and data breaches with BART prompt analysis, resulting in a 10% enhancement in overall system security."
    ]
  },
  {
    title: "AI Software Engineering Intern",
    company: "Kimberly-Clark - Global Innovation Team",
    dates: "May 2022 – December 2022",
    skills: ["Computer Vision", "PyTorch", "TensorFlow", "React.js", "Azure", "Blockchain", "Solidity", "Web3.js"],
    description: [
      "Computer Vision Pipeline: Conceptualized a cloud-based pipeline to train 10 computer vision models (image classification and segmentation) for Huggies baby diapers using PyTorch Lightning and TensorFlow on Databricks and Azure ML Studio, enhancing product quality and customer satisfaction.",
      "Full Stack Application: Spearheaded the development of a full-stack application, using React and Azure Functions, to seamlessly serve machine learning models to approximately 2000 users.",
      "Blockchain Network: Coded a Web3-based website using web3.js and Metamask, enabling seamless interaction with a Solidity smart contract on the Polygon/Ethereum blockchain networks for internal award recognition of over 1,500 employees."
    ]
  },
  {
    title: "Machine Learning Engineering Intern",
    company: "York Exponential",
    dates: "August 2021 – January 2022",
    skills: ["Object Detection", "TensorFlow", "Data Augmentation", "AWS", "Cloud Computing"],
    description: [
      "Model Development: Delivered object detection solutions using CNN models in TensorFlow trained on a custom managed dataset of approximately 10,000 samples, enabling accurate object localization.",
      "Data Augmentation: Significantly improved model accuracy by 20% through the application of advanced data augmentation techniques by implementing transformations to diversify training data, enhancing the model's robustness and generalization capabilities.",
      "Cloud Pipeline: Deployed efficient data preprocessing pipelines on AWS, leveraging EC2, S3, Lambda, and SageMaker, achieved a 40% reduction in data processing time, optimizing model training and deployment workflows for large-scale projects."
    ]
  },
  {
    title: "Software Engineering Intern",
    company: "Palace",
    dates: "June 2021 – August 2021",
    skills: ["Agile Methodologies", "Node.js", "Express.js", "Redux", "MongoDB", "API Design"],
    description: [
      "Team Facilitator: Served as the Scrum Master for a team of 8 backend interns, orchestrating Agile ceremonies, including daily stand-ups, sprint planning, reviews, and advising on project goals.",
      "API Endpoint Design: Defined over 25 API endpoints using Node.js and Express, with Redux for efficient client-side state management, and harnessed Mongoose for seamless interaction with MongoDB; enhancing user experience and enabling smooth property booking and management."
    ]
  },
  {
    title: "Undergraduate Researcher",
    company: "Lehigh University",
    dates: "July 2020 – May 2021",
    skills: ["Deep Learning", "PyTorch", "PyTorch Lightning", "Weights & Biases", "Data Preprocessing", "ResNet", "DenseNet"],
    description: [
      "Model Creation: Led the development of cutting-edge EEG connectome analysis models utilizing ResNet and DenseNet architectures, achieving a remarkable average accuracy increase of 20% compared to prior methods, demonstrating expertise in advancing neuroimaging research.",
      "End-to-End Pipeline: Established a comprehensive pipeline encompassing data preprocessing, model training, logging, and testing for EEG connectome analysis. Successfully managed and processed datasets exceeding 3GB in size, showcasing proficiency in handling large-scale data analysis tasks. Leveraged PyTorch and PyTorch Lightning for efficient deep learning workflows and integrated Weights & Biases for streamlined experiment tracking and management."
    ]
  }
];

const projects: Project[] = [
      {
        "title": "Sematic - an answer engine",
        "links": [
          {
            "name": "GitHub",
            "url": "https://github.com/kendreaditya/semantic"
          }
        ],
        "description": [
          "An LLM first-engine for learning and research with access to websites, books, videos, and much more ",
        ]
    },
    {
      "title": "Gaudiya Kirtan Music App",
      "links": [
        {
          "name": "GitHub",
          "url": "https://play.google.com/store/apps/details?id=com.gaudiyakirtan.gkapp"
        }
      ],
      "description": [
        "a monorepo for both an app and website with Solito for a music repository with NLP for on the fly language transliteration"
      ]
    },
    {
      "title": "Heart Sound Abnormality Detection",
      "links": [
        {
          "name": "GitHub",
          "url": "https://github.com/kendreaditya/heartface"
        },
        {
          "name": "Paper",
          "url": "https://github.com/kendreaditya/heartface/blob/main/assets/Arrhythmia_Classification_in_Heart_Sounds.pdf"
        },
        {
          "name": "Conference",
          "url": "https://projectboard.world/isef/project/enbm035---arrhythmia-classification-in-heart-sounds"
        }
      ],
      "description": [
        "Developed an app to detect heart sound abnormality with a novel (CNN+transformer) model - International ISEF Finialist 2021"
      ]
    },
];

export { experience, projects };
export type { Experience, Project, ProjectLink };
