import "./index.css";
import arrow from "./assets/images/fast-forward.png";
import { useEffect, useState } from "react";

const url = `https://course-api.com/react-tabs-project`;

function App() {
  
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchJobsDetails = async () => {
    let response = await fetch(url);
    response = await response.json();
    setLoading(false);
    setJobs(response);
    console.log(response);
  };

  useEffect(() => {
    fetchJobsDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-4xl font-bold">Loading...</div>
        <p>Please wait ..</p>
      </div>
    );
  }

  const { company, dates, duties, title } = jobs[index];

  return (
    <div className="flex flex-col sm:flex-row my-12 w-[95%] m-auto max-w-5xl gap-4">
      <div className="font-mono flex flex-row justify-center gap-4 flex-wrap items-center sm:items-start sm:justify-start sm:flex-col sm:gap-4 pt-6 px-4">
        {jobs.map((job, jobIndex) => {
          return (
            <button
              onClick={() => setIndex(jobIndex)}
              key={jobIndex}
              className={`transition duration-300 border-b-2 sm:border-b-0 sm:px-8 sm:border-l-4 border-transparent border-solid outline-none sm:hover:border-l-4 sm:hover:border-b-0 sm:hover:border-l-blue-400 ${jobIndex == index && `border-b-blue-400 sm:border-b-0 sm:border-l-blue-400 text-blue-400`}`}
              
            >
              {job.company}
            </button>
          );
        })}
      </div>
      <section className="p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">{title}</h1>
          <p className="bg-blue-300 w-max px-3 rounded">{company}</p>
          <p className="text-gray-500">{dates}</p>
        </div>
        <article className="mt-4 flex flex-col gap-4">
          {duties.map((duty, index) => {
            return (
              <div key={index} className="flex items-center gap-4">
                <img src={arrow} alt="arrow image" className="w-4 h-4" />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </section>
    </div>
  );
}

export default App;
