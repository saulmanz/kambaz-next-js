"use client"
import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import TopControlButton from "./TopControlButton";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";

interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  editing?: boolean;
  lessons?: Lesson[];
}

interface ModulesState {
  modules: Module[];
}

interface RootState {
  modulesReducer: ModulesState;
}

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");

  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  if (typeof cid !== "string") {
    throw new Error("Course ID not found");
  }

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module: Module) => module.course === cid)
          .map((module: Module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                  />
                )}
                <TopControlButton
                  moduleId={module._id}
                  deleteModule={(moduleId: string) => {
                    dispatch(deleteModule(moduleId));
                  }}
                  editModule={(moduleId: string) => dispatch(editModule(moduleId))}
                />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
