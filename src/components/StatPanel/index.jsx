import style from './style.module.scss';
import { useEffect } from "react";
import Chart from 'chart.js/auto';

const StatPanel = () => {
    useEffect(() => {
        const ctx = document.getElementById('roundChart');
        if (ctx) {
            const earnedPercentage = (100 / 1000) * 100;
            const remainingPercentage = 100 - earnedPercentage;

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Earned Points', 'Remaining Points'],
                    datasets: [{
                        data: [earnedPercentage, remainingPercentage],
                        hoverOffset: 4,
                        backgroundColor: ['#97abdf', 'white'],
                        borderColor:'#97abdf',
                        borderWidth: 2,
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 20,
                                    family: 'Geologica',
                                    color: '#2D3748'
                                }
                            },
                            display: false, // Скрываем прямоугольники в легенде
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
                }
            });
        }
    }, []);

    return (
        <div className={style.statPanel}>
            <div className={style.RoundStat}>
                <div className={style.roundInfoCont}>
            <div className={style.roundInfo}>
                <div className={style.squareLabel}></div> <h5>Earned Points</h5>
            </div>

                <div className={style.roundInfo}>
                    <div className={style.squareLabelAll}></div> <h5>Remaining Points</h5>
                </div>
            </div>
            <canvas id='roundChart'></canvas>
        </div>
        </div>
    );
}

export default StatPanel;
