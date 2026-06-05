import { College } from "@/types/colleges";

export const colleges: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    location: "New Delhi",
    state: "Delhi",
    type: "Government",
    rating: 4.8,
    fees: 200000,
    established: 1961,
    ranking: 2,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    courses: ["B.Tech", "M.Tech", "MBA", "PhD", "B.Des"],
    overview: "IIT Delhi is one of the premier engineering institutions in India, known for cutting-edge research and academic excellence. It has produced some of the finest engineers and entrepreneurs.",
    placements: {
      averagePackage: 2100000,
      highestPackage: 25000000,
      placementRate: 98
    },
    reviews: [
      { author: "Rahul Sharma", rating: 5, comment: "World-class faculty and infrastructure. Best decision of my life." },
      { author: "Priya Singh", rating: 4, comment: "Intense academics but amazing peer learning environment." }
    ],
    tags: ["Engineering", "Top Ranked", "Research"]
  },
  {
    id: "2",
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    location: "Mumbai",
    state: "Maharashtra",
    type: "Government",
    rating: 4.9,
    fees: 220000,
    established: 1958,
    ranking: 1,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    courses: ["B.Tech", "M.Tech", "MBA", "PhD", "M.Sc"],
    overview: "IIT Bombay is consistently ranked as India's top engineering college. Located in Mumbai, it offers unparalleled industry connections and alumni network.",
    placements: {
      averagePackage: 2400000,
      highestPackage: 30000000,
      placementRate: 99
    },
    reviews: [
      { author: "Amit Kumar", rating: 5, comment: "The alumni network is incredible. Got placed at Google!" },
      { author: "Sneha Patel", rating: 5, comment: "Techfest and Mood Indigo make campus life amazing." }
    ],
    tags: ["Engineering", "Top Ranked", "Placements"]
  },
  {
    id: "3",
    name: "All India Institute of Medical Sciences",
    shortName: "AIIMS Delhi",
    location: "New Delhi",
    state: "Delhi",
    type: "Government",
    rating: 4.9,
    fees: 50000,
    established: 1956,
    ranking: 1,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    courses: ["MBBS", "MD", "MS", "B.Sc Nursing", "PhD"],
    overview: "AIIMS Delhi is India's premier medical institution, renowned for its patient care, research, and medical education. It sets the gold standard for medical colleges in India.",
    placements: {
      averagePackage: 1500000,
      highestPackage: 10000000,
      placementRate: 100
    },
    reviews: [
      { author: "Dr. Neha Gupta", rating: 5, comment: "Best medical training in India. Faculty is extraordinary." },
      { author: "Ravi Verma", rating: 5, comment: "Exposure to cases that you won't find anywhere else." }
    ],
    tags: ["Medical", "Top Ranked", "Research"]
  },
  {
    id: "4",
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM Ahmedabad",
    location: "Ahmedabad",
    state: "Gujarat",
    type: "Government",
    rating: 4.8,
    fees: 2500000,
    established: 1961,
    ranking: 1,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
    courses: ["MBA", "PGPX", "PhD", "FPM"],
    overview: "IIM Ahmedabad is India's top business school, consistently ranked among the best in Asia. Its case-study based curriculum produces world-class business leaders.",
    placements: {
      averagePackage: 3500000,
      highestPackage: 80000000,
      placementRate: 100
    },
    reviews: [
      { author: "Vikram Mehta", rating: 5, comment: "The case study method changed how I think. Worth every penny." },
      { author: "Ananya Roy", rating: 4, comment: "Exhausting but incredibly rewarding. Peers are the best part." }
    ],
    tags: ["MBA", "Top Ranked", "Placements"]
  },
  {
    id: "5",
    name: "National Law School of India University",
    shortName: "NLSIU Bangalore",
    location: "Bangalore",
    state: "Karnataka",
    type: "Government",
    rating: 4.7,
    fees: 350000,
    established: 1987,
    ranking: 1,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    courses: ["BA LLB", "LLM", "PhD", "MBA"],
    overview: "NLSIU is India's premier law school, known for its rigorous legal education and producing top advocates, judges, and legal professionals.",
    placements: {
      averagePackage: 1800000,
      highestPackage: 12000000,
      placementRate: 95
    },
    reviews: [
      { author: "Karan Johari", rating: 5, comment: "Best law school in India without any doubt." },
      { author: "Pooja Iyer", rating: 4, comment: "Moot courts and debates are exceptional." }
    ],
    tags: ["Law", "Top Ranked"]
  },
  {
    id: "6",
    name: "Birla Institute of Technology and Science",
    shortName: "BITS Pilani",
    location: "Pilani",
    state: "Rajasthan",
    type: "Private",
    rating: 4.6,
    fees: 500000,
    established: 1964,
    ranking: 5,
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80",
    courses: ["B.E", "M.Tech", "MBA", "M.Sc", "PhD"],
    overview: "BITS Pilani is a top private engineering college known for its CGPA-based system, dual degrees, and industry-oriented education. The Practice School program offers great internships.",
    placements: {
      averagePackage: 1600000,
      highestPackage: 18000000,
      placementRate: 95
    },
    reviews: [
      { author: "Sidharth Nair", rating: 5, comment: "Practice School gave me a Google internship in 3rd year!" },
      { author: "Divya Sharma", rating: 4, comment: "Academic flexibility and dual degree options are unique." }
    ],
    tags: ["Engineering", "Private", "Placements"]
  },
  {
    id: "7",
    name: "Delhi University – Lady Shri Ram College",
    shortName: "LSR Delhi",
    location: "New Delhi",
    state: "Delhi",
    type: "Government",
    rating: 4.5,
    fees: 30000,
    established: 1956,
    ranking: 3,
    image: "https://images.unsplash.com/photo-1607013407627-6ee814329547?w=600&q=80",
    courses: ["B.A", "B.Com", "B.Sc", "M.A"],
    overview: "LSR is one of India's most prestigious women's colleges under Delhi University. Known for its vibrant campus culture and strong academics in humanities and commerce.",
    placements: {
      averagePackage: 700000,
      highestPackage: 3000000,
      placementRate: 80
    },
    reviews: [
      { author: "Ishita Kapoor", rating: 5, comment: "The culture and sisterhood here is unmatched." },
      { author: "Radhika Malhotra", rating: 4, comment: "Great faculty, amazing fests, beautiful campus." }
    ],
    tags: ["Arts", "Women's College", "Affordable"]
  },
  {
    id: "8",
    name: "Vellore Institute of Technology",
    shortName: "VIT Vellore",
    location: "Vellore",
    state: "Tamil Nadu",
    type: "Private",
    rating: 4.2,
    fees: 420000,
    established: 1984,
    ranking: 12,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    courses: ["B.Tech", "M.Tech", "MBA", "M.Sc", "PhD"],
    overview: "VIT Vellore is a top private technical university known for its state-of-the-art facilities, industry partnerships, and FFCS (Fully Flexible Credit System).",
    placements: {
      averagePackage: 950000,
      highestPackage: 8000000,
      placementRate: 88
    },
    reviews: [
      { author: "Arun Krishnan", rating: 4, comment: "Great infrastructure and international exposure." },
      { author: "Meera Sundaram", rating: 4, comment: "FFCS system lets you build your own timetable!" }
    ],
    tags: ["Engineering", "Private", "South India"]
  },
  {
    id: "9",
    name: "Symbiosis International University",
    shortName: "Symbiosis Pune",
    location: "Pune",
    state: "Maharashtra",
    type: "Private",
    rating: 4.1,
    fees: 380000,
    established: 1971,
    ranking: 20,
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    courses: ["BBA", "MBA", "B.Tech", "LLB", "B.Sc"],
    overview: "Symbiosis Pune is a diverse, multi-disciplinary university known for its international exposure, industry connections, and vibrant student community.",
    placements: {
      averagePackage: 850000,
      highestPackage: 5000000,
      placementRate: 82
    },
    reviews: [
      { author: "Rohit Desai", rating: 4, comment: "The diversity here is amazing. Learned a lot from peers." },
      { author: "Shreya Joshi", rating: 4, comment: "Great MBA program with solid industry connections." }
    ],
    tags: ["Management", "Private", "Diverse"]
  },
  {
    id: "10",
    name: "Jawaharlal Nehru University",
    shortName: "JNU Delhi",
    location: "New Delhi",
    state: "Delhi",
    type: "Government",
    rating: 4.4,
    fees: 15000,
    established: 1969,
    ranking: 7,
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    courses: ["M.A", "M.Sc", "PhD", "M.Phil", "B.A"],
    overview: "JNU is India's leading research university, known for social sciences, humanities, and political discourse. Home to brilliant scholars and a strong research culture.",
    placements: {
      averagePackage: 600000,
      highestPackage: 2500000,
      placementRate: 75
    },
    reviews: [
      { author: "Suman Chakraborty", rating: 5, comment: "The intellectual environment is second to none in India." },
      { author: "Ayesha Khan", rating: 4, comment: "Best place for social sciences and humanities research." }
    ],
    tags: ["Research", "Social Sciences", "Affordable"]
  },
  {
    id: "11",
    name: "IIT Madras",
    shortName: "IIT Madras",
    location: "Chennai",
    state: "Tamil Nadu",
    type: "Government",
    rating: 4.8,
    fees: 210000,
    established: 1959,
    ranking: 3,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    courses: ["B.Tech", "M.Tech", "PhD", "M.Sc", "MBA"],
    overview: "IIT Madras is India's top technical institution for research, consistently ranked #1 in NIRF. Known for its beautiful deer park campus and entrepreneurship ecosystem.",
    placements: {
      averagePackage: 2000000,
      highestPackage: 22000000,
      placementRate: 97
    },
    reviews: [
      { author: "Venkat Raman", rating: 5, comment: "Best research ecosystem in India. IITM Pravartak is amazing." },
      { author: "Lavanya S.", rating: 5, comment: "The deer park campus is serene. Incredible research opportunities." }
    ],
    tags: ["Engineering", "Top Ranked", "Research"]
  },
  {
    id: "12",
    name: "Manipal Academy of Higher Education",
    shortName: "Manipal University",
    location: "Manipal",
    state: "Karnataka",
    type: "Private",
    rating: 4.0,
    fees: 450000,
    established: 1953,
    ranking: 18,
    image: "https://images.unsplash.com/photo-1607013407627-6ee814329547?w=600&q=80",
    courses: ["MBBS", "B.Tech", "MBA", "B.Pharm", "BDS"],
    overview: "Manipal is a multi-disciplinary university known for medicine, engineering, and management. Its international outlook and diverse student body make it unique.",
    placements: {
      averagePackage: 800000,
      highestPackage: 4500000,
      placementRate: 79
    },
    reviews: [
      { author: "Arjun Shetty", rating: 4, comment: "Manipal town is perfect for students. Great campus life." },
      { author: "Tanya Bhat", rating: 4, comment: "International exposure is excellent. Many exchange programs." }
    ],
    tags: ["Medical", "Engineering", "Private"]
  }
];