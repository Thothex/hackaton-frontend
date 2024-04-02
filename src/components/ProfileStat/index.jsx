import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Chart from "chart.js/auto";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const ProfileStat = ({ stat }) => {
  const { t } = useTranslation();
  useEffect(() => {
    const prepareChartData = () => {
      if (!stat) return [];

      const months = generateLastSixMonths();
      const currentYear = dayjs().year();

      const data = months.map((month) => {
        const monthName = month.format("MMMM");
        const count = stat.filter((entry) => {
          const entryYear = dayjs(entry.createdAt).year();
          return (
            dayjs(entry.createdAt).format("MMMM") === monthName &&
            entryYear === currentYear
          );
        }).length;
        return count;
      });
      return data;
    };
    const chartData = prepareChartData();

    const ctx = document.getElementById("myChart");
    if (ctx) {
      const months = generateLastSixMonths();
      const barWidthPercentage = 13;
      const chartWidth = ctx.parentElement.clientWidth;

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: months.map((month) => {
            return `${t(`ProfilePage.months.${month.format("MMMM")}`)}`;
          }),

          datasets: [
            {
              label: `${t("ProfilePage.label-stat")}`,
              data: chartData,
              borderRadius: 5,
              fontFamily: "Geologica",
              backgroundColor: "rgba(151,171,223,0.25)",
              hoverBackgroundColor: "rgb(151,171,223)",
              barThickness: chartWidth * (barWidthPercentage / 100),
              hoverBorderColor: "rgb(151,171,223)",
              color: "#2D3748",
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: false,
              },
            },
            y: {
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                display: false,
                drawBorder: false,
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 20,
                  family: "Geologica",
                  color: "#2D3748",
                },
              },
            },
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            },
          },
          grid: {
            display: false, // Убрать сетку
          },
        },
      });
    }
  }, []);
  console.log(stat);
  const generateLastSixMonths = () => {
    const months = [];
    let currentDate = dayjs();
    for (let i = 0; i < 6; i++) {
      months.unshift(currentDate);
      currentDate = currentDate.subtract(1, "month");
    }
    return months;
  };

  return (
    <canvas style={{ width: "100%", height: "100%" }} id="myChart"></canvas>
  );
};

ProfileStat.propTypes = {
  stat: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default ProfileStat;
