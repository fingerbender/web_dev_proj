//import React from 'react';
//import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {

    return (
        <div id="home">
            <div id="mask"></div>
            <div id="titlebox">
                <h1>
                    <span>
                        <div>A</div>
                        <div>l</div>
                        <div>a</div>
                        <div>n</div>
                    </span>
                    <span>
                        <div>C</div>
                        <div>h</div>
                        <div>i</div>
                        <div>e</div>
                        <div>n</div>
                    </span>
                </h1>

                <div id="bio">
                    <section>
                        <ul>
                            <h2>Experience:</h2>
                            <li>
                                <h4>BU MET CS student: (2024 - present):</h4>
                                <p>
                                    MS in Software Development
                                </p>
                                <p>
                                    Python, Java, HTML, CSS, Javascript, React
                                </p>
                            </li>
                            <li>
                                <h4>Electronic Equipment Maintainer (2016 - present): </h4>
                                <p>
                                    Maintain & repair CCTV equipment.
                                </p>
                                <p>
                                    Maintain & repair Radio equipment.
                                </p>
                            </li>
                            <li>
                                <h4>Network Communication Equipment Operator / Maintainer (25H) (2023 - present):</h4>
                                <p>
                                    Maintain & operate end user satellite terminal.
                                </p>
                                <p>
                                    Maintain & operate nodal network equipment.
                                </p>
                                <p>
                                    Maintain, operate, & configure point to point telecom equipment.
                                </p>
                                <p>
                                    Maintain & splice fiber optic cable for the network.
                                </p>
                            </li>
                            <li>
                                <h4>Psychological Operations Specialist (37F) (2015 - 2023):</h4>
                                <p>
                                    Organize & conduct psychological operations in cooperation with host nations.
                                </p>
                                <p>
                                    Disseminate information product in cooperation with adjacent agencies.
                                </p>
                                <p>
                                    Conduct ground-based open source information gathering and analysis.
                                </p>
                            </li>
                        </ul>
                       
                    </section>
                    <section><Link to="/inventory">see project</Link></section>

                </div>
            </div>

        </div>
    )
};

export default Home;