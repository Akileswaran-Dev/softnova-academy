const COURSE_IDS = [
  "web-design",
  "hr-training",
  "ui-ux-design",
  "full-stack-development",
  "front-end-development",
  "desktop-support-engineer",
  "networking-ccna",
  "business-development-executive",
  "mern-stack-development",
  "python-full-stack-development",
  "data-analytics",
  "mean-stack-development"
];

export function generateStaticParams() {
  return COURSE_IDS.map((id) => ({
    id: id,
  }));
}

export default function CourseLayout({ children }) {
  return children;
}
