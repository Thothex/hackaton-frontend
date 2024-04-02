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
    console.log('2222', userInfo, userStat)

    useEffect(() => {
        const ctx = document.getElementById('roundChart');
        const userS = userInfo?.score;
        const next = userStat?.nextRank;
        if (ctx) {
            if (chartRef.current) {
                chartRef.current.destroy();
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
                    <h5>Overall hackathons:<span>{Number(amountOfHacks)}</span></h5>
                </div>
                </div>
            </div>
            </div>
            <div className={style.lowePanel}>
                <div className={style.achiv}>
                    <h3>About ranks</h3>
                    <div className={style.aboutRank}>
                        <p className={style.wooden}>wooden</p>
                        <h5>from <span style={{fontWeight:800}}>0 to 100 points</span> . You are just in the beginning!</h5>
                    </div>
                    <div className={style.aboutRank}>
                        <p className={style.iron}>iron</p>
                        <h5>from <span style={{fontWeight:800}}>100 to 300</span> points. Feeling more confident in solving tasks.</h5>
                    </div>
                    <div className={style.aboutRank}>
                        <p className={style.bronze}>bronze</p>
                        <h5>from <span style={{fontWeight:800}}>300 to 600</span> points. Starting to make a name for yourself!</h5>
                    </div>
                    <div className={style.aboutRank}>
                        <p className={style.silver}>silver</p>
                        <h5>from <span style={{fontWeight:800}}>600 to 1000</span> points. Making significant progress!</h5>
                    </div>
                    <div className={style.aboutRank}>
                        <p className={style.gold}>gold</p>
                        <h5>from <span style={{fontWeight:800}}>1000 to 1500</span> points. Truly mastering your skills!</h5>
                    </div>

                    <div className={style.aboutRank}>
                        <p className={style.diamond}>diamond</p>
                        <h5>from <span style={{fontWeight:800}}>2000 to infinity</span>. You are a legend!</h5>
                    </div>
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
