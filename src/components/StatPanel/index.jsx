import style from './style.module.scss';
import { useEffect } from "react";
import Chart from 'chart.js/auto';
import rank from '../../assets/profile/rank.svg';
import medal from '../../assets/profile/medal.svg';
import category from '../../assets/profile/category.svg'
import {userStatThunk} from "@/redux/features/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
const StatPanel = () => {
    const dispatch = useDispatch()
    const { userStat } = useSelector((state) => state.userStore);
    useEffect(() => {
        dispatch(userStatThunk());
    }, [dispatch]);

    const categories = userStat.categories


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
            <div className={style.upperPanel}>
                <h2>Achievements</h2>
                <div className={style.upperPanelContainer}>
               <div className={style.leftUpperPanel}>
                  <img src={rank} alt="rank"/>
                   <div className={style.UpperInfo}>
                   <h5>Rank:<span>{userStat.userRank?.name}</span></h5>
                   <h5>Overall hackathons:<span>100</span></h5>
               </div>
               </div>
                <div className={style.centerUpperPanel}>
                    <img src={category} alt="category"/>
                    <div className={style.UpperInfo}>
                    <h5>Your most popular categories:<span>
                        {categories?.map((cat)=>(
                            <li key={cat.id}>{cat.name}</li>
                        ))}
                    </span></h5>

                </div>
                </div>
                <div className={style.rightUpperPanel}>
                    <img src={medal} alt="medal"/>
                    <div className={style.UpperInfo}>
                    <h5>Latest wins:<span>golden</span></h5>
                    <h5>Overall hackathons:<span>100</span></h5>
                </div>
                </div>
            </div>
            </div>
            <div className={style.RoundStat}>
                <div className={style.roundInfoCont}>
            <div className={style.roundInfo}>
                <div className={style.squareLabel}></div> <h5>Earned Points</h5>
            </div>

                <div className={style.roundInfo}>
                    <div className={style.squareLabelAll}></div> <h5>Remaining Points</h5>
                </div>
            </div>
            {/*<canvas id='roundChart'></canvas>*/}
        </div>
        </div>
    );
}

export default StatPanel;
