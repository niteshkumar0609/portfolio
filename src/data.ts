export const profile = {
  name: 'Nitesh Kumar',
  email: 'niteshku23@iitk.ac.in',
  github: 'https://github.com/niteshkumar0609',
  linkedin: 'https://www.linkedin.com/in/nitesh-kumar-8136982a1/',
}

export const projects = [
  {
    title: 'In-Memory Key-Value Store',
    category: 'Systems engineering',
    focus: 'Fast lookups, automatic expiration, and database state recovery through separate C++ modules.',
    date: 'May – Jul 2026',
    context: 'Self project',
    description: 'A C++ storage engine that brings together fast lookups, key expiration, and persistence in a modular, object-oriented design.',
    details: [
      'Used unordered_map and unordered_set for O(1) average-time operations.',
      'Separated the Command Parser, Storage Engine, Expiry Manager, and Database into dedicated modules.',
      'Added automatic key expiration with std::chrono and file persistence to recover database state after restarts.',
    ],
    tags: ['C++', 'STL', 'OOP', 'File I/O'],
    url: 'https://github.com/niteshkumar0609/In-Memory-Key-Value-Store-',
    visual: 'store',
  },
  {
    title: 'Digitizing Entry With Flutter',
    category: 'Mobile development',
    focus: 'Secure admin access and connected ticket-management and entry-verification workflows.',
    date: 'May – Jul 2025',
    context: 'Project Mentor · ACA',
    description: 'An admin application for managing ticket pricing, time slots, bookings, and QR-based entry verification.',
    details: [
      'Implemented Firebase Authentication for secure admin login and protected management features.',
      'Built workflows to create, update, and track tickets through an admin dashboard.',
      'Integrated Cloud Firestore for ticket, pricing, and time-slot data, with QR-based ticket verification at entry.',
    ],
    tags: ['Flutter', 'Firebase', 'Cloud Firestore', 'QR Flutter'],
    visual: 'ticket',
  },
  {
    title: 'AI 101 · Sentiment Classification',
    category: 'Natural language processing',
    focus: 'Adapting a pre-trained language model to customer reviews through task-specific fine-tuning.',
    date: 'Dec 2024 – Feb 2025',
    context: 'Electrical Engineering Association · IIT Kanpur',
    description: 'Fine-tuned a pre-trained BERT model to classify customer reviews into positive and negative sentiments.',
    details: [
      'Cleaned and tokenized review text, then created training and validation splits.',
      'Trained on task-specific reviews and evaluated predictions with accuracy and F1-score.',
      'Used the fine-tuned model for inference on new customer reviews.',
    ],
    tags: ['Python', 'PyTorch', 'Hugging Face', 'BERT'],
    visual: 'sentiment',
  },
  {
    title: 'Employee Attrition Predictor',
    category: 'Applied machine learning',
    focus: 'Preparing HR data and comparing classification models with cross-validation and multiple metrics.',
    date: 'May – Jul 2025',
    context: 'EE708 course project · Prof. Rajesh M. Hegde',
    description: 'Predicted employee turnover risk using the IBM HR Analytics dataset, with 74% accuracy reported in the resume.',
    details: [
      'Performed data cleaning, categorical encoding, feature scaling, and key feature extraction.',
      'Built Logistic Regression and Random Forest models with 5-fold cross-validation.',
      'Compared precision, recall, F1-score, and ROC-AUC to assess model performance.',
    ],
    tags: ['Scikit-learn', 'Pandas', 'Random Forest', 'Seaborn'],
    visual: 'attrition',
  },
  {
    title: 'Stock Price Forecasting & Analysis',
    category: 'Time-series analysis',
    focus: 'Engineering temporal features and comparing Random Forest and LSTM forecasting models.',
    date: 'May – Jul 2024',
    context: 'Self project',
    description: 'Explored financial forecasting through engineered features and Random Forest and LSTM models.',
    details: [
      'Engineered moving averages, momentum, and lagged returns from financial data.',
      'Trained Random Forest and LSTM models and visualized metrics with Matplotlib and Plotly.',
      'The resume reports 90% accuracy; it does not specify the forecasting target or metric definition.',
    ],
    tags: ['Python', 'LSTM', 'Random Forest', 'Plotly'],
    url: 'https://github.com/niteshkumar0609/Stock-Price-Forecasting-and-Analysis',
    visual: 'forecast',
  },
]

export const skills = [
  { title: 'Languages', items: ['C++', 'C', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Dart', 'LaTeX'] },
  { title: 'Backend & databases', items: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'BullMQ', 'Firebase', 'Cloud Firestore', 'REST APIs'] },
  { title: 'Frontend & mobile', items: ['React', 'Next.js', 'Flutter', 'Chart.js', 'Mermaid'] },
  { title: 'Machine learning & vision', items: ['Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'OpenCV', 'Statsmodels'] },
  { title: 'AI & APIs', items: ['Google Gemini API', 'OpenAI API', 'DALL-E 3', 'Flux API', 'Kling API', 'PixVerse API'] },
  { title: 'Developer tools', items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Firebase Storage', 'Firebase Auth', 'ObjectBox'] },
]

export const courses = ['Data Structures and Algorithms', 'Fundamentals of Computing', 'Software Project Management', 'Probability and Statistics', 'Linear Algebra', 'Partial Differential Equations', 'Ordinary Differential Equations', 'Complex Variables', 'Signal Systems and Networks']
