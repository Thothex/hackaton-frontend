import style from './style.module.scss';
import {useEffect, useRef} from "react";
import Chart from 'chart.js/auto';
import rank from '../../assets/profile/rank.svg';
import medal from '../../assets/profile/medal.svg';
import category from '../../assets/profile/category.svg'
import {userStatThunk} from "@/redux/features/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import wizard from '../../assets/achievements/trophy.svg';
//
// const svgFiles = require.context('../../assets/achievements/', false, /\.svg$/);
//
// const svgPaths = svgFiles.keys().map(svgFiles);

const StatPanel = () => {
    const dispatch = useDispatch();
    const { userStat } = useSelector((state) => state.userStore);
    const { userInfo } = useSelector((state) => state.userStore);
    const chartRef = useRef(null);

    useEffect(() => {
        dispatch(userStatThunk());
    }, [dispatch]);

    const categories = userStat.categories;
    const userRank = userStat.userRank?.name;
    const amountOfHacks = userStat?.hack?.length;
    const userScore = userInfo?.score;
    const leftScore = userStat?.nextRank;

    useEffect(() => {
        const ctx = document.getElementById('roundChart');
        const userS = userInfo?.score;
        const next = userStat?.nextRank;
        if (ctx) {
            if (chartRef.current) {
                chartRef.current.destroy(); // Уничтожаем предыдущий экземпляр диаграммы
            }
            chartRef.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Earned Points', 'Remaining Points for the next rank'],
                    datasets: [{
                        data: [userS, next],
                        hoverOffset: 2,
                        backgroundColor: ['rgba(151,171,223,0.8)', 'white'],
                        borderColor: 'rgba(151,171,223,0.8)',
                        borderWidth: 2,
                    }]
                },
                options: {
                    cutout: '70%',
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 20,
                                    family: 'Geologica',
                                    color: '#2D3748'
                                }
                            },
                            display: false,
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
    }, [userInfo, userStat]);
    return (
        <div className={style.statPanel}>
            <div className={style.upperPanel}>
                <h2>Achievements</h2>
                <div className={style.upperPanelContainer}>
               <div className={style.leftUpperPanel}>
                  <img src={rank} alt="rank"/>
                   <div className={style.UpperInfo}>
                   <h5>Your own rank:
                       {userRank==='wooden' && <p className={style.wooden}>{userRank}</p>}
                       {userRank==='iron' && <p className={style.iron}>{userRank}</p>}
                       {userRank==='bronze' && <p className={style.bronze}>{userRank}</p>}
                       {userRank==='silver' && <p className={style.silver}>{userRank}</p>}
                       {userRank==='gold' && <p className={style.gold}>{userRank}</p>}
                       {userRank==='platinum' && <p className={style.platinum}>{userRank}</p>}
                       {userRank==='diamond' && <p className={style.diamond}>{userRank}</p>}
                   </h5>
               </div>
               </div>
                <div className={style.centerUpperPanel}>
                    <img src={category} alt="category"/>
                    <div className={style.UpperInfo}>
                    <h5>Your most popular categories:<span className={style.categories}>
                        {categories?.map((cat)=>(
                            <li key={cat.id}>{cat.name.toLowerCase()}</li>
                        ))}
                    </span></h5>

                </div>
                </div>
                <div className={style.rightUpperPanel}>
                    <img src={medal} alt="medal"/>
                    <div className={style.UpperInfo}>
                    <h5>Latest wins:<span>golden</span></h5>
                    <h5>Overall hackathons:<span>{Number(amountOfHacks)}</span></h5>
                </div>
                </div>
            </div>
            </div>
            <div className={style.lowePanel}>
            <div className={style.achiv}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Level</th>
                        <th scope="col">Code wizard</th>
                        <th scope="col">Universal player</th>
                        <th scope="col">Unrivaled Leader</th>
                        <th scope="col">Scientist</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>wooden</td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                    </tr>
                    <tr>
                        <td>iron</td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                    </tr>
                    <tr>
                        <td>bronze</td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                    </tr>
                    <tr>
                        <td>silver</td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>

                    </tr>
                    <tr>
                        <td>gold</td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                    </tr>
                    <tr>
                        <td>platinum</td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                    </tr>
                    <tr>
                        <td>diamond</td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                        <td><img src={wizard}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={style.RoundStat}>
                <div className={style.roundInfoCont}>
            <div className={style.roundInfo}>
                <div className={style.squareLabel}></div> <h5>Earned Points</h5>
            </div>

                <div className={style.roundInfo}>
                    <div className={style.squareLabelAll}></div> <h5>Remaining Points for the next rank</h5>
                </div>
            </div>
            <canvas id='roundChart'></canvas>
        </div>
            </div>
        </div>
    );
}

export default StatPanel;
