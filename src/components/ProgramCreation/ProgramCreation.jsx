import React, {useState, Fragment} from "react";
import "./ProgramCreation.css"

const ProgramCreation = () => {
    
    const [nameField, setNameField] = useState(
        {programName: ""}
    );
    
    const [prerequisiteFields, setPrerequisiteFields] = useState([
        {prerequisite: ""}        
    ]);

    const [levelField, setLevelField] = useState(
        {level: ""}
    );

    const [categoryField, setCategoryField] = useState(
        {category: ""}
    );

    const [faqFields, setFAQFields] = useState([
        {question: "",
         answer: ""
        }
    ]);
    
    const [descriptionField, setDescriptionField] = useState(
        {programDescription: ""}
    );

    const [availabilityField, setAvaiabilityField] = useState(
        {isAvailable: true}
    );

    const [profilePic, setProfilePic] = useState(
        {file: "",
        imagePreviewUrl: ""
        }
    )

    const [profileCover, setProfileCover] = useState(
        {file: "",
        imagePreviewUrl: ""
        }
    )


    const handleSubmit = e => {
        e.preventDefault();
        console.log("Name Field", nameField);
        console.log("Prerequisite", prerequisiteFields);
        console.log("Level", levelField)
        console.log("Category", categoryField);
        console.log("FAQs", faqFields);
        console.log("description", descriptionField);
        console.log("availability", availabilityField);
        console.log("Profile picture", profilePic);
        console.log("Profile cover", profileCover);
    }
    
    const handleNameChange = (event) => {
        var value = nameField;
        value.programName = event.target.value;
        setNameField(value);
    }

    const handlePRChange = (index, event) => {
            const values = [...prerequisiteFields]
            values[index].prerequisite = event.target.value;
            setPrerequisiteFields(values);
    }

    const handlePRAdd = () => {
        const values = [...prerequisiteFields];
        values.push({prerequisite: ""});
        setPrerequisiteFields(values);
    }

    const handlePRRemove = (index) => {
        if([...prerequisiteFields].length > 1) {
            const values = [...prerequisiteFields];
            values.splice(index, 1);
            setPrerequisiteFields(values);
        }
        else {
            setPrerequisiteFields(prerequisiteFields);
        }
    }

    const handleLevelChange = (event) => {
        var value = levelField;
        value.level = event.target.value;
        setLevelField(value);
    }

    const handleCategoryChange = (event) => {
        var value = categoryField;
        value.category = event.target.value;
        setCategoryField(value);
    }

    const handleFAQQuestionChange = (index, event) => {
        const values = [...faqFields];
        values[index].question = event.target.value;
        setFAQFields(values);
    }

    const handleFAQAnswerChange = (index, event) => {
        const values = [...faqFields];
        values[index].answer = event.target.value;
        setFAQFields(values)
    }

    const handleFAQAdd = () => {
        const values = [...faqFields];
        values.push({
            question: "",
            answer: ""
       })
        setFAQFields(values);
    }

    const handleFAQRemove = (index) => {
        if([...faqFields].length > 1) {
            const values = [...faqFields];
            values.splice(index, 1);
            setFAQFields(values);
        }
        else {
            setFAQFields(faqFields);
        }
    }

    const handleDescriptionChange = (event) => {
        var value = descriptionField;
        value.programDescription = event.target.value;
        setDescriptionField(value);
    }

    const handleAvailabilityChange = (event) => {
        var value = availabilityField;
        if(event.target.value === "false") {
            value.isAvailable = false;
            setAvaiabilityField(value);
        }
        else {
            value.isAvailable = true;
            setAvaiabilityField(value);
        }
        console.log("availability",availabilityField)
    }

    const handlePicChange = (event) => {
        var value = event.target.files[0]; 
        var reader = new FileReader();
        reader.readAsDataURL(value);
        reader.onloadend = () => {
            var imageURL = reader.result;
            setProfilePic(
                {file: value,
                 imagePreviewUrl: imageURL   
                }
            );
        }
    }

    const handleCoverChange = (event) => {
        var value = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(value);
        reader.onloadend = () => {
            var imageURL = reader.result;
            setProfileCover({
                file: value,
                imagePreviewUrl: imageURL
            });
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <div className="creationForm">
                    <div className="nameSection">
                        <h4 className="nameLabel" htmlFor="programName">اسم البرنامج</h4>
                        <input
                        type="text"
                        className="form-control"
                        id="programName"
                        value={nameField.value}
                        onChange={event => handleNameChange(event)}
                        ></input>
                    </div>
                    <div className="prSection">
                    <h4 className="prerequisiteLabel">المتطلبات المسبقة للبرنامج</h4>
                    {prerequisiteFields.map((prerequisiteField, index) =>
                    (
                        <Fragment key={`${prerequisiteField}~${index}`}>
                            <div className="prerequisite">
                                <input
                                type="text"
                                id="prerequisiteField"
                                value={prerequisiteField.prerequisite}
                                onChange={event => handlePRChange(index, event)} 
                                className="form-control"
                                >
                                </input>
                                <div className="buttons">
                                    <button 
                                    onClick={() => handlePRAdd()}
                                    className="btn btn-success m-2"
                                    >
                                        +
                                    </button>
                                    <button
                                    onClick={() => handlePRRemove(index)}
                                    className="btn btn-danger m-2"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                            <br/>   
                        </Fragment>
                    ))}
                    </div>
                    <div className="levelSection">
                        <h4 className="levelLabel">مستوى البرنامج</h4>
                        <input
                        type="text"
                        id="levelField"
                        value={levelField.value}
                        onChange={event => handleLevelChange(event)}
                        className="form-control"
                        >
                        </input>
                    </div>
                <div className="categorySection">
                    <h4 className="categoryLabel">نوع البرنامج</h4>
                    <input
                    type="text"
                    id="categoryField"
                    value={categoryField.value}
                    onChange={event => handleCategoryChange(event)}
                    className="form-control"
                    ></input>
                </div>
                <div className="faqSection">
                <h4 className="faqLabel">اسئلة شائعة حول البرنامج</h4>
                {faqFields.map((faqField, index) =>
                (
                    <Fragment key={`${faqField}~${index}`}>
                        <div className="faqField">
                            <input
                            type="text"
                            id="questionField"
                            value={faqField.question}
                            onChange={event => handleFAQQuestionChange(index, event)}
                            placeholder="اكتب السؤال هنا..."
                            className="form-control "
                            ></input>
                            <br/>
                            <textarea
                            value={faqField.answer}
                            id="answerField"
                            onChange={event => handleFAQAnswerChange(index, event)}
                            placeholder="الإجابة..."
                            className="form-control"
                            ></textarea>
                            <div className="buttons">
                            <button
                            onClick={() => handleFAQAdd()}
                            className="btn btn-success m-2"
                            >
                                +
                            </button>
                            <button
                            onClick={() => handleFAQRemove(index)}
                            className="btn btn-danger m-2"
                            >
                                -
                            </button>
                            
                        </div>
                        </div>
                        <br/>
                    </Fragment>
                ))}        
                </div>
                <div className="descriptionSection">
                    <h4 className="descriptionLabel">وصف البرنامج</h4>
                    <textarea
                    value={descriptionField.value}
                    id="descriptionField"
                    className="form-control"
                    onChange={event => handleDescriptionChange(event)}
                    ></textarea>
                </div>
                <div className="availabilitySection">
                    <h4 className="availabilityLabel">التسجيل في البرنامج</h4>
                    <input
                    id="available"
                    type="radio"
                    name="option"
                    value="true"
                    onChange={event => handleAvailabilityChange(event)}
                    ></input>
                    <label
                    htmlFor="available"
                    >
                        متاح
                    </label>
                    <br/>
                    <input
                    id="notAvailable"
                    type="radio"
                    name="option"
                    value="false"
                    onChange={event => handleAvailabilityChange(event)}
                    ></input>
                    <label
                    htmlFor="available"
                    >
                         غير متاح 
                    </label>
                </div>
                <br/>
                <div className="profilePicSection">
                    <input type="file" onChange={event => handlePicChange(event)}></input>
                    <br/>
                    <img src={profilePic.imagePreviewUrl} className="profilePic" alt="اختر صورة البرنامج"></img>
                </div>
                <br/>
                <div className="profileCoverSection">
                    <input type="file" onChange={event => handleCoverChange(event)}></input>
                    <br/>
                    <img src={profileCover.imagePreviewUrl } className="profileCover" alt="اختر خلفية البرنامج"></img>
                </div>
                <br/>
                <br/>
                <br/>
                </div>
                <div className="submitButton">
                    <button 
                    className="btn btn-primary m-2"
                    type="submit"
                    onSubmit={handleSubmit}
                    > 
                    تسجيل البرنامج
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default ProgramCreation;