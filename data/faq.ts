export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-01',
    question: 'What does PRAYXIS build?',
    answer: 'PRAYXIS builds high-throughput web and mobile software applications, cloud microservices infrastructure, zero-trust cybersecurity solutions, and intelligent automation systems for modern technology organizations.',
    category: 'GENERAL',
  },
  {
    id: 'faq-02',
    question: 'What cybersecurity services do you provide?',
    answer: 'Our cybersecurity capabilities include web and application security testing, API vulnerability auditing, cloud security architecture design, continuous security scanning integration, and zero-trust protocol enforcement.',
    category: 'CYBERSECURITY',
  },
  {
    id: 'faq-03',
    question: 'Do you build custom software for organizations?',
    answer: 'Yes. We partner with ambitious tech companies and engineering teams to design, architect, and deploy custom web platforms, mobile applications, and backend API infrastructure.',
    category: 'SOFTWARE',
  },
  {
    id: 'faq-04',
    question: 'Do you work with technology startups?',
    answer: 'Yes. We collaborate with early-stage and scaling technology startups to build production-ready platforms engineered for security, high performance, and long-term scalability from day one.',
    category: 'PARTNERSHIP',
  },
  {
    id: 'faq-05',
    question: 'Does PRAYXIS offer cyber training and workshops?',
    answer: 'Through PRAYXIS Academy, we conduct specialized hands-on cyber training, secure coding workshops, and practical software engineering labs for developers and security enthusiasts.',
    category: 'TRAINING',
  },
  {
    id: 'faq-06',
    question: 'Do you offer internships or careers at PRAYXIS?',
    answer: 'We continuously engage with passionate software engineers, security researchers, and designers. Explore our Careers & Talent Network section to connect with our team.',
    category: 'CAREERS',
  },
  {
    id: 'faq-07',
    question: 'How can I start a project with PRAYXIS?',
    answer: 'You can reach out directly via our contact section or send an email to info@prayxis.in. Our engineering leadership responds within 24 hours to schedule an initial advisory consultation.',
    category: 'CONTACT',
  },
];
