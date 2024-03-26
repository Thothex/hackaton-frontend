import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import dayjs from 'dayjs';
import PropTypes from "prop-types";

const ProfileStat = ({stat}) => {
    useEffect(() => {

        const prepareChartData = () => {
            if (!stat) return [];

            const months = generateLastSixMonths();
            const data = months.map(month => {
                const monthName = month.format('MMMM');
                const count = stat.filter(entry => dayjs(entry.createdAt).format('MMMM') === monthName).length;
                return count;
            });
            return data;
        };
    console.log('-------', stat)
        const chartData = prepareChartData();

        const ctx = document.getElementById('myChart');
        if (ctx) {
            const months = generateLastSixMonths();
            const barWidthPercentage = 13;
            const chartWidth = ctx.parentElement.clientWidth;

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: months.map(month => month.format('MMMM')),
                    datasets: [{
                        label: 'Your hackathons',
                        data:chartData,
                        borderRadius: 5,
                        fontFamily: 'Geologica',
                        backgroundColor: 'rgba(151,171,223,0.25)',
                        hoverBackgroundColor: 'rgb(151,171,223)',
                        barThickness: chartWidth * (barWidthPercentage / 100),
                        hoverBorderColor: 'rgb(151,171,223)',
                        color: '#2D3748',
                    }]
                },
                options: {
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false,
                            }
                        },
                        y: {
                            grid: {
                                display: false,
                                drawBorder: false,
                            },
                            ticks: {
                                display: false ,
                                drawBorder: false,
                            }
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 20,
                                    family: 'Geologica',
                                    color: '#2D3748'
                                }
                            }
                        },
                    },
                    layout: {
                        padding: {
                            left: 20,
                            right: 20,
                            top: 20,
                            bottom: 20
                        }
                    },
                    grid: {
                        display: false // Убрать сетку
                    }
                }
            });
        }
    }, []);
console.log(stat)
    const generateLastSixMonths = () => {
        const months = [];
        let currentDate = dayjs();
        for (let i = 0; i < 6; i++) {
            months.unshift(currentDate);
            currentDate = currentDate.subtract(1, 'month');
        }
        return months;
    };

    return (
        <canvas style={{ width: '100%', height: '100%' }} id="myChart"></canvas>
    );
}

ProfileStat.propTypes = {
    stat: PropTypes.arrayOf(
        PropTypes.shape({
            createdAt: PropTypes.string.isRequired,
        })
    ),
};

export default ProfileStat;
