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
      "title": "Founder",
      "company": "Semantic AI",
      "dates": "January 2024 – April 2024",
      "skills": ["React.js", "Flask/Django", "Tailwind CSS", "Embeddings", "Distributed Systems", "Celery", "Redis"],
      "description": [
        "Embarking on a pioneering endeavor to craft a next-generation search experience, we're harnessing the power of multi-modal semantic search, leveraging cutting-edge embedding models. Picture a search engine that seamlessly navigates through books, videos, and more, revolutionizing the way we discover knowledge."
      ]
    },
    {
      "title": "Undergraduate Researcher",
      "company": "Pennsylvania State University",
      "dates": "August 2023 – January 2024",
      "skills": ["Rext.js", "Dynamic Memory Allocation", "Memory Management"],
      "description": [
        "Web Optimization: Engineered Rext.js, a virtual DOM and server-side rendering framework, to improve web development efficiency and performance, complete with JSX-based functional components.",
        "Memory Efficiency: Developed (malloc) a dynamic memory allocation algorithm implemented with splitting and coalescing techniques to maximize available memory space for improved memory utilization.",
        "Memory Management: Achieved a 25% reduction in memory fragmentation as measured by memory overhead, by designing optimized headers and implementing segregated free lists with thresholding."
      ]
    },
    {
      "title": "AI Software Engineering Intern",
      "company": "Kimberly-Clark - Global Innovation Team",
      "dates": "May 2023 – August 2023",
      "skills": ["Next.js", "gpt-3.5-turbo", "BART", "OAuth 2.0"],
      "description": [
        "Chat UI: Integrated a Next.js chat UI with Tailwind CSS, leveraging the power of gpt-3.5-turbo to successfully serve a customer base of 45,000 users complete with Okta OAuth 2.0 authorization.",
        "Data-Driven Analysis: Implemented clustering and zero-shot prompt classification techniques, employing BART, to analyze and categorize user behavior data effectively, leading to better user experiences.",
        "Improved Security: Bolstered security by preventing malicious prompt injections and data breaches with BART prompt analysis, resulting in a 10% enhancement in overall system security."
      ]
    },
    {
      "title": "AI Software Engineering Intern",
      "company": "Kimberly-Clark - Global Innovation Team",
      "dates": "May 2022 – December 2022",
      "skills": ["PyTorch Lightning", "TensorFlow", "React", "Azure Functions", "Web3.js", "Solidity", "Metamask"],
      "description": [
        "Computer Vision Pipeline: Designed and constructed a cloud-based pipeline to train 10 computer vision models (image classification and segmentation) for Huggies baby diapers using PyTorch Lightning and TensorFlow on Databricks and Azure ML Studio, enhancing product quality and customer satisfaction.",
        "Full Stack Application: Spearheaded the development of a full-stack application, using React and Azure Functions, to seamlessly serve machine learning models to approximately 2000 users.",
        "Blockchain Network: Constructed a Web3-based website using web3.js and Metamask, enabling seamless interaction with a Solidity smart contract on the Polygon/Ethereum blockchain networks for internal award recognition of over 1,500 employees."
      ]
    },
    {
      "title": "Machine Learning Engineering Intern",
      "company": "York Exponential",
      "dates": "August 2021 – January 2022",
      "skills": ["CNN", "AWS", "EC2", "S3", "Lambda", "SageMaker"],
      "description": [
        "Model Development: Delivered object detection solutions using CNN models in TensorFlow trained on a custom managed dataset of approximately 10,000 samples, enabling accurate object localization.",
        "Data Augmentation: Significantly improved model accuracy by 20% through the application of advanced data augmentation techniques by implementing transformations to diversify training data, enhancing the model's robustness and generalization capabilities.",
        "Cloud Pipeline: Designed and deployed efficient data preprocessing pipelines on AWS, leveraging EC2, S3, Lambda, and SageMaker, achieved a 40% reduction in data processing time, optimizing model training and deployment workflows for large-scale projects."
      ]
    },
    {
      "title": "Software Engineering Intern",
      "company": "Palace",
      "dates": "June 2021 – August 2021",
      "skills": ["Node.js", "Express", "Redux", "Mongoose"],
      "description": [
        "Team Facilitator: Served as the Scrum Master for a team of 8 backend interns, orchestrating Agile ceremonies, including daily stand-ups, sprint planning, reviews, and advising on project goals.",
        "API Endpoint Design: Designed and developed over 25 API endpoints using Node.js and Express, with Redux for efficient client-side state management, and harnessed Mongoose for seamless interaction with MongoDB; enhancing user experience and enabling smooth property booking and management."
      ]
    },
    {
      "title": "Undergraduate Researcher",
      "company": "Lehigh University",
      "dates": "July 2020 – May 2021",
      "skills": ["ResNet", "DenseNet", "PyTorch", "PyTorch Lightning", "Weights & Biases"],
      "description": [
        "Model Development: Led the development of cutting-edge EEG connectome analysis models utilizing ResNet and DenseNet architectures, achieving a remarkable average accuracy increase of 20% compared to prior methods, demonstrating expertise in advancing neuroimaging research.",
        "End-to-End Pipeline: Established a comprehensive pipeline encompassing data preprocessing, model training, logging, and testing for EEG connectome analysis. Successfully managed and processed datasets exceeding 3GB in size, showcasing proficiency in handling large-scale data analysis tasks. Leveraged PyTorch and PyTorch Lightning for efficient deep learning workflows and integrated Weights & Biases for streamlined experiment tracking and management."
      ]
    }
  ];

const projects: Project[] = [
    {
      "title": "Gaudiya Kirtan Music App",
      "links": [
        {
          "name": "GitHub",
          "url": "URL"
        }
      ],
      "description": [
        "i created a monorepo for both an app and website with Solito for a music repository with NLP for on the fly language transliteration"
      ]
    },
    {
      "title": "Heart Sound Abnormality Detection App",
      "links": [
        {
          "name": "GitHub",
          "url": "URL"
        },
        {
          "name": "Paper",
          "url": "URL"
        }
      ],
      "description": [
        "trained a ai model (CNN+transformer) to predict abnormalities and arrhythmias in heart sounds and created an app to records the heart sounds and creates a prediction from them"
      ]
    },
    {
      "title": "A Compiler front-end",
      "links": [
        {
          "name": "GitHub",
          "url": "URL"
        }
      ],
      "description": [
        "Engineered a basic compiler in Python with Lexer, Parser to tokenize and construct Abstract Syntax Trees (AST) for a simple Pythoic programming language",
      ]
}];

export { experience, projects };
export type { Experience, Project, ProjectLink };
