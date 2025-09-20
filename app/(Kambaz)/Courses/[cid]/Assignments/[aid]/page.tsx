import Link from "next/link";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea rows={10} cols={40} id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>

        <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
            <select name="Assignment" id="Assignment">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="PROJECTS">PROJECTS</option>
                <option value="OTHER">OTHER</option>
                <option value="OTHER2">OTHER2</option>
            </select>
        </tr>

        <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
            <select name="Display Grade as" id="Display Grade as">
                <option value="PERCENTAGE">PERCENTAGE</option>
                <option value="POINTS">PROJECTS</option>
            </select>
        </tr>

        <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submisson type</label>
          </td>
            <select name="Submisson type" id="Submisson type">
                <option value="ONLINE">ONLINE</option>
                <option value="IN PERSON">IN PERSON</option>
            </select>

            <br/>
          <br/>

            <label htmlFor="wd-text-entry"> Online Entry Options</label>

            <br/>

            <input type="checkbox" name="entry" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" name="entry" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>

            <input type="checkbox" name="entry" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

            <input type="checkbox" name="entry" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

            <input type="checkbox" name="entry" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Upload</label>
        </tr>

        <br/>
        
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <label htmlFor="wd-assign-to">Assign To</label><br/>
              <input id="wd-assign-to" defaultValue={"Everyone"} />
        </tr> <br/>

        <tr>
          <td></td>
          
          <label htmlFor="wd-due-date">Due</label> <br/>
          <input type="date"
            defaultValue="2024-05-13"
            id="wd-due-date"/><br/>
        </tr> <br/>

        <tr>
          <td></td>
          
          <td>
          <label htmlFor="wd-available-from">Available From</label> <br/>
          <input type="date"
            defaultValue="2024-05-06"
            id="wd-available-from"/><br/>
          </td>

          <td align="left">
          <label htmlFor="wd-available-unti">Until</label> <br/>
          <input type="date"
            defaultValue="2024-05-20"
            id="wd-available-unti"/><br/>
          </td>
        </tr>
      </table>

      <Link href="/Courses/1234/Assignments">
        <button type="button" >Cancel</button>
      </Link>
      <Link href="/Courses/1234/Assignments">
        <button type="button" >Save</button>
      </Link>
    </div>
);}
