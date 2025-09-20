export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <button type="button">Collapse All</button>
      <button type="button">View Progress</button>
      <select id="Publish" name="fruit_selection">
        <option value="no" selected>Publish All</option>
        <option value="yes">Publish Some</option>
      </select>
      <button type="button">+ Module</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>

              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Dev - Chapert 1</li>
                <li className="wd-content-item">Full Stack Dev - Chapter 2</li>
              </ul>

              <span className="wd-title">Slides</span>
              <ul className="wd-content">
                <li className="wd-content-item">Intro to Web Dev</li>
                <li className="wd-content-item">Creating an HTTP server w/ Node.js</li>
                <li className="wd-content-item">Creating a React App</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">How to make a website</li>
              </ul>

              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Dev - Chapert 3</li>
                <li className="wd-content-item">Full Stack Dev - Chapter 4</li>
              </ul>

              <span className="wd-title">Slides</span>
              <ul className="wd-content">
                <li className="wd-content-item">How to use HTML</li>
                <li className="wd-content-item">Deploying your website</li>
                <li className="wd-content-item">Starting CSS</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">What makes good design</li>
                <li className="wd-content-item">How to make appealing websites</li>
              </ul>

              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Dev - Chapert 5</li>
              </ul>

              <span className="wd-title">Slides</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learning JavaScript</li>
                <li className="wd-content-item">Further Learning JavaScript</li>
                <li className="wd-content-item">Combining CSS and JS</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
);}
