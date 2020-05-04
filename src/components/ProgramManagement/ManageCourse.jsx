import React, { useState, Fragment as div } from "react";
import "./ManageCourse.scss";
import ManageLessons from "./ManageLessons";

//TODO: fetch course data from a given id.
const ManageCourse = ({ isNewCourse, courseData }) => {
  const [course, updateCourse] = useState(
    isNewCourse
      ? { course_name: "", course_description: "", lessons: [] }
      : courseData
  );

  const canSubmit = course.course_name && course.course_description;

  return (
    <div className="ManageCourse">
      <div className="courseMetadata">
        <input
          className="courseTitle form-control"
          type="text"
          placeholder={"اسم الكورس"}
          value={course.course_name}
          onInput={(e) => {
            updateCourse({ ...course, course_name: e.target.value });
          }}
        />
        <textarea
          className="courseDescription form-control"
          type="text"
          placeholder={"نُبذة عن الكورس"}
          rows="6"
          value={course.course_description}
          onInput={(e) => {
            updateCourse({ ...course, course_description: e.target.value });
          }}
        />
      </div>
      <label className="lessonsLabel">الدروس</label>
      <div className="courseLessons">
        <ManageLessons
          existingLessons={course.lessons}
          update={(updatedLessons) =>
            updateCourse({ ...course, lessons: updatedLessons })
          }
        />
      </div>

      <button
        type="button"
        disabled={!canSubmit}
        className="btn btn-success submitCourse"
        onClick={() => {}}
        //TODO: submit course into database.
      >
        حفظ الكورس
      </button>
    </div>
  );
};

export default ManageCourse;
