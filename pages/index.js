// import Head from "next/head";
// import useSWR from "swr";
// import axios from "axios";
// import Link from "next/link";

// const fetcher = (url) => axios.get(url).then((res) => res.data);

// export default function Home(props) {
//   const { data } = useSWR("http://localhost:3000/api/get-courses", fetcher, {
//     initialData: props.courses,
//   });

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//         {data.map(({ title }) => (
//           <h2 key={title}>{title}</h2>
//         ))}
//       </main>

//       <footer className="flex items-center justify-center w-full h-24 border-t">
//         <a
//           className="flex items-center justify-center"
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{" "}
//           <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
//         </a>
//       </footer>
//     </div>
//   );
// }

// export const getStaticProps = async () => {
//   const courses = await fetcher("http://localhost:3000/api/get-courses");

//   return { props: { courses } };
// };

import { getCourses } from "../utils/db";

const Index = ({ courses }) => {
  return (
    <div>
      <h1>Courses 1</h1>
      <pre>{JSON.stringify(courses, null, 2)}</pre>
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await getCourses();

  return {
    props: {
      courses: JSON.parse(JSON.stringify(data)),
    },
  };
};

export default Index;
