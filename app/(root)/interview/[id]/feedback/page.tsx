import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

interface RouteParams {
  params: {
    id: string;
  };
}

const Feedback = async ({ params }: RouteParams) => {
  // Params को await करें
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) redirect("/auth/sign-in");

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id,
  });

  if (!feedback) {
    return (
      <section className="section-feedback">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-semibold text-center">
            Feedback Not Available
          </h1>
          <p className="text-lg text-center">
            Feedback for this interview is still being generated or is not available.
          </p>
          <Button className="btn-primary">
            <Link href="/">Back to Dashboard</Link>
          </Button>
        </div>
      </section>
    );
  }

  // Convert the categoryScores object to an array for easier mapping
  const categoryScoresArray = feedback.categoryScores ? [
    {
      name: "Communication Skills",
      score: feedback.categoryScores.communicationSkills?.score || 0,
      comment: feedback.categoryScores.communicationSkills?.comment || ""
    },
    {
      name: "Technical Knowledge",
      score: feedback.categoryScores.technicalKnowledge?.score || 0,
      comment: feedback.categoryScores.technicalKnowledge?.comment || ""
    },
    {
      name: "Problem Solving",
      score: feedback.categoryScores.problemSolving?.score || 0,
      comment: feedback.categoryScores.problemSolving?.comment || ""
    },
    {
      name: "Cultural Fit",
      score: feedback.categoryScores.culturalFit?.score || 0,
      comment: feedback.categoryScores.culturalFit?.comment || ""
    },
    {
      name: "Confidence and Clarity",
      score: feedback.categoryScores.confidenceClarity?.score || 0,
      comment: feedback.categoryScores.confidenceClarity?.comment || ""
    }
  ] : [];

  return (
    <section className="section-feedback">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview.role}</span> Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center ">
        <div className="flex flex-row gap-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression:{" "}
              <span className="text-primary-200 font-bold">
                {feedback?.totalScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr />

      <p>{feedback?.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4">
        <h2>Breakdown of the Interview:</h2>
        {categoryScoresArray.map((category, index) => (
          <div key={index}>
            <p className="font-bold">
              {index + 1}. {category.name} ({category.score}/20)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h3>Strengths</h3>
        <ul className="list-disc list-inside">
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Areas for Improvement</h3>
        <ul className="list-disc list-inside">
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;