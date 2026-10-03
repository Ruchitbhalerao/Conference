// Single source of truth for all editable conference content.
// Replace the placeholder values below — every page reads from here.

export const conference = {
  name: "ICIPTT 2027",
  fullName: "International Conference on Intellectual Property & Technology Transfer",
  theme: "From Knowledge to Impact: IP, Innovation & the Future of Technology Transfer",
  description:
    "A forum bringing together researchers, academics, IP and technology-transfer professionals, innovators and industry stakeholders to exchange ideas on developments in intellectual property and technology transfer.",
  themeExplanation:
    "The theme explores how intellectual property frameworks and technology-transfer practice can turn research into societal and economic value — across institutions, sectors and borders.",
  date: "18–20 March 2027",
  location: "New Delhi, India",
  institution: "[Organizing Institution Name]",
  email: "secretariat@iciptt-conference.org",
  phone: "+91 00000 00000",
  address: "[Street Address], [City], [Postal Code], [Country]",
  // Paste your external submission platform URL here (e.g. EasyChair, CMT).
  submissionUrl: "#",
  social: {
    linkedin: "#",
    x: "#",
    youtube: "#",
  },
};

export const importantDates = [
  { label: "Call for Papers Opens", date: "15 Oct 2026", home: true },
  { label: "Submission Deadline", date: "15 Dec 2026", home: true, highlight: true },
  { label: "Notification of Acceptance", date: "20 Jan 2027", home: true },
  { label: "Final Submission", date: "15 Feb 2027", home: false },
  { label: "Conference Date", date: "18–20 Mar 2027", home: true },
];

export const topics = [
  "Intellectual Property",
  "Patents",
  "Copyright & Trademarks",
  "Technology Transfer",
  "Research Commercialization",
  "Licensing & Commercialization",
  "Innovation & Entrepreneurship",
  "University–Industry Collaboration",
  "IP Policy",
  "Emerging Technologies",
  "Artificial Intelligence & IP",
  "Digital Innovation",
];

export const submissionTypes = [
  { title: "Full Papers", text: "Complete original research with methodology, findings and conclusions." },
  { title: "Research Papers", text: "Focused scholarly contributions or work in progress." },
  { title: "Case Studies", text: "Practical accounts of IP management, licensing or transfer in action." },
  { title: "Poster / Research Abstracts", text: "Concise presentations of emerging research." },
  { title: "Panel / Workshop Proposals", text: "Interactive sessions led by practitioners or scholars." },
];

export const guidelines = [
  { title: "Word / page limit", text: "[e.g. Full papers up to 8,000 words; abstracts up to 500 words]" },
  { title: "Formatting requirements", text: "[e.g. A4, 12pt, 1.5 line spacing, template provided]" },
  { title: "File format", text: "[e.g. PDF for review; DOCX for final submission]" },
  { title: "Referencing style", text: "[e.g. APA 7th edition or OSCOLA]" },
  { title: "Submission procedure", text: "[Submit via the online submission platform linked below]" },
  { title: "Review process", text: "[e.g. Double-blind peer review by the Scientific Committee]" },
];

export const audiences = [
  "Researchers & Academics",
  "IP Professionals",
  "Technology Transfer Professionals",
  "Industry & R&D Professionals",
  "Entrepreneurs & Innovators",
  "PhD Scholars & Students",
  "Policymakers & Institutional Leaders",
];

export const committee = {
  chair: { name: "Prof. [Name]", institution: "[Institution]" },
  organizing: [
    { name: "[Name]", institution: "[Institution]" },
    { name: "[Name]", institution: "[Institution]" },
    { name: "[Name]", institution: "[Institution]" },
  ],
  scientific: [
    { name: "[Name]", institution: "[Institution]" },
    { name: "[Name]", institution: "[Institution]" },
    { name: "[Name]", institution: "[Institution]" },
  ],
};
