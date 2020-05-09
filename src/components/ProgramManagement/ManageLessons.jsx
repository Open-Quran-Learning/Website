import React, { useState } from "react";
import "./ManageLessons.scss";
import { YouTubeThmbnailURL } from "./utils";
import { useEffect } from "react";
import PlusMinusButtons from "../Shared/PlusMinusButtons";
import ManageCollectionState from "./ManageCollectionState";

// TODO: fetch existing lessons in this course for intial state.
export const ManageManyLessons = ({ existingLessons, update }) => {
  const [lessons, updateLessons] = useState(existingLessons || []);

  const manageLessons = new ManageCollectionState([lessons, updateLessons]);

  useEffect(() => update(lessons), [lessons]);

  return (
    <div className="manageLessons">
      {lessons.map((lesson, i) => (
        <div key={i}>
          <ManageLesson
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

export const ManageLesson = React.memo(
  ({ title, description, videoUrl, article, references, index, update }) => {
    const content = {
      title: title || "",
      description: description || "",
      videoUrl: videoUrl || "",
      article: article || "",
      references: references || [],
    };

    // const videoInputId = `yt_input_${index}`;
    // const articleInputId = `article_input_${index}`;

    return (
      <div className="lesson">
        <div className="lessonMetadata">
          <input
            className="lessonTitle form-control"
            type="text"
            placeholder={"اسم الدرس"}
            value={title}
            onInput={(e) => {
              update({ ...content, title: e.target.value });
            }}
          />
          <input
            className="lessonDescription form-control"
            type="text"
            placeholder={"نُبذة قصيرة عن الدرس"}
            value={description}
            onInput={(e) => {
              update({ ...content, description: e.target.value });
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
              value={videoUrl}
              onInput={(e) => {
                const url = e.target.value;
                update({ ...content, videoUrl: url });
              }}
            />
            <img src={YouTubeThmbnailURL(content.videoUrl)} />
          </div>
          <div className="articleInput">
            <textarea
              value={article}
              placeholder={"اكتب مقال"}
              // id={articleInputId}
              className="form-control"
              rows="10"
              onInput={(e) => {
                update({ ...content, article: e.target.value });
              }}
            ></textarea>
          </div>
          <ManageReferences
            references={references}
            update={(references) =>
              update({ ...content, references: references })
            }
          />
        </div>
      </div>
    );
  }
);

const ManageReferences = React.memo(({ references, update }) => {
  const manageReferences = new ManageCollectionState([
    references || [],
    update,
  ]);

  return (
    <div className="manageReferences">
      <label>المراجع</label>

      {manageReferences.collection.map((r, i) => (
        <div className="referencesInputs" key={i}>
          <input
            className="refTitleInput form-control"
            type="text"
            placeholder={"اسم المرجع"}
            value={manageReferences.collection[i].title}
            onInput={(e) => {
              manageReferences.updateOne(
                { ...manageReferences.collection[i], title: e.target.value },
                i
              );
            }}
          />
          <input
            className="refUrlInput form-control"
            type="text"
            placeholder={"رابط المرجع"}
            value={manageReferences.collection[i].url}
            onInput={(e) => {
              manageReferences.updateOne(
                { ...manageReferences.collection[i], url: e.target.value },
                i
              );
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
        minusDisabled={manageReferences.collection.length == 0}
      />
    </div>
  );
});

export default ManageManyLessons;
