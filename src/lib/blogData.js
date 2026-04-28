export const baseBlogPosts = [
  {
    title: "Architecting High-Performance Digital Ecosystems",
    excerpt: "Discover the engineering principles behind creating digital platforms that load in milliseconds and command user attention from the first interaction.",
    category: "Engineering",
  },
  {
    title: "Ads Hub Dominance: A Data-Driven Approach",
    excerpt: "How to leverage predictive analytics and modular AI integrations to achieve unprecedented ROI in your advertising campaigns.",
    category: "Marketing",
  },
  {
    title: "The Psychology of Dark Mode Interfaces",
    excerpt: "Why premium brands are shifting to dark aesthetics, and how it scientifically reduces cognitive load while increasing conversion rates.",
    category: "Design",
  },
  {
    title: "Modular AI: The Future of Business Intelligence",
    excerpt: "Implementing intelligent automation systems that scale seamlessly with your organizational growth and operational demands.",
    category: "AI & Automation",
  },
  {
    title: "Scalable Infrastructure for Viral Growth",
    excerpt: "Engineering backend systems capable of handling massive traffic spikes without compromising performance or user experience.",
    category: "Infrastructure",
  }
];

const techImages = Array.from({ length: 20 }, (_, i) => `https://picsum.photos/seed/tageasy${i}/800/600`);

const generateContent = (title, mainImageIndex) => {
  const innerImage1 = techImages[(mainImageIndex + 5) % techImages.length];
  const innerImage2 = techImages[(mainImageIndex + 10) % techImages.length];

  return [
    { type: 'paragraph', text: `When discussing ${title.toLowerCase()}, the conversation inevitably turns toward scalability and performance engineering. Standard agencies build simple pages, but constructing a robust digital headquarters requires a systematic approach to technical architecture. In this article, we dive deep into the methodologies that allow platforms to capture massive high-intent traffic without degradation.` },
    { type: 'heading', text: 'The Foundation of Performance' },
    { type: 'paragraph', text: 'To truly dominate in a competitive digital landscape, you cannot rely on out-of-the-box solutions. We engineer ecosystems that are modular by design. This means isolating core business logic from the presentation layer, leveraging edge caching, and deploying highly optimized assets.' },
    { type: 'image', url: innerImage1, alt: 'Technical Blueprint Visualization' },
    { type: 'paragraph', text: 'Notice how the above architecture separates concerns. This is critical for cognitive load reduction on the client side, and immense throughput capabilities on the server side. As traffic spikes—such as during viral marketing campaigns—the system gracefully absorbs the load.' },
    { type: 'heading', text: 'Integrating Intelligence' },
    { type: 'paragraph', text: 'Beyond raw speed, the next wave of digital dominance is driven by integrated intelligence. Systems like Adamsalve demonstrate that automation isn\'t just about replacing manual tasks; it is about scaling logic. When a user interacts with a perfectly engineered platform, the experience feels organic, anticipating their needs before they explicitly define them.' },
    { type: 'image', url: innerImage2, alt: 'AI Automation Workflow' },
    { type: 'paragraph', text: 'In conclusion, the engineering edge comes from treating your digital presence not as a brochure, but as an active, intelligent software ecosystem. This protocol is what separates the leaders from the followers in today\'s aggressive digital economy.' }
  ];
};

const generateBlogData = () => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    const base = baseBlogPosts[i % baseBlogPosts.length];
    const imageIndex = i % techImages.length;
    const image = techImages[imageIndex];
    const date = new Date();
    date.setDate(date.getDate() - (i * 3)); // Stagger dates
    
    data.push({
      id: i + 1,
      title: i < 5 ? base.title : `${base.title} - Part ${Math.floor(i/5) + 1}`,
      excerpt: base.excerpt,
      category: base.category,
      image: image,
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      slug: (base.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + `-${i + 1}`).replace(/(^-|-$)/g, ''),
      content: generateContent(base.title, imageIndex)
    });
  }
  return data;
};

export const blogData = generateBlogData();
