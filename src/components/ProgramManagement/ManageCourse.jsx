import React, { useState } from "react";
import "./ManageCourse.scss";

const ManageCourse = React.memo(
  ({ course_name, course_description, update }) => {
    const course = {
      course_name: course_name || "",
      course_description: course_description || "",
    };

    return (
      <div className="ManageCourse">
        <div className="courseMetadata">
          <input
            className="courseTitle form-control"
            type="text"
            placeholder={"اسم الكورس"}
            defaultValue={course.course_name}
            onChange={(e) => {
              update({ ...course, course_name: e.target.value });
            }}
          />
          <textarea
            className="courseDescription form-control"
            type="text"
            placeholder={"نُبذة عن الكورس"}
            rows="6"
            defaultValue={course.course_description}
            onChange={(e) => {
              update({ ...course, course_description: e.target.value });
            }}
          />
        </div>
      </div>
    );
  }
);

export default ManageCourse;
