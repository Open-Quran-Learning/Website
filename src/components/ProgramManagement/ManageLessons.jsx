import React, { useState, Fragment as div } from "react";
import "./ManageLessons.scss";
import { YouTubeThmbnailURL } from "./utils";
import { useEffect } from "react";
import PlusMinusButtons from "../Shared/PlusMinusButtons";
import ManageCollectionState from "./ManageCollectionState";

// TODO: fetch existing lessons in this course for intial state.
const ManageLessons = ({ existingLessons, update }) => {
  const [lessons, updateLessons] = useState(existingLessons);

  const manageLessons = new ManageCollectionState([lessons, updateLessons]);

  useEffect(() => update(lessons), [lessons]);

  return (
    <div className="manageLessons">
      {lessons.map((lesson, i) => (
        <div key={i}>
          <ManageLessonEdit
            title={lesson.title}
            description={lesson.description}
            videoUrl={lesson.videoUrl}
            article={lesson.article}
            references={lesson.references}
            index={i}
            update={(newLesson) => {
              manageLessons.updateOne(newLesson, i);
            }}
          />
          {/* <div className="separator"></div> */}
        </div>
      ))}
      <PlusMinusButtons
        onPlus={() => {
          manageLessons.addOne({
            videoUrl: "",
            article: "",
            references: [],
          });
        }}
        onMinus={() => {
          manageLessons.removeLast();
        }}
        minusDisabled={lessons.length == 0}
      />
    </div>
  );
};

const ManageLessonEdit = ({
  title,
  description,
  videoUrl,
  article,
  references,
  index,
  update,
}) => {
  const [content, updateContent] = useState({
    title: title,
    description: description,
    videoUrl: videoUrl,
    article: article,
    references: references,
  });

  // const videoInputId = `yt_input_${index}`;
  // const articleInputId = `article_input_${index}`;

  return (
    <div className="lesson">
      <div className="lessonMetadata">
        <input
          className="lessonTitle form-control"
          type="text"
          placeholder={"اسم الدرس"}
          value={content.title}
          onInput={(e) => {
            updateContent({ ...content, title: e.target.value });
            update(content);
          }}
        />
        <input
          className="lessonDescription form-control"
          type="text"
          placeholder={"نُبذة قصيرة عن الدرس"}
          value={content.description}
          onInput={(e) => {
            updateContent({ ...content, description: e.target.value });
            update(content);
          }}
        />
      </div>
      <div className="lessonContent">
        <div className="videoPreview">
          <input
            // id={videoInputId}
            className="ytVideoInput form-control"
            type="text"
            placeholder={"رابط الڤيديو"}
            value={content.videoUrl}
            onInput={(e) => {
              const url = e.target.value;
              updateContent({ ...content, videoUrl: url });
              update(content);
            }}
          />
          <img src={YouTubeThmbnailURL(content.videoUrl)} />
        </div>
        <div className="articleInput">
          <textarea
            value={content.article}
            placeholder={"اكتب مقال"}
            // id={articleInputId}
            class="form-control"
            rows="10"
            onInput={(e) => {
              updateContent({ ...content, article: e.target.value });
            }}
          ></textarea>
        </div>
        <ManageReferences
          initialReferences={references}
          update={(references) =>
            updateContent({ ...content, references: references })
          }
        />
      </div>
    </div>
  );
};

const ManageReferences = ({ initialReferences, update }) => {
  const [references, updateReferences] = useState([...initialReferences]);
  const manageReferences = new ManageCollectionState([
    references,
    updateReferences,
  ]);

  useEffect(() => {
    update(references);
  }, [references]);

  return (
    <div className="manageReferences">
      <label>المراجع</label>

      {references.map((r, i) => (
        <div className="referencesInputs" key={i}>
          <input
            className="refTitleInput form-control"
            type="text"
            placeholder={"اسم المرجع"}
            value={references[i].title}
            onInput={(e) => {
              manageReferences.updateOne({ ...r, title: e.target.value }, i);
            }}
          />
          <input
            className="refUrlInput form-control"
            type="text"
            placeholder={"رابط المرجع"}
            value={references[i].url}
            onInput={(e) => {
              manageReferences.updateOne({ ...r, url: e.target.value }, i);
            }}
          />
        </div>
      ))}
      <PlusMinusButtons
        onPlus={() => {
          manageReferences.addOne({
            title: "",
            url: "",
          });
        }}
        onMinus={() => {
          manageReferences.removeLast();
        }}
        minusDisabled={references.length == 0}
      />
    </div>
  );
};

export default ManageLessons;
