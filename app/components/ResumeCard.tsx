import { Link } from "react-router";
import ScoreCircle from '~/components/ScoreCircle';
import { useEffect, useState } from 'react';
import { usePuterStore } from '~/lib/puter';

interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath?: string;
  feedback?: {
    overallScore: number;
  };
}

const ResumeCard = ({
                      resume: { id, companyName, jobTitle, feedback, imagePath },
                    }: {
  resume: Resume;
}) => {

  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    }

    loadResume();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000 w-[32%] max-lg:w-1/2 max-md:w-full"
    >
      <div className="resume-card-header flex items-center justify-between">
        <div className="flex flex-col gap-2">
          {companyName && (
            <h2 className="!text-black font-bold break-words">{companyName}</h2>
          )}
          {jobTitle && (
            <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className="!text-black font-bold">Resume</h2>
          )}
        </div>
        {feedback && (
          <div className="flex-shrink-0">
            <ScoreCircle score={feedback.overallScore} />
          </div>
        )}
      </div>

      {resumeUrl  && (
        <div className="gradient-border animate-in fade-in duration-1000 mt-4">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-lg"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
