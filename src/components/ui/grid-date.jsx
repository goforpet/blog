import React from "react"

const PostDate = ({ date }) => (
  <div className="grid-date">
    <span className="icon-text">
      <span className="icon">
        <i className="icon-goforpet-date"></i>
      </span>
      <span>
        <time dateTime={date} itemProp="datePublished">
          {date}
        </time>
      </span>
    </span>
  </div>
)

export default PostDate
