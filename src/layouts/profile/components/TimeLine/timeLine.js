import React, { useState, useEffect } from 'react';/*eslint-disable*/
import "../TimeLine/NewApp.css";
import { ReactComponent as WorkIcon } from "../../../../assets/icones/work.svg";
import { ReactComponent as SchoolIcon } from "../../../../assets/icones/school.svg";


import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

function TimeLine() {

  let timelineElements = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Dragontail, Ascana",
      description:
        "Converting data to a graphical interface, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that data.",
      buttonText: "View Frontend Projects",
      date: "August 2016 - present",
      icon: "work",
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "Skystead, Craonia",
      description:
        "Working hand-in-hand with front-end developers by providing the outward facing web application elements server-side logic. Creating the logic to make the web app function properly, and accomplishing this through the use of server-side scripting languages.",
      buttonText: "View Backend Projects",
      date: "June 2013 - August 2016",
      icon: "work",
    },
    {
      id: 3,
      title: "Quality Assurance Engineer",
      location: "South Warren, Geshington",
      description:
        "Assessing the quality of specifications and technical design documents in order to ensure timely, relevant and meaningful feedback.",
      buttonText: "Company Website",
      date: "September 2011 - June 2013",
      icon: "work",
    },
    {
      id: 4,
      title: "Oak Ridge College",
      location: "South Warren, Geshington",
      description:
        "Online Course in Magical Beasts and Wonders of the World - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque sagittis tellus, non ultrices lacus tempus vel.",
      buttonText: "Course Certificate",
      date: "September 2011",
      icon: "school",
    },
    {
      id: 5,
      title: "Hawking College",
      location: "Skystead, Craonia",
      description:
        "College - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque sagittis tellus, non ultrices lacus tempus vel.",
      buttonText: "College Projects",
      date: "2007 - 2011",
      icon: "school",
    },
    {
      id: 6,
      title: "Marble Hills Grammar School",
      location: "Dragontail, Ascana",
      description:
        "Highschool - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque sagittis tellus, non ultrices lacus tempus vel.",
      date: "2003 - 2007",
      icon: "school",
    },
  ];
  
  let workIconStyles = { background: "#06D6A0" };
  let schoolIconStyles = { background: "#f9c74f" };

  return (
    <div className='timeline'>
      <h1 className="titlee">Timeline</h1>
      <VerticalTimeline>
        {timelineElements.map((element) => {
          let isWorkIcon = element.icon === "work";
          let showButton =
            element.buttonText !== undefined &&
            element.buttonText !== null &&
            element.buttonText !== "";

          return (
            <VerticalTimelineElement
              key={element.key}
              date={element.date}
              dateClassName="date"
              iconStyle={isWorkIcon ? workIconStyles : schoolIconStyles}
              icon={isWorkIcon ? <WorkIcon /> : <SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {element.location}
              </h5>
              <p id="description">{element.description}</p>
              {showButton && (
                <a
                  className={`button ${
                    isWorkIcon ? "workButton" : "schoolButton"
                  }`}
                  href="/"
                >
                  {element.buttonText}
                </a>
              )}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}

export default TimeLine;