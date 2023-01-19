//Hooks
import { Link, Navigate, Routes, Route } from 'react-router-dom'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

//Components
import { BackHomeButton } from './BackHomeButton/BackHomeButton'

// CSS
import './AboutPage.scss'
import PastorBrown from "./images/Pastor.webp"
import PastorBullock from "./images/Pastorpic.JPG"
import Church from "./images/StPaulBaptistChurch.JPG"

// Child Component of App.js

function AboutPage(){
    console.log({PastorBrown})
    return(
        <ParallaxBanner style={{ aspectRatio: 'auto' }}>
            <ParallaxBannerLayer image={Church} speed={-30} className="about-page-background-container" />
                <ParallaxBannerLayer className={'about-page-background'} >
                    <div className='about-page text-center'>
                        <h3 className='about'>About</h3>
                        <h1 className='about-page-title'>St Paul Baptist Church</h1>
                        
                        <section>
                            <div className="welcome-container">
                                <h2 className='welcome'>Welcome</h2>
                                <p className='welcome-message'>
                                    The Pastor Rev. Brown and Assistant Pastor Rev Kim Bullock welcome you to St. Paul Baptist Church. We invite you to come and share in worship with us in the scripture of 1 Peter 2:9 "A people of praise and service".
                                </p>
                                <p>Welcome, Welcome, Welcome!</p>
                            </div>
                        </section>
                        
                        {/* Pastors */}
                        <div className="pastor-info-container">
                            <ul className="pastor-pictures">
                                <li>
                                    <div className="pastor-picture pastor-brown" style={{ backgroundImage: `url(${PastorBrown})` }}></div>
                                    <h5>Rev. Robert D. Brown<br /> with<br /> Pastor Kim Bullock</h5>
                                </li>
                                <li>
                                    <div className="pastor-picture pastor-bullock" style={{ backgroundImage: `url(${PastorBullock})` }}></div>
                                    <h5>Pastor Kim Bullock</h5>
                                </li>
                            </ul>
                        </div>
                        <section>
                            <h2 className='section-title our-mission-title'>Our Mission</h2>
                            <p className='our-mission-message'>We believe that the door to salvation is always open and so are the doors to our church. Our mission is to be fully devoted to Jesus by opening our arms to those in search of the truth. We show God’s love and concern for our fellow man at every opportunity. Through works of charity and opening our doors to listen and love, we feel that we are walking in the footsteps of Jesus Christ.</p>
                        </section>
                        <section>
                            <h2 className='section-title prayer-request-title'>Prayer Request</h2>
                            <p className='prayer-request-message'>
                                We believe that the door to salvation is always open and so are the doors to our church. Our mission is to be fully devoted to Jesus by opening our arms to those in search of the truth. We show God’s love and concern for our fellow man at every opportunity. Through works of charity and opening our doors to listen and love, we feel that we are walking in the footsteps of Jesus Christ.
                            </p>
                            <div className="prayer-request">
                                <Link to='/prayer_requests' className="prayer-request-button">
                                    Click here if you'd like to submit a prayer request
                                </Link>
                            </div>
                        </section>
                        <section className="section-large">
                            <h2 className="section-title history-title">History</h2>
                            <p className="history-message text-start">
                            The record reads in the year of our Lord 1887, the members of Providence Baptist Church, Beulahville, Virginia set out to organize what is now the St. Paul Baptist Church located near Globe, Virginia in King William County. Having been called upon by the members of the St. Paul Church, Brother Horace Roane, did accordingly, on the 6th day of October in the year of the Lord 1887, after due examination, proceeded by prayer and imposition of hands, the members did set apart and ordain the said brother to the full work of the Gospel Ministry, the work, whereunto, we trust he has been called by the Great Head of the Church.
                            Thus began the St. Paul Baptist Church under the leadership of its first Pastor, Rev Horace Roane, assisted by the following officers: Brother Henry Taylor, Sr., Brother Jack Gwathmey, and Brother Abraham Garlick. The first membership was small, but from the beginning, the church realized its primary function was to teach the members to serve God and to do extensive missionary work.

                            The first members of the church were Abraham Garlick, Henry Taylor, Sr., Jack Gwathmey, Langston Taylor, Octavia Baylor, Lucy Taylor, Polly Nelson, Corral Garlick, Sally Nelson, Lucy Gwathmey, Shack Tunkett, Octaven Temple, Gracie Pollard, Adeline Trent, Pat Trent, Blanche Nelson, and Thomas Jackson.

                            Records of the church beginning with the early 1900's through the early 1950's are no longer available, thus some information for that period is rather vague. It is known that Rev. Horace Roane died in 1906 and there were two ministers who served during the period from 1906 to 1914. The two ministers were Rev. Armstead Robinson followed by Rev. A.H. Gallup.
                            In the early 1900's more Deacons were added. the new Deacons were: Patrick Trent, Wallace Nelson, Govern Garlick, Henry Gwathmey, and Lee Berkeley. Rev. Washington Henry became the fourth minister in 1914 and served until 1920. A building program was started under Rev. Henry's leadership. Building materials were purchased to build a new church, but there was a fire and this dream was destroyed, but not the faith and hopes of these people of God. In 1920, Rev Harvey Johnson was called and became the fifth Pastor.The members worked hard to raise funds and under the leadership of Rev. Johnson a beautiful and larger church was erected. From the time to time more Deacons were added. In 1925, David Powell, James Coleman, Burley Cosby, William Anderson, and Nelson Brown were ordained. In 1941 Willie Pollard and James E.Powell were ordained. In 1956 Roscoe Gwathmey and Joseph Holmes were ordained, and in 1978 Harden E. Gwathmey was ordained The Rev. Elijah Hill was the sixth Pastor followed by Rev. E.R Know, Rev. J. L. Davenport, Rev.Silas Holmes, Rev. Samuel Jones and our present Pastor, Rev. Robert D. Brown who began his pastorate in 1970. In, 1963, during the pastorate of Rev. Silas Holmes, there was a split in the church, and some of the members went with Rev, Holmes and organized the first Baptist Church at Epworth, Virginia. Under the leadership of our present pastor, Rev. Robert Brown there has been extensive growth in the church, financially and spiritually. St. Paul has become a beacon in the community through its outreach programs to black, white, young and old: the Senior Citizens program, Girl Scouts, Bible study missionary work, the Pamunkey Baptist Association, the Church School, recreational activities and civic work
                            </p>
                        </section>

                        <BackHomeButton className="mb-5"/>
                    </div>
            </ParallaxBannerLayer>
        </ParallaxBanner>
    )
}

export default AboutPage