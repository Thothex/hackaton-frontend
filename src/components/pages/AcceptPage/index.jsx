import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const AcceptPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { teamId, userId } = useParams();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown === 1) {
        navigate("/hackathon");
      } else {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  useEffect(() => {
    const acceptInvitation = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/team/accept/${teamId}/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error accepting invitation:", error);
      }
    };
    acceptInvitation();
  }, [teamId, userId]);

  return (
    <div>
      <h1>{t("AcceptPage.accepted")}</h1>
      <p>{t("AcceptPage.redirecting", { countdown: countdown })} </p>
    </div>
  );
};

export default AcceptPage;
